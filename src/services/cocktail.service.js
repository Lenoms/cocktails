import {
  getDatabase,
  ref as databaseRef,
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
    imgUrl,
    date
  ) {
    const noSpecialCharactersKey = cocktailName.replace(/[.$#[\]/]/g, "");
    if (noSpecialCharactersKey.length == 0) return;
    const db = getDatabase();
    const currentDate = getDateArray();
    if (date != null) {
      set(databaseRef(db, "cocktails/tried/" + noSpecialCharactersKey), {
        cocktailName: cocktailName,
        danielGrade: danielGrade,
        daniGrade: daniGrade,
        cocktailNotes: cocktailNotes,
        ingredients: ingredients,
        image: imgUrl,
        date: date,
        dateModified: currentDate,
      });
    } else {
      set(databaseRef(db, "cocktails/tried/" + noSpecialCharactersKey), {
        cocktailName: cocktailName,
        danielGrade: danielGrade,
        daniGrade: daniGrade,
        cocktailNotes: cocktailNotes,
        ingredients: ingredients,
        image: imgUrl,
        date: currentDate,
      });
    }
  },

  writeUntriedToDatabase: function (cocktailName, cocktailNotes, ingredients) {
    const db = getDatabase();
    const noSpecialCharactersKey = cocktailName.replace(/[.$#[\]/]/g, "");
    if (noSpecialCharactersKey.length == 0) return;
    set(databaseRef(db, "cocktails/untried/" + noSpecialCharactersKey), {
      cocktailName: cocktailName,
      cocktailNotes: cocktailNotes,
      ingredients: ingredients,
    });
  },
  deleteCocktail: function (cocktailName, list) {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    const db = getDatabase();
    const noSpecialCharactersKey = cocktailName.replace(/[.$#[\]/]/g, "");
    if (noSpecialCharactersKey.length == 0) return;
    remove(databaseRef(db, `cocktails/${list}/${noSpecialCharactersKey}`));
  },

  uploadImage: function (event, setProgresspercent, setImgUrl, setIsUploading) {
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
          setIsUploading(false);
        });
      }
    );
  },
  getUnownedIngredients: function () {
    return new Promise(function (resolve, reject) {
      const dbRef = databaseRef(getDatabase());
      get(child(dbRef, "cocktails/unownedIngredients"))
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
  addUnownedIngredient: function (ingredient) {
    const db = getDatabase();
    set(databaseRef(db, "cocktails/unownedIngredients/" + ingredient), {
      ingredient: ingredient,
    });
  },
  printAnalytics: function (data) {
    let daniel_sum = 0;
    let dani_sum = 0;
    for (let i = 0; i < data.length; i++) {
      daniel_sum += parseInt(data[i].danielGrade);
      dani_sum += parseInt(data[i].daniGrade);
    }

    console.log(`TOTAL COCKTAILS: ${data.length} `);

    console.log(
      `Daniel Total Grade: ${daniel_sum}, Average: ${(
        daniel_sum / data.length
      ).toPrecision(4)}`
    );

    console.log(
      `Dani Total Grade: ${dani_sum}, Average: ${(
        dani_sum / data.length
      ).toPrecision(4)}`
    );
  },
};

function getDateArray() {
  let dateArray = [];
  dateArray.push(Date.now());
  var today = new Date();

  dateArray.push(today.toLocaleDateString("en-US"));
  return dateArray;
}

export default CocktailService;
