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
    versions,
    date,
    tags
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
        versions: versions,
        date: date,
        dateModified: currentDate,
        tags: tags,
      });
    } else {
      set(databaseRef(db, "cocktails/tried/" + noSpecialCharactersKey), {
        cocktailName: cocktailName,
        danielGrade: danielGrade,
        daniGrade: daniGrade,
        versions: versions,
        date: currentDate,
        tags: tags,
      });
    }
  },

  writeUntriedToDatabase: function (cocktailName, versions) {
    const db = getDatabase();
    const noSpecialCharactersKey = cocktailName.replace(/[.$#[\]/]/g, "");
    if (noSpecialCharactersKey.length == 0) return;
    set(databaseRef(db, "cocktails/untried/" + noSpecialCharactersKey), {
      cocktailName: cocktailName,
      versions: versions,
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
    if (ingredient.length == 0) return;
    set(databaseRef(db, "cocktails/unownedIngredients/" + ingredient), {
      ingredient: ingredient,
    });
  },
  deleteUnownedIngredient: function (ingredient) {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    const db = getDatabase();
    if (ingredient.length == 0) return;
    remove(databaseRef(db, `cocktails/unownedIngredients/${ingredient}`));
  },

  printAnalytics: function (data) {
    let danielSum = 0;
    let daniSum = 0;
    let danielDrinksNotTriedCount = 0;
    let daniDrinksNotTriedCount = 0;
    for (let i = 0; i < data.length; i++) {
      if (!data[i].danielGrade) {
        danielDrinksNotTriedCount += 1;
      }
      if (!data[i].daniGrade) {
        daniDrinksNotTriedCount += 1;
      }
      danielSum += data[i].danielGrade ? parseInt(data[i].danielGrade) : 0;
      daniSum += data[i].daniGrade ? parseInt(data[i].daniGrade) : 0;
    }

    console.log(daniDrinksNotTriedCount, danielDrinksNotTriedCount);

    console.log(`TOTAL COCKTAILS: ${data.length} `);

    const averageCocktailGrade = (
      (danielSum + daniSum) /
      (data.length * 2 - danielDrinksNotTriedCount - daniDrinksNotTriedCount)
    ).toPrecision(4);

    console.log(`Average Cocktail Grade: ${averageCocktailGrade}`);

    console.log(
      `Daniel Total Grade: ${danielSum}, Average: ${(
        danielSum /
        (data.length - danielDrinksNotTriedCount)
      ).toPrecision(4)}`
    );

    console.log(
      `Dani Total Grade: ${daniSum}, Average: ${(
        daniSum /
        (data.length - daniDrinksNotTriedCount)
      ).toPrecision(4)}`
    );
  },
  calculateAverageGrade: function (danielGrade, daniGrade) {
    if (
      (danielGrade === null || isNaN(danielGrade)) &&
      (daniGrade === null || isNaN(daniGrade))
    ) {
      return "N/A";
    } else if (danielGrade === null || isNaN(danielGrade)) {
      return daniGrade;
    } else if (daniGrade === null || isNaN(daniGrade)) {
      return danielGrade;
    } else {
      return (danielGrade + daniGrade) / 2;
    }
  },
  getNonAmericanDateString: function (date) {
    const dateParts = date.split("/");
    return `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
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
