import React, { useEffect, useState } from "react";
import "./Lists.css";
import { getDatabase, ref, get, child } from "firebase/database";
import TriedCocktailItem from "../components/TriedCocktailItem";
import { motion } from "framer-motion";
import { RouteAnimation } from "../animations/RouteAnimation";
import { Spinner } from "react-bootstrap";
import { sortList } from "../services/sorter.service";

function TriedList({ sortBy }) {
  const [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCocktails() {
      const dbRef = ref(getDatabase());
      get(child(dbRef, "cocktails/tried"))
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
  }, []);

  useEffect(() => {
    var sortedList = sortList(data, sortBy);
    setData(sortedList.slice());
  }, [sortBy]);

  if (loading) {
    return <Spinner animation="border" />;
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
            <TriedCocktailItem
              key={item.cocktailName}
              item={item}
            ></TriedCocktailItem>
          );
        })}
      </motion.div>
    );
  }
}

export default TriedList;
