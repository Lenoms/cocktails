import React from "react";
import "./PaginationBar.css";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { scrollToHeight } from "../../services/scroll.service";
import { useCocktailContext } from "../../services/CocktailContextProvider";

function PaginationBar({
  currentPage,
  setCurrentPage,
  totalItemCount,
  pageSize,
}) {
  const max_pages = Math.ceil(totalItemCount / pageSize);
  const cocktailContext = useCocktailContext();
  const incrementPage = () => {
    if (currentPage < max_pages) {
      cocktailContext.setPageNumber(currentPage + 1);
      setCurrentPage(currentPage + 1);
      scrollToHeight(0, "smooth");
    }
  };
  const decrementPage = () => {
    if (currentPage > 1) {
      cocktailContext.setPageNumber(currentPage - 1);
      setCurrentPage(currentPage - 1);
      scrollToHeight(0, "smooth");
    }
  };
  const jumpFirstPage = () => {
    cocktailContext.setPageNumber(1);
    setCurrentPage(1);
    scrollToHeight(0, "smooth");
  };
  const jumpLastPage = () => {
    cocktailContext.setPageNumber(max_pages);
    setCurrentPage(max_pages);
    scrollToHeight(0, "smooth");
  };
  return (
    <div className="pagination-bar-container">
      <div className="pagination-buttons">
        <button className="pagination-button" onClick={jumpFirstPage}>
          <FirstPageIcon />
        </button>
        <button className="pagination-button" onClick={decrementPage}>
          <NavigateBeforeIcon />
        </button>
        <div className="pagination-page-label">
          {currentPage}/{max_pages}
        </div>
        <button className="pagination-button" onClick={incrementPage}>
          <NavigateNextIcon />
        </button>
        <button className="pagination-button" onClick={jumpLastPage}>
          <LastPageIcon />
        </button>
      </div>
    </div>
  );
}

export default PaginationBar;
