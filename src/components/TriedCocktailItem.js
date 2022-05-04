import React from "react";
import "./TriedCocktailItem.css";
import placeholder from "../placeholder.jpg";
import DeleteIcon from "@mui/icons-material/Delete";
import { getDatabase, ref, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";

function TriedCocktailItem({ item }) {
  const navigate = useNavigate();
  let cocktailName = item.cocktailName;
  let cocktailGrade = item.cocktailGrade;
  let cocktailImageUrl = item.image;

  const deleteCocktail = (e) => {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    const db = getDatabase();
    remove(ref(db, "cocktails/tried/" + cocktailName));
  };

  const cocktailClicked = () => {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    navigate("/cocktails/info", { state: { cocktailItem: item } });
  };
  return (
    <Card className="tried-cocktail-item-body" onClick={cocktailClicked}>
      <h3 className="cocktail-name">{cocktailName}</h3>
      <h3>{cocktailGrade}</h3>
      <img id="cocktail-image" src={cocktailImageUrl}></img>
      <button className="delete-button" onClick={deleteCocktail}>
        <DeleteIcon />
      </button>
    </Card>
  );
}

export default TriedCocktailItem;
