import React, { useState } from "react";
import "./Footer.css";
import "../animations/bubbles.css";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

function Footer({ setSortBy }) {
  const [activeFooter, setActiveFooter] = useState(false);

  function toggleFooter() {
    setActiveFooter(!activeFooter);
  }

  function handleSortSelect() {
    let sortBy = document.getElementById("sorter").value;
    setSortBy(sortBy);
  }

  const variants = {
    low: { y: 0 },
    high: { y: -40, rotate: 360 },
  };

  let location = useLocation();
  if (
    location.pathname == "/cocktails/info" ||
    location.pathname == "/cocktails/create" ||
    location.pathname == "/cocktails/update"
  ) {
    return null;
  }

  return (
    <div
      className={
        activeFooter
          ? "footer-container footer-container-up"
          : "footer-container footer-container-down"
      }
    >
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
      <div className="footer-cocktail-image-container">
        <motion.img
          onClick={toggleFooter}
          animate={activeFooter ? "high" : "low"}
          variants={variants}
          transition={{ type: "spring" }}
          className="footer-cocktail-image"
          src={process.env.PUBLIC_URL + "/cocktail-footer.png"}
        />
      </div>
      <div className="footer-body">
        {activeFooter ? (
          <div className="footer-nav-bar">
            <select
              onChange={handleSortSelect}
              name="sorter"
              id="sorter"
              className="footer-sorter"
              defaultValue={"Alphabetical"}
            >
              <option>Alphabetical</option>
              <option>Overall Grade</option>
              <option>Daniel Grade</option>
              <option>Dani Grade</option>
            </select>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Footer;
