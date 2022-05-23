import React from "react";
import "./Header.css";
import "../animations/bubbles.css";
import Navbar from "./Navbar.js";
import TitleSearchAddBar from "./TitleSearchAddBar";

function Header() {
  return (
    <div className="header-body">
      <div class="bubbles">
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
      </div>
      <TitleSearchAddBar />
      <Navbar />
    </div>
  );
}

export default Header;
