import React, { useEffect, useState } from "react";
import "./Lists.css";
import { getDatabase, ref, get, child } from "firebase/database";
import TriedCocktailItem from "../components/TriedCocktailItem";
import { motion } from "framer-motion";

function UntriedList() {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    function fetchCocktails() {
      const dbRef = ref(getDatabase());
      get(child(dbRef, "cocktails/untried"))
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
      </div>
    );
  } else {
    return (
      <motion.div
        className="list"
        initial={{
          opacity: 0,
          x: "-200vw",
          transition: { ease: "easeInOut", duration: 0.5 },
        }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
        exit={{
          opacity: 0,
          x: "-200vw",
          transition: { ease: "easeInOut", duration: 0.5 },
        }}
      >
        {data.map(function (item) {
          return <h1 key={item.cocktailName}>{item.cocktailName}</h1>;
        })}
      </motion.div>
    );
  }
}

export default UntriedList;
