import React, { useEffect, useState } from "react";
import "./Lists.css";
import UntriedCocktailItem from "../../components/UntriedCocktailItem/UntriedCocktailItem";
import { motion } from "framer-motion";
import { RouteAnimation } from "../../animations/RouteAnimation";
import { Spinner } from "react-bootstrap";
import { searchQueryMatch } from "../../services/search.service";
import { downloadBackUp } from "../../services/backup.service";
import CocktailService from "../../services/cocktail.service";

function UntriedList({ searchQuery }) {
  let [cocktails, setCocktails] = useState([]);
  let [loading, setLoading] = useState(true);
  const [searchQueryTerm, setSearchQueryTerm] = useState();

  // Get cocktails
  useEffect(() => {
    CocktailService.getUntriedCocktails().then((data) => {
      setCocktails(Object.values(data));
      setLoading(false);
    });
  }, []);

  // Set search term
  useEffect(() => {
    setSearchQueryTerm(searchQuery);
  }, [searchQuery]);

  // Filter function for search query
  function filterCallback(item) {
    return searchQueryMatch(searchQueryTerm, item);
  }

  // Bonus stuff
  useEffect(() => {
    // TO BACK UP
    // if (cocktails.length != 0) {
    //   downloadBackUp(cocktails);
    // }
  }, []);

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
        {cocktails
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
