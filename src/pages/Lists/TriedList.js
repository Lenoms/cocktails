import React, { useEffect, useState } from "react";
import "./Lists.css";
import TriedCocktailItem from "../../components/TriedCocktailItem/TriedCocktailItem";
import { motion } from "framer-motion";
import { RouteAnimation } from "../../animations/RouteAnimation";
import { sortList } from "../../services/sorter.service";
import { searchQueryMatch } from "../../services/search.service";
import CocktailService from "../../services/cocktail.service";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import PaginationBar from "../../components/PaginationBar/PaginationBar";

function TriedList({ sortBy, searchQuery }) {
  const [cocktails, setCocktails] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [searchQueryTerm, setSearchQueryTerm] = useState();
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
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
    setCocktails(sortList(cocktails, sortBy));
    refreshCocktails();
  }, [sortBy, cocktails]);

  // Set search term
  useEffect(() => {
    setSearchQueryTerm(searchQuery);
    setCurrentPage(1);
    refreshCocktails();
  }, [searchQuery]);

  // Filter function for search term
  const filterBySearchTerm = (item) => {
    if (!searchQueryTerm || !item) return true;
    return searchQueryMatch(searchQueryTerm, item);
  };

  const refreshCocktails = () => {
    setDisplayList([...cocktails]);
  };

  // Bonus stuff
  useEffect(() => {
    //Analytics stuff interested.
    CocktailService.printAnalytics(cocktails);

    // // TO BACK UP
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
          .filter((item) => filterBySearchTerm(item))
          .slice((currentPage - 1) * pageSize, currentPage * pageSize)
          .map(function (item) {
            return (
              <TriedCocktailItem
                key={item.cocktailName}
                item={item}
                sortBy={sortBy}
              ></TriedCocktailItem>
            );
          })}
        <PaginationBar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItemCount={
            displayList.filter((item) => filterBySearchTerm(item)).length
          }
          pageSize={pageSize}
        />
      </motion.div>
    );
  }
}

export default TriedList;
