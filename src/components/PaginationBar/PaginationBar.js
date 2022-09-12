import React from "react";
import "./PaginationBar.css";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

function PaginationBar({
  currentPage,
  setCurrentPage,
  totalItemCount,
  pageSize,
}) {
  const el = document.getElementById("app-header-and-body");
  const incrementPage = () => {
    console.log(currentPage, totalItemCount);
    if (!(currentPage > Math.floor(totalItemCount / pageSize))) {
      setCurrentPage(currentPage + 1);
      el.scrollTo(0, 0);
    }
  };
  const decrementPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      el.scrollTo(0, 0);
    }
  };
  const jumpFirstPage = () => {
    setCurrentPage(1);
    el.scrollTo(0, 0);
  };
  const jumpLastPage = () => {
    setCurrentPage(Math.ceil(totalItemCount / pageSize));
    el.scrollTo(0, 0);
  };
  return (
    <div className="pagination-bar-container">
      <div style={{ width: "40%" }}></div>
      <div className="pagination-page-label">{currentPage}</div>
      <div className="pagination-buttons">
        <button className="pagination-button" onClick={jumpFirstPage}>
          <FirstPageIcon />
        </button>
        <button className="pagination-button" onClick={decrementPage}>
          <NavigateBeforeIcon />
        </button>
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
