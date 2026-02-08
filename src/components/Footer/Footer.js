import React, { useEffect, useState } from "react";
import "./Footer.css";
import "../../animations/bubbles.css";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import LogoutButton from "../LogButtons/LogoutButton";
import { useCocktailContext } from "../../services/CocktailContextProvider";
import { SORT_OPTIONS_ARRAY } from "../../constants/sortOptions.constants";
import { locationShouldShowCocktailIcon } from "../../config/FooterConfig";

function Footer() {
  const [activeFooter, setActiveFooter] = useState(false);
  const [showCocktailIcon, setShowCocktailIcon] = useState(true);
  const cocktailContext = useCocktailContext();
  const location = useLocation();

  const toggleFooter = () => {
    setActiveFooter(!activeFooter);
  };

  const handleSortSelect = (e) => {
    const sortBySelected = e.target.value;
    cocktailContext.setSortBy(sortBySelected);
    cocktailContext.setPageNumber(1);
  };

  const variants = {
    low: { y: 0 },
    high: { y: "-80%", rotate: 360 },
  };

  useEffect(() => {
    if (locationShouldShowCocktailIcon(location)) {
      setShowCocktailIcon(true);
    } else {
      setActiveFooter(false);
      setShowCocktailIcon(false);
    }
  }, [location]);

  return (
    <>
      {showCocktailIcon && (
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
      )}
      <div
        className={
          activeFooter
            ? "footer-container footer-container-up"
            : "footer-container footer-container-down"
        }
      >
        <div className="bubbles">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="bubble"></div>
          ))}
        </div>
        <div className="footer-body">
          {activeFooter ? (
            <div className="footer-nav-bar">
              <div style={{ width: "12%", height: "100%" }} />
              <div className="footer-options-container">
                <select
                  onChange={handleSortSelect}
                  name="sorter"
                  className="footer-sorter"
                  defaultValue={cocktailContext.sortBy}
                >
                  {SORT_OPTIONS_ARRAY.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <LogoutButton size={["10%", "50%"]} />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Footer;
