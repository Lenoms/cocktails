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
  getCocktailsList: function (setLoading, setData) {
    async function fetchCocktails() {
      const dbRef = ref(getDatabase());
      get(child(dbRef, "cocktails"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setData(snapshot.val());
            setLoading(false);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    fetchCocktails();
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
