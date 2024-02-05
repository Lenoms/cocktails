import React, { useEffect, useState } from "react";
import "./TriedCocktailItem.css";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import { useCocktailContext } from "../../services/CocktailContextProvider";
import Tag from "../Tags/Tag";
import CocktailService from "../../services/cocktail.service";

function TriedCocktailItem({ item, sortBy }) {
  const navigate = useNavigate();
  let cocktailName = item.cocktailName;
  let danielGrade = item.danielGrade ? parseInt(item.danielGrade) : "N/A";
  let daniGrade = item.daniGrade ? parseInt(item.daniGrade) : "N/A";
  let overallGrade = CocktailService.calculateAverageGrade(
    danielGrade,
    daniGrade
  );
  let cocktailImageUrl = item.image;
  const cocktailContext = useCocktailContext();

  let tags = [];
  if (item.tags) {
    tags = item.tags;
  }

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
    cocktailContext.setScrollHeight(
      document.getElementById("app-header-and-body").scrollTop
    );
    navigate("/cocktails/info", { state: { cocktailItem: item } });
  };

  const getGradeBorderColour = (grade) => {
    const gradientArray = [
      "#FF0000",
      "#FF0000",
      "#FF0000",
      "#FF0000",
      "#E24200",
      "#E27E00",
      "#E2B600",
      "#D2E200",
      "#6BE200",
      "#00E22D",
    ];
    const index = Math.floor(grade / 10);
    return gradientArray[index];
  };
  return (
    <Card
      className="tried-cocktail-item-body"
      onClick={cocktailClicked}
      style={{ backgroundColor: "#FFE5B0" }}
    >
      <div className="border-tried-left"></div>
      <div className="tried-cocktail-info-container">
        <div className="tried-cocktail-name-grade">
          <div className="cocktail-name">{cocktailName}</div>
          <div
            className="tried-cocktail-item-grade"
            style={{
              color:
                sortBy == "Daniel Grade" || sortBy == "Dani Grade"
                  ? "#FF1493"
                  : "black",
              borderColor: getGradeBorderColour(gradeToShow),
            }}
          >
            {gradeToShow}
          </div>
        </div>
        <div className="tried-cocktail-tags">
          {tags.map((tag) => {
            return <Tag tag={tag} />;
          })}
        </div>
        <div className="tried-cocktail-date-created">{item.date[1]}</div>
      </div>
      <img loading="lazy" id="cocktail-image" src={cocktailImageUrl}></img>
    </Card>
  );
}

export default TriedCocktailItem;
