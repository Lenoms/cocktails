import React from "react";
import "./CocktailInfo.css";
import { motion } from "framer-motion";
import { duration } from "@mui/material";

function CocktailInfo() {
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
      <h1>COcktailInfo</h1>
    </motion.div>
  );
}

export default CocktailInfo;
