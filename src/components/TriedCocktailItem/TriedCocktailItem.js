import React, { useEffect, useState } from "react";
import "./TriedCocktailItem.css";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";

function TriedCocktailItem({ item, sortBy }) {
  const navigate = useNavigate();
  let cocktailName = item.cocktailName;
  let danielGrade = parseInt(item.danielGrade);
  let daniGrade = parseInt(item.daniGrade);
  let overallGrade = (danielGrade + daniGrade) / 2;
  let cocktailImageUrl = item.image;

  const [gradeToShow, setGradeToShow] = useState(overallGrade);

  useEffect(() => {
    if (sortBy == "Overall Grade") {
      setGradeToShow(overallGrade);
    } else if (sortBy == "Daniel Grade") {
      setGradeToShow(danielGrade);
    } else if (sortBy == "Dani Grade") {
      setGradeToShow(daniGrade);
    }
  }, [sortBy]);

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
      <h4
        className="tried-cocktail-item-grade"
        style={{
          color:
            sortBy == "Daniel Grade" || sortBy == "Dani Grade"
              ? "#FF1493"
              : "black",
        }}
      >
        {gradeToShow}
      </h4>
      <img loading="lazy" id="cocktail-image" src={cocktailImageUrl}></img>
    </Card>
  );
}

export default TriedCocktailItem;
