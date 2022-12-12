import React, { useEffect, useState, useContext } from "react";
import "./Lists.css";
import TriedCocktailItem from "../../components/TriedCocktailItem/TriedCocktailItem";
import { motion } from "framer-motion";
import { RouteAnimation } from "../../animations/RouteAnimation";
import { sortList } from "../../services/sorter.service";
import { searchQueryMatch } from "../../services/search.service";
import CocktailService from "../../services/cocktail.service";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import PaginationBar from "../../components/PaginationBar/PaginationBar";
import { hasUnownedIngredient } from "../../services/filter.services";
import { useCocktailContext } from "../../services/CocktailContextProvider";
import { scrollToHeight } from "../../services/scroll.service";

function TriedList({ filterOn }) {
  const [cocktails, setCocktails] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [scrollHeight, setScrollHeight] = useState(0);
  let [loading, setLoading] = useState(true);
  const cocktailContext = useCocktailContext();
  const [currentPage, setCurrentPage] = useState(1);

  // Get cocktails
  useEffect(() => {
    CocktailService.getTriedCocktails().then((data) => {
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

  // Sort
  useEffect(() => {
    setCocktails(sortList(cocktails, cocktailContext.sortBy));
    setDisplayList([...cocktails]);
  }, [cocktailContext.sortBy, cocktails]);

  // Filter function for search term
  const filterBySearchTerm = (item) => {
    if (!item) return true;
    return searchQueryMatch(cocktailContext.searchTerm, item);
  };

  useEffect(() => {
    if (cocktailContext.scrollHeight !== 0) {
      scrollToHeight(cocktailContext.scrollHeight);
    }

    setTimeout(() => {
      cocktailContext.setScrollHeight(0);
    }, 200);
  });

  useEffect(() => {
    setCurrentPage(cocktailContext.pageNumber);
  }, [cocktailContext.pageNumber]);

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
                sortBy={cocktailContext.sortBy}
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
