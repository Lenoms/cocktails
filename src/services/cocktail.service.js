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
  writeToDatabase: function (cocktailName, cocktailGrade, imgUrl, tried) {
    const db = getDatabase();
    set(ref(db, "cocktails/" + cocktailName), {
      cocktailName: cocktailName,
      cocktailGrade: cocktailGrade,
      image: imgUrl,
      tried: tried,
    });
    console.log("wrote to database?");
  },
};

export default CocktailService;
