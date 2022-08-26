import React, { useEffect, useState } from "react";
import "./Lists.css";
import TriedCocktailItem from "../../components/TriedCocktailItem/TriedCocktailItem";
import { motion } from "framer-motion";
import { RouteAnimation } from "../../animations/RouteAnimation";
import { sortList } from "../../services/sorter.service";
import { searchQueryMatch } from "../../services/search.service";
import { downloadBackUp } from "../../services/backup.service";
import CocktailService from "../../services/cocktail.service";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useAuth0 } from "@auth0/auth0-react";

function TriedList({ sortBy, searchQuery }) {
  const [cocktails, setCocktails] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [searchQueryTerm, setSearchQueryTerm] = useState();
  let [loading, setLoading] = useState(true);

  // Get cocktails
  useEffect(() => {
    CocktailService.getTriedCocktails().then((data) => {
      setCocktails(Object.values(data));
      setLoading(false);
    });
  }, []);

  // Sort
  useEffect(() => {
    var sortedList = sortList(cocktails, sortBy);
    setDisplayList(sortedList.slice());
  }, [sortBy, cocktails]);

  // Set search term
  useEffect(() => {
    setSearchQueryTerm(searchQuery);
  }, [searchQuery]);

  // Filter function for search term
  function filterCallback(item) {
    return searchQueryMatch(searchQueryTerm, item);
  }

  // Bonus stuff
  useEffect(() => {
    //Analytics stuff interested.
    CocktailService.printAnalytics(cocktails);

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
