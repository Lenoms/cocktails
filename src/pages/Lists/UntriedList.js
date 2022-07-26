import React, { useEffect, useState } from "react";
import "./Lists.css";
import { getDatabase, ref, get, child } from "firebase/database";
import UntriedCocktailItem from "../../components/UntriedCocktailItem/UntriedCocktailItem";
import { motion } from "framer-motion";
import { RouteAnimation } from "../../animations/RouteAnimation";
import { Spinner } from "react-bootstrap";
import { searchQueryMatch } from "../../services/search.service";
import { downloadBackUp } from "../../services/backup.service";

function UntriedList({ searchQuery }) {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);
  const [searchQueryTerm, setSearchQueryTerm] = useState();

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

  useEffect(() => {
    setSearchQueryTerm(searchQuery);
  }, [searchQuery]);

  function filterCallback(item) {
    return searchQueryMatch(searchQueryTerm, item);
  }

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
        {data
          .map(function (item) {
            return (
              <UntriedCocktailItem
                key={item.cocktailName}
                item={item}
              ></UntriedCocktailItem>
            );
          })
          .filter((item) => filterCallback(item))}
      </motion.div>
    );
  }
}

export default UntriedList;
