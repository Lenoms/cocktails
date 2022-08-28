import React, { useEffect, useState } from "react";
import "./Lists.css";
import UntriedCocktailItem from "../../components/UntriedCocktailItem/UntriedCocktailItem";
import { motion } from "framer-motion";
import { RouteAnimation } from "../../animations/RouteAnimation";
import { searchQueryMatch } from "../../services/search.service";
import { downloadBackUp } from "../../services/backup.service";
import CocktailService from "../../services/cocktail.service";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

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

  const refreshList = () => {
    setLoading(true);
    CocktailService.getUntriedCocktails().then((data) => {
      setCocktails(Object.values(data));
      setLoading(false);
    });
  };

  // Set search term
  useEffect(() => {
    setSearchQueryTerm(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    let list_element = document.getElementById("untried-list-container");
    if (list_element) {
      console.log(list_element.style);
      list_element.style.cssText = null;

      console.log("yeah done");
    }
  }, [loading]);

  // Filter function for search query
  const filterCallback = (item) => {
    return searchQueryMatch(searchQueryTerm, item);
  };

  // Bonus stuff
  useEffect(() => {
    // TO BACK UP
    // if (cocktails.length != 0) {
    //   downloadBackUp(cocktails);
    // }
  }, [cocktails]);

  if (loading) {
    return <LoadingSpinner />;
  } else {
    return (
      <motion.div
        className="list"
        id="untried-list-container"
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
                refreshList={refreshList}
              ></UntriedCocktailItem>
            );
          })
          .filter((item) => filterCallback(item))}
      </motion.div>
    );
  }
}

export default UntriedList;
