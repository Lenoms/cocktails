import React, { useEffect, useState, useContext, useRef } from "react";
import "./Lists.css";
import TriedCocktailItem from "../../components/TriedCocktailItem/TriedCocktailItem";
import { motion } from "framer-motion";
import { RouteAnimation } from "../../animations/RouteAnimation";
import { sortList } from "../../services/sorter.service";
import { searchQueryMatch } from "../../services/search.service";
import CocktailService from "../../services/cocktail.service";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import PaginationBar from "../../components/PaginationBar/PaginationBar";
import { useCocktailContext } from "../../services/CocktailContextProvider";
import { scrollToHeight } from "../../services/scroll.service";
import NoResultsFound from "../../components/NoResultsFound/NoResultsFound";
import { downloadBackUp } from "../../services/backup.service";

function TriedList() {
  const [original, setOriginal] = useState([]);
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const cocktailContext = useCocktailContext();
  const pageSize = 20;

  useEffect(() => {
    async function load() {
      const items = await CocktailService.fetchCocktails(true);
      setOriginal(items);
      setCocktails(sortList(items, cocktailContext.sortBy));
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    setCocktails(sortList(original, cocktailContext.sortBy));
    setCurrentPage(1);
  }, [cocktailContext.sortBy, original]);

  // Filter function for search term
  const filterBySearchTerm = (item) => {
    if (!item) return true;
    return searchQueryMatch(cocktailContext.searchTerm, item);
  };

  if (cocktailContext.scrollHeight !== 0) {
    scrollToHeight(cocktailContext.scrollHeight);
  }

  setTimeout(() => {
    cocktailContext.setScrollHeight(0);
  }, 600);

  // Return user to page they were on
  useEffect(() => {
    setCurrentPage(cocktailContext.pageNumber);
  }, [cocktailContext.pageNumber]);

  // Bonus stuff
  useEffect(() => {
    //Analytics stuff interested.
    CocktailService.printAnalytics(cocktails);
    //CocktailService.printWrappedStats(cocktails);

    // TO BACK UP
    // if (cocktails.length !== 0) {
    //   downloadBackUp(cocktails);
    // }

    //migrateCocktailData();
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
          initial={RouteAnimation.initial}
          animate={RouteAnimation.animate}
          exit={RouteAnimation.exit}
        >
          {cocktails
            .filter((item) => filterBySearchTerm(item))
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map(function (item) {
              return (
                <TriedCocktailItem
                  key={item.cocktailId}
                  item={item}
                  sortBy={cocktailContext.sortBy}
                ></TriedCocktailItem>
              );
            })}
          <PaginationBar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItemCount={
              cocktails.filter((item) => filterBySearchTerm(item)).length
            }
            pageSize={pageSize}
          />
        </motion.div>
      );
    }
  }
}

export default TriedList;
