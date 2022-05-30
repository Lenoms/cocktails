import React from "react";
import "./Header.css";
import "../../animations/bubbles.css";
import Navbar from "../Navbar/Navbar";
import TitleSearchAddBar from "../TitleSearchAddBar/TitleSearchAddBar";

function Header({ searchSubmitted }) {
  return (
    <div className="header-body">
      <div className="bubbles">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
      <TitleSearchAddBar searchSubmitted={searchSubmitted} />
      <Navbar />
    </div>
  );
}

export default Header;
