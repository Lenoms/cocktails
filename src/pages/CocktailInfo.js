import React from "react";
import "./CocktailInfo.css";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

function CocktailInfo({ location }) {
  if (!!location.state) {
    let cocktail = location.state.cocktailItem;
    return (
      <motion.div
        className="cocktail-info"
        initial={{
          opacity: 0,
          x: "200vw",
          transition: { ease: "easeInOut", duration: 0.5 },
        }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
        exit={{
          opacity: 0,
          x: "200vw",
          transition: { ease: "easeInOut", duration: 0.5 },
        }}
      >
        <h1>{cocktail.cocktailName}</h1>
      </motion.div>
    );
  } else {
    return <div></div>;
  }
}

export default CocktailInfo;
