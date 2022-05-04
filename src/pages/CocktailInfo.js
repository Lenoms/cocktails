import React from "react";
import "./CocktailInfo.css";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { RouteAnimation } from "../animations/RouteAnimation";

function CocktailInfo({ location }) {
  if (!!location.state) {
    let navigate = useNavigate();
    let cocktail = location.state.cocktailItem;

    const editCocktail = () => {
      navigate("/cocktails/update", {
        state: { cocktailItem: cocktail, tried: true },
      });
    };
    return (
      <motion.div
        className="cocktail-info"
        initial={RouteAnimation.infoInitial}
        animate={RouteAnimation.animate}
        exit={RouteAnimation.infoExit}
      >
        <h1>{cocktail.cocktailName}</h1>
        <img id="cocktail-info-image" src={cocktail.image}></img>
        <h4 className="cocktail-grade">Grade: {cocktail.cocktailGrade}</h4>
        <div className="cocktail-description">
          <h5>Notes:</h5>
          <p>{cocktail.cocktailNotes ? cocktail.cocktailNotes : "N/A"} </p>
        </div>
        <div className="cocktail-ingredients">
          <h5>Ingredients:</h5>
          <ul>
            {cocktail.ingredients &&
              cocktail.ingredients.map(function (ingredient) {
                return (
                  <div className="ingredients-list-item" key={ingredient}>
                    <li>{ingredient}</li>
                  </div>
                );
              })}
          </ul>
        </div>
        <div className="cocktail-edit-button-container">
          <button className="cocktail-edit-button" onClick={editCocktail}>
            Edit
          </button>
        </div>
      </motion.div>
    );
  } else {
    return <div></div>;
  }
}

export default CocktailInfo;
