import React, { createContext, useContext, useState } from "react";
import { SORT_OPTIONS } from "../constants/sortOptions.constants";

const CocktailContext = createContext({});

function CocktailContextProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.ALPHABETICAL);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const cocktailContextState = {
    searchTerm: searchTerm,
    setSearchTerm: setSearchTerm,
    sortBy: sortBy,
    setSortBy: setSortBy,
    scrollHeight: scrollHeight,
    setScrollHeight: setScrollHeight,
    pageNumber: pageNumber,
    setPageNumber: setPageNumber,
  };
  return (
    <CocktailContext.Provider value={cocktailContextState}>
      {children}
    </CocktailContext.Provider>
  );
}

const useCocktailContext = () => useContext(CocktailContext);

export { useCocktailContext, CocktailContextProvider };
