import React, { useEffect, useState } from "react";
import "./Lists.css";
import { getDatabase, ref, get, child } from "firebase/database";
import TriedCocktailItem from "./TriedCocktailItem";
import AddButton from "./AddButton";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function TriedList() {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchCocktails() {
      const dbRef = ref(getDatabase());
      get(child(dbRef, "cocktails"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setData(Object.values(snapshot.val()));
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    fetchCocktails();
  });

  if (loading) {
    return (
      <div>
        <h1>Loading!</h1>
        <AddButton />
      </div>
    );
  } else {
    return (
      <motion.div
        className="list"
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.1 } }}
        exit={{ opacity: 0, x: "100%" }}
      >
        {data
          .filter((cocktail) => cocktail.tried == true)
          .map(function (item) {
            return (
              <TriedCocktailItem
                key={item.cocktailName}
                cocktailGrade={item.cocktailGrade}
                cocktailName={item.cocktailName}
                cocktailImageUrl={item.image}
              ></TriedCocktailItem>
            );
          })}

        <AddButton />
      </motion.div>
    );
  }
}

export default TriedList;
