import React, { useEffect, useState, useRef } from "react";
import "./Lists.css";
import UntriedCocktailItem from "../../components/UntriedCocktailItem/UntriedCocktailItem";
import { motion } from "framer-motion";
import { RouteAnimation } from "../../animations/RouteAnimation";
import { searchQueryMatch } from "../../services/search.service";
import { downloadBackUp } from "../../services/backup.service";
import CocktailService from "../../services/cocktail.service";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useCocktailContext } from "../../services/CocktailContextProvider";
import NoResultsFound from "../../components/NoResultsFound/NoResultsFound";
import { migrateCocktailData } from "../../services/migration.service";

function UntriedList() {
  let [cocktails, setCocktails] = useState([]);
  let [loading, setLoading] = useState(true);
  const cocktailContext = useCocktailContext();

  useEffect(() => {
    async function load() {
      const items = await CocktailService.fetchCocktails(false); // or false
      setCocktails(items);
      setLoading(false);
    }

    load();
  }, []);

  const deleteCocktail = (cocktailId) => {
    CocktailService.deleteCocktail(cocktailId);
    setCocktails((prev) => prev.filter((c) => c.cocktailId !== cocktailId));
  };

  // Filter function for search query
  const filterBySearchTerm = (item) => {
    if (!item) return true;
    return searchQueryMatch(cocktailContext.searchTerm, item);
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
    if (cocktails.filter((item) => filterBySearchTerm(item)).length === 0) {
      return <NoResultsFound />;
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
            .filter((item) => filterBySearchTerm(item))
            .map(function (item) {
              return (
                <UntriedCocktailItem
                  key={item.name}
                  item={item}
                  deleteCocktail={deleteCocktail}
                ></UntriedCocktailItem>
              );
            })}
        </motion.div>
      );
    }
  }
}

export default UntriedList;
