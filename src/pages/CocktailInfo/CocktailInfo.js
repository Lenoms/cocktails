import React, { useState } from "react";
import "./CocktailInfo.css";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { RouteAnimation } from "../../animations/RouteAnimation";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getDatabase, ref, remove } from "firebase/database";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

function CocktailInfo({ location }) {
  if (!!location.state) {
    let navigate = useNavigate();
    let cocktail = location.state.cocktailItem;
    const [hideDeleteModal, setHideDeleteModal] = useState(true);

    let danielGrade = parseInt(cocktail.danielGrade);
    let daniGrade = parseInt(cocktail.daniGrade);
    let overallGrade = (danielGrade + daniGrade) / 2;

    const editCocktail = () => {
      navigate("/cocktails/update", {
        state: { cocktailItem: cocktail, tried: true },
      });
    };

    const deleteCocktail = (e) => {
      if (!e) var e = window.event;
      e.cancelBubble = true;
      if (e.stopPropagation) e.stopPropagation();
      const db = getDatabase();
      remove(ref(db, "cocktails/tried/" + cocktail.cocktailName));
      navigate("/cocktails/tried");
    };

    const showDeleteModal = () => {
      setHideDeleteModal(false);
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
        <div className="cocktail-info-grades-container">
          <h4 className="cocktail-grade">Grade: {overallGrade}</h4>
          <h6>
            Daniel: {danielGrade}, Dani: {daniGrade}
          </h6>
        </div>
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
        <div className="cocktail-buttons-container">
          <button className="cocktail-edit-button" onClick={editCocktail}>
            <EditIcon />
          </button>
          <button className="cocktail-delete-button" onClick={showDeleteModal}>
            <DeleteIcon style={{ color: "black" }} />
          </button>
        </div>
        {!hideDeleteModal && (
          <DeleteModal
            confirmDelete={deleteCocktail}
            handleCancel={() => setHideDeleteModal(true)}
          />
        )}
      </motion.div>
    );
  } else {
    return <div></div>;
  }
}

export default CocktailInfo;
