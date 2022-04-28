import React from "react";
import "./CocktailInfo.css";
import { motion } from "framer-motion";
import { duration } from "@mui/material";

function CocktailInfo() {
  return (
    <motion.div
      className="cocktail-info"
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.1 } }}
      exit={{ opacity: 0, x: "100%" }}
    >
      <h1>COcktailInfo</h1>
    </motion.div>
  );
}

export default CocktailInfo;
