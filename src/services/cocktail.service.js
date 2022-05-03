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
  },

  writeUntriedToDatabase: function (cocktailName, cocktailNotes, ingredients) {
    const db = getDatabase();
    set(databaseRef(db, "cocktails/untried/" + cocktailName), {
      cocktailName: cocktailName,
      cocktailNotes: cocktailNotes,
      ingredients: ingredients,
    });
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
