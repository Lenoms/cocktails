import React from "react";
import "./TriedCocktailItem.css";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import { useCocktailContext } from "../../services/CocktailContextProvider";
import Tag from "../Tags/Tag";
import CocktailService from "../../services/cocktail.service";
import { formatPrettyDate } from "../../utils/dateFormatUtil";
import {
  GRADE_COLORS,
  GRADE_TYPES,
  COLORS,
} from "./TriedCocktailItem.constants";

function TriedCocktailItem({ item, sortBy }) {
  const navigate = useNavigate();
  const cocktailName = item.name;
  const danielGrade = item.danielGrade ? parseInt(item.danielGrade) : "N/A";
  const daniGrade = item.daniGrade ? parseInt(item.daniGrade) : "N/A";
  const overallGrade = CocktailService.calculateAverageGrade(
    danielGrade,
    daniGrade,
  );
  const cocktailImageUrl = item.versions ? item.versions[0].imgUrl : item.image;
  const cocktailContext = useCocktailContext();
  const tags = item.tags || [];

  const getGradeToShow = () => {
    switch (sortBy) {
      case GRADE_TYPES.DANIEL:
        return danielGrade;
      case GRADE_TYPES.DANI:
        return daniGrade;
      case GRADE_TYPES.OVERALL:
      default:
        return overallGrade;
    }
  };

  const gradeToShow = getGradeToShow();

  const cocktailClicked = (e) => {
    e.stopPropagation();
    cocktailContext.setScrollHeight(
      document.getElementById("app-header-and-body").scrollTop,
    );
    navigate("/info", { state: { cocktailItem: item } });
  };

  const getGradeBorderColour = (grade) => {
    const index = Math.floor(grade / 10);
    return GRADE_COLORS[index];
  };
  return (
    <Card
      className="tried-cocktail-item-body"
      onClick={cocktailClicked}
      style={{ backgroundColor: COLORS.BACKGROUND }}
    >
      <div className="border-tried-left"></div>
      <div className="tried-cocktail-info-container">
        <div className="tried-cocktail-name-grade">
          <div className="cocktail-name">{cocktailName}</div>
          <div
            className="tried-cocktail-item-grade"
            style={{
              color:
                sortBy === GRADE_TYPES.DANIEL || sortBy === GRADE_TYPES.DANI
                  ? COLORS.INDIVIDUAL_GRADE_TEXT
                  : COLORS.DEFAULT_TEXT,
              borderColor: getGradeBorderColour(gradeToShow),
            }}
          >
            {gradeToShow}
          </div>
        </div>
        <div className="tried-cocktail-tags">
          {tags.map((tag, index) => {
            return <Tag key={index} tag={tag} />;
          })}
        </div>
        <div className="tried-cocktail-date-created">
          {formatPrettyDate(item.createdAt)}
        </div>
      </div>
      <img
        loading="lazy"
        id="cocktail-image"
        src={cocktailImageUrl}
        alt={cocktailName}
      />
    </Card>
  );
}

export default TriedCocktailItem;
