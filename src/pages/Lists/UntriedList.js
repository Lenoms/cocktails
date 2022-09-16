import React, { useEffect, useState } from "react";
import "./Lists.css";
import UntriedCocktailItem from "../../components/UntriedCocktailItem/UntriedCocktailItem";
import { motion } from "framer-motion";
import { RouteAnimation } from "../../animations/RouteAnimation";
import { searchQueryMatch } from "../../services/search.service";
import { downloadBackUp } from "../../services/backup.service";
import CocktailService from "../../services/cocktail.service";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { hasUnownedIngredient } from "../../services/filter.services";

function UntriedList({ searchQuery, filterOn }) {
  let [cocktails, setCocktails] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  let [loading, setLoading] = useState(true);
  const [searchQueryTerm, setSearchQueryTerm] = useState();

  // Get cocktails
  useEffect(() => {
    CocktailService.getUntriedCocktails().then((data) => {
      const cocktailList = Object.values(data);
      if (filterOn) {
        CocktailService.getUnownedIngredients().then((data) => {
          setCocktails(
            cocktailList.filter(
              (cocktail) => !hasUnownedIngredient(cocktail, Object.values(data))
            )
          );
          setLoading(false);
        });
      } else {
        setCocktails(cocktailList);
        setLoading(false);
      }
    });
  }, [filterOn]);

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

  // Filter function for search query
  const filterBySearchTerm = (item) => {
    return searchQueryMatch(searchQueryTerm, item);
  };

  // useEffect(() => {
  //   if (filterUnowned) {
  //     if (cocktails.length > 0) {
  //       CocktailService.getUnownedIngredients().then((data) => {
  //         setDisplayList(filterByUnownedList(cocktails, data));
  //         setLoading(false);
  //       });
  //     }
  //   }
  // }, [cocktails, filterUnowned]);

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
          .filter((item) => filterBySearchTerm(item))
          .map(function (item) {
            return (
              <UntriedCocktailItem
                key={item.cocktailName}
                item={item}
                refreshList={refreshList}
              ></UntriedCocktailItem>
            );
          })}
      </motion.div>
    );
  }
}

export default UntriedList;
