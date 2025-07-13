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
import VersionInfoList from "../../components/Versions/VersionInfoList/VersionInfoList";
import VersionInfo from "../../components/Versions/VersionInfo/VersionInfo";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { reformatTried } from "../../services/reformat.service";

function CocktailInfo({ location }) {
  const [hideDeleteModal, setHideDeleteModal] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    scrollToHeight(0);
  }, []);

  const [sliderRef] = useKeenSlider();

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

    // Backwards compatability (i.e if a cocktail doesn't have versions)
    const versions = cocktail.versions ?? [
      {
        ingredients: cocktail.ingredients,
        notes: cocktail.cocktailNotes,
        imgUrl: cocktail.image,
      },
    ];

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
        <div className="image-slider-container">
          <div ref={sliderRef} className="keen-slider">
            {versions.map((version) => {
              return (
                <img
                  key={version.imgUrl}
                  className="keen-slider__slide cocktail-info-image"
                  src={version.imgUrl}
                />
              );
            })}
          </div>
        </div>
        <div className="cocktail-info-grades-container">
          <h4 className="cocktail-grade">Grade: {overallGrade}</h4>
          <h6>
            Daniel: {danielGrade}, Dani: {daniGrade}
          </h6>
        </div>

        {cocktail.versions && cocktail.versions.length > 1 ? (
          <VersionInfoList versions={cocktail.versions} />
        ) : (
          <VersionInfo version={versions[0]} />
        )}

        <div className="cocktail-info-tags-container">
          {cocktail.tags &&
            cocktail.tags.map((tag) => {
              return <Tag tag={tag} />;
            })}
        </div>

        <div className="cocktail-date-created-container">
          <div style={{ marginRight: "5px", fontWeight: "bold" }}>Date: </div>
          <div style={{ color: "grey" }}>
            {CocktailService.getNonAmericanDateString(cocktail.date[1])}
          </div>
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
