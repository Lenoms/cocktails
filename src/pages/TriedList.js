import React, { useEffect, useState } from "react";
import "./Lists.css";
import { getDatabase, ref, get, child } from "firebase/database";
import TriedCocktailItem from "../components/TriedCocktailItem/TriedCocktailItem";
import { motion } from "framer-motion";
import { RouteAnimation } from "../animations/RouteAnimation";
import { Spinner } from "react-bootstrap";
import { sortList } from "../services/sorter.service";
import { searchQueryMatch } from "../services/search.service";

function TriedList({ sortBy, searchQuery }) {
  const [data, setData] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [searchQueryTerm, setSearchQueryTerm] = useState();
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
    setDisplayList(sortedList.slice());
  }, [sortBy, data]);

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
        {displayList
          .map(function (item) {
            return (
              <TriedCocktailItem
                key={item.cocktailName}
                item={item}
                sortBy={sortBy}
              ></TriedCocktailItem>
            );
          })
          .filter((item) => filterCallback(item))}
      </motion.div>
    );
  }
}

export default TriedList;
