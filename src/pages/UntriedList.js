import React, { useEffect, useState } from "react";
import "./Lists.css";
import { getDatabase, ref, get, child } from "firebase/database";
import UntriedCocktailItem from "../components/UntriedCocktailItem";
import { motion } from "framer-motion";
import { RouteAnimation } from "../animations/RouteAnimation";

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
        initial={RouteAnimation.initial}
        animate={RouteAnimation.animate}
        exit={RouteAnimation.exit}
      >
        {data.map(function (item) {
          return (
            <UntriedCocktailItem
              key={item.cocktailName}
              item={item}
            ></UntriedCocktailItem>
          );
        })}
      </motion.div>
    );
  }
}

export default UntriedList;
