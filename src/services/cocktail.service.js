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
  getCocktailsList: ({ dataFetched }) => {
    async function fetchCocktails() {
      const dbRef = ref(getDatabase());
      get(child(dbRef, "cocktails"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            dataFetched();
            return snapshot.val();
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    return fetchCocktails();
  },

  writeToDatabase: function (cocktailName, cocktailGrade) {
    const db = getDatabase();
    set(ref(db, "cocktails/" + cocktailName), {
      cocktailName: cocktailName,
      cocktailGrade: cocktailGrade,
    });
    console.log("wrote to database?");
  },
};

export default CocktailService;
