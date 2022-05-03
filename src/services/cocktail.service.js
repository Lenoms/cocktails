import {
  getDatabase,
  ref as databaseRef,
  onValue,
  update,
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
  writeTriedToDatabase: function (
    cocktailName,
    cocktailGrade,
    cocktailNotes,
    ingredients,
    imgUrl
  ) {
    const db = getDatabase();
    set(databaseRef(db, "cocktails/tried/" + cocktailName), {
      cocktailName: cocktailName,
      cocktailGrade: cocktailGrade,
      cocktailNotes: cocktailNotes,
      ingredients: ingredients,
      image: imgUrl,
    });
    console.log("wrote to database?");
  },

  writeUntriedToDatabase: function (cocktailName) {
    const db = getDatabase();
    set(databaseRef(db, "cocktails/untried/" + cocktailName), {
      cocktailName: cocktailName,
    });
    console.log("wrote to database?");
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
};

export default CocktailService;
