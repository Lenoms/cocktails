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
  let danielGrade = parseInt(item.danielGrade);
  let daniGrade = parseInt(item.daniGrade);
  let overallGrade = (danielGrade + daniGrade) / 2;
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
    <Card
      className="tried-cocktail-item-body"
      onClick={cocktailClicked}
      style={{ backgroundColor: "#FFE5B0" }}
    >
      <div className="border-tried-left"></div>
      <h4 className="cocktail-name">{cocktailName}</h4>
      <h4 className="tried-cocktail-item-grade">{overallGrade}</h4>
      <img id="cocktail-image" src={cocktailImageUrl}></img>
      <button className="delete-button" onClick={deleteCocktail}>
        <DeleteIcon style={{ color: "orange" }} />
      </button>
    </Card>
  );
}

export default TriedCocktailItem;
