import React from "react";
import "./Header.css";
import "../../animations/bubbles.css";
import Navbar from "../Navbar/Navbar";
import TitleSearchAddBar from "../TitleSearchAddBar/TitleSearchAddBar";

function Header() {
  return (
    <div className="header-body">
      <div className="bubbles">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="bubble"></div>
        ))}
      </div>
      <TitleSearchAddBar />
      <Navbar />
    </div>
  );
}

export default Header;
