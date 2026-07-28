import React, { useEffect, useState, useMemo } from "react";
import "./Lists.css";
import TriedCocktailItem from "../../components/TriedCocktailItem/TriedCocktailItem";
import RouteWrapper from "../../components/RouteWrapper/RouteWrapper";
import { sortList } from "../../services/sorter.service";
import { searchQueryMatch } from "../../services/search.service";
import CocktailService from "../../services/cocktail.service";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import PaginationBar from "../../components/PaginationBar/PaginationBar";
import { useCocktailContext } from "../../services/CocktailContextProvider";
import { scrollToHeight } from "../../services/scroll.service";
import NoResultsFound from "../../components/NoResultsFound/NoResultsFound";

function TriedList() {
  const [original, setOriginal] = useState([]);
  const [loading, setLoading] = useState(true);
  const cocktailContext = useCocktailContext();
  const [currentPage, setCurrentPage] = useState(
    cocktailContext.pageNumber ?? 1,
  );

  const pageSize = 20;

  useEffect(() => {
    async function load() {
      const items = await CocktailService.fetchCocktails(true);
      setOriginal(items);
      setLoading(false);
    }
    load();
  }, []);

  const cocktails = useMemo(
    () => sortList(original, cocktailContext.sortBy),
    [original, cocktailContext.sortBy],
  );

  const filtered = useMemo(
    () =>
      cocktails.filter((item) =>
        item ? searchQueryMatch(cocktailContext.searchTerm, item) : true,
      ),
    [cocktails, cocktailContext.searchTerm],
  );

  const [lastSortBy, setLastSortBy] = useState(cocktailContext.sortBy);
  if (cocktailContext.sortBy !== lastSortBy) {
    setLastSortBy(cocktailContext.sortBy);
    setCurrentPage(1);
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (filtered.length === 0) {
    return <NoResultsFound />;
  }

  return (
    <RouteWrapper className="list">
      {filtered
        .slice((currentPage - 1) * pageSize, currentPage * pageSize)
        .map((item) => (
          <TriedCocktailItem
            key={item.cocktailId}
            item={item}
            sortBy={cocktailContext.sortBy}
          ></TriedCocktailItem>
        ))}
      <PaginationBar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItemCount={filtered.length}
        pageSize={pageSize}
      />
    </RouteWrapper>
  );
}

export default TriedList;
