import {
  getDatabase,
  ref,
  onValue,
  update,
  set,
  get,
  child,
} from "firebase/database";

const CocktailService = {
  writeTriedToDatabase: function (
    cocktailName,
    cocktailGrade,
    cocktailNotes,
    imgUrl
  ) {
    const db = getDatabase();
    set(ref(db, "cocktails/tried/" + cocktailName), {
      cocktailName: cocktailName,
      cocktailGrade: cocktailGrade,
      cocktailNotes: cocktailNotes,
      image: imgUrl,
    });
    console.log("wrote to database?");
  },

  writeUntriedToDatabase: function (cocktailName) {
    const db = getDatabase();
    set(ref(db, "cocktails/untried/" + cocktailName), {
      cocktailName: cocktailName,
    });
    console.log("wrote to database?");
  },
};

export default CocktailService;
