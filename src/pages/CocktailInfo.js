import React from "react";
import "./CocktailInfo.css";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { RouteAnimation } from "../animations/RouteAnimation";

function CocktailInfo({ location }) {
  if (!!location.state) {
    let cocktail = location.state.cocktailItem;
    return (
      <motion.div
        className="cocktail-info"
        initial={RouteAnimation.infoInitial}
        animate={RouteAnimation.animate}
        exit={RouteAnimation.infoExit}
      >
        <h1>{cocktail.cocktailName}</h1>
        <img id="cocktail-info-image" src={cocktail.image}></img>
        <h1 className="cocktail-grade">Grade: {cocktail.cocktailGrade}</h1>
        <div className="cocktail-description">
          Notes: {cocktail.cocktailNotes}{" "}
        </div>
      </motion.div>
    );
  } else {
    return <div></div>;
  }
}

export default CocktailInfo;
