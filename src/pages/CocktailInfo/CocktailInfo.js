import React, { useState, useEffect } from "react";
import "./CocktailInfo.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { RouteAnimation } from "../../animations/RouteAnimation";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import CocktailService from "../../services/cocktail.service";
import { scrollToHeight } from "../../services/scroll.service";
import Tag from "../../components/Tags/Tag";

function CocktailInfo({ location }) {
  const [hideDeleteModal, setHideDeleteModal] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    scrollToHeight(0);
  }, []);

  if (!!location.state) {
    let cocktail = location.state.cocktailItem;

    let danielGrade = cocktail.danielGrade
      ? parseInt(cocktail.danielGrade)
      : "N/A";
    let daniGrade = cocktail.daniGrade ? parseInt(cocktail.daniGrade) : "N/A";
    let overallGrade = CocktailService.calculateAverageGrade(
      danielGrade,
      daniGrade
    );

    const editCocktail = () => {
      navigate("/cocktails/update", {
        state: { cocktailItem: cocktail, tried: true },
      });
    };

    const deleteCocktail = (e) => {
      CocktailService.deleteCocktail(cocktail.cocktailName, "tried");
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

        <div className="cocktail-info-tags-container">
          {cocktail.tags &&
            cocktail.tags.map((tag) => {
              return <Tag tag={tag} />;
            })}
        </div>

        <div className="cocktail-date-created-container">
          <div style={{ marginRight: "5px", fontWeight: "bold" }}>Date: </div>
          <div style={{ color: "grey" }}>{cocktail.date[1]}</div>
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
            deleteString={cocktail.cocktailName}
          />
        )}
      </motion.div>
    );
  } else {
    return <div></div>;
  }
}

export default CocktailInfo;
