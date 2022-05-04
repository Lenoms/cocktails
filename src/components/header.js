import React from "react";
import "./Header.css";
import Navbar from "./Navbar.js";
import TitleSearchAddBar from "./TitleSearchAddBar";

function Header() {
  return (
    <div className="header-body">
      <TitleSearchAddBar />
      <Navbar />
    </div>
  );
}

export default Header;
