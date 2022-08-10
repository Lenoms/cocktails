import {
  getDatabase,
  ref as databaseRef,
  onValue,
  update,
  remove,
  set,
  get,
  child,
} from "firebase/database";

import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";

const CocktailService = {
  getTriedCocktails: function () {
    return new Promise(function (resolve, reject) {
      const dbRef = databaseRef(getDatabase());
      get(child(dbRef, "cocktails/tried"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            resolve(snapshot.val());
          } else {
            console.log("No data available");
            resolve([]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  },
  getUntriedCocktails: function () {
    return new Promise(function (resolve, reject) {
      const dbRef = databaseRef(getDatabase());
      get(child(dbRef, "cocktails/untried"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            resolve(snapshot.val());
          } else {
            console.log("No data available");
            resolve([]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  },
  writeTriedToDatabase: function (
    cocktailName,
    danielGrade,
    daniGrade,
    cocktailNotes,
    ingredients,
    imgUrl
  ) {
    const db = getDatabase();
    set(databaseRef(db, "cocktails/tried/" + cocktailName), {
      cocktailName: cocktailName,
      danielGrade: danielGrade,
      daniGrade: daniGrade,
      cocktailNotes: cocktailNotes,
      ingredients: ingredients,
      image: imgUrl,
    });
  },

  writeUntriedToDatabase: function (cocktailName, cocktailNotes, ingredients) {
    const db = getDatabase();
    set(databaseRef(db, "cocktails/untried/" + cocktailName), {
      cocktailName: cocktailName,
      cocktailNotes: cocktailNotes,
      ingredients: ingredients,
    });
  },
  deleteCocktail: function (cocktailName) {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    const db = getDatabase();
    remove(databaseRef(db, "cocktails/tried/" + cocktailName));
  },

  uploadImage: function (event, setProgresspercent, setImgUrl) {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${event.target.files[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, event.target.files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  },
  printAnalytics: function (data) {
    let daniel_sum = 0;
    let dani_sum = 0;
    for (let i = 0; i < data.length; i++) {
      daniel_sum += parseInt(data[i].danielGrade);
      dani_sum += parseInt(data[i].daniGrade);
    }

    console.log(
      `Daniel Total Grade: ${daniel_sum}, Average: ${daniel_sum / data.length}`
    );

    console.log(
      `Dani Total Grade: ${dani_sum}, Average: ${dani_sum / data.length}`
    );
  },
};

export default CocktailService;
