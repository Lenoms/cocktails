import React, { useEffect, useState } from "react";
import "./Lists.css";
import { getDatabase, ref, get, child } from "firebase/database";
import TriedCocktailItem from "./TriedCocktailItem";

function UntriedList() {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCocktails() {
      const dbRef = ref(getDatabase());
      get(child(dbRef, "cocktails"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setData(Object.values(snapshot.val()));
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
  }, []);

  if (loading) {
    return <h1>Loading!</h1>;
  } else {
    return (
      <div className="list">
        {data.map(function (item) {
          return (
            <TriedCocktailItem
              cocktailGrade={item.cocktailGrade}
              cocktailName={item.cocktailName}
            ></TriedCocktailItem>
          );
        })}
      </div>
    );
  }
}

export default UntriedList;
