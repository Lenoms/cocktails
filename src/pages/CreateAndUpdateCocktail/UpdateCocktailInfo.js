import React from "react";
import { motion } from "framer-motion";
import { getDatabase, ref as databaseRef, remove } from "firebase/database";
import CocktailService from "../../services/cocktail.service";
import { useNavigate } from "react-router-dom";
import "./CreateUpdate.css";
import "./UpdateCocktailInfo.css";
import CocktailUpsertForm from "../../components/CocktailUpsertForm/CocktailUpsertForm";

function UpdateCocktailInfo({ location }) {
  if (!!location.state) {
    let navigate = useNavigate();
    let defaultCocktail = {
      ...location.state.cocktailItem,
      tried: location.state.tried,
    };

    function updateCocktail(cocktailObject) {
      var date = defaultCocktail.date;

      if (location.state.tried) {
        CocktailService.deleteCocktail(defaultCocktail.cocktailName, "tried");
      } else {
        CocktailService.deleteCocktail(defaultCocktail.cocktailName, "untried");
      }
      if (cocktailObject.tried) {
        CocktailService.writeTriedToDatabase(
          cocktailObject.name,
          cocktailObject.daniel_grade,
          cocktailObject.dani_grade,
          cocktailObject.notes,
          cocktailObject.ingredients,
          cocktailObject.imgUrl,
          date,
          cocktailObject.tags
        );
        navigate("/cocktails/tried");
      } else {
        CocktailService.writeUntriedToDatabase(
          cocktailObject.name,
          cocktailObject.notes,
          cocktailObject.ingredients
        );
        navigate("/cocktails/untried");
      }
    }

    return (
      <motion.div
        className="update-cocktail"
        initial={{
          opacity: 0,
          x: "-200vw",
          transition: { ease: "easeInOut", duration: 0.5 },
        }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
        exit={{
          opacity: 0,
          x: "-200vw",
          transition: { ease: "easeInOut", duration: 0.5 },
        }}
      >
        <CocktailUpsertForm
          addCocktail={updateCocktail}
          defaultCocktailObject={defaultCocktail}
        />
      </motion.div>
    );
  }
}

export default UpdateCocktailInfo;

// <form className="cocktail-form" onSubmit={updateCocktail}>
//   <h1>Update {cocktail.cocktailName}</h1>
//   <div className="form-input-field-container">
//     <label className="form-label" htmlFor="cocktail-name">
//       Cocktail Name
//     </label>
//     <input
//       className="form-input-field"
//       type="text"
//       id="cocktail-name"
//       name="cocktail-name"
//       defaultValue={cocktail.cocktailName}
//       autoComplete="off"
//     ></input>
//     <p id="validation-message" hidden style={{ color: "red", margin: 0 }}>
//       Cocktail name cannot be empty!
//     </p>
//   </div>
//   <div className="tried-checkbox-container">
//     <div className="tried-text">Tried?</div>
//     <input
//       type="checkbox"
//       id="tried"
//       onChange={checkboxClicked}
//       className="checkbox"
//       checked={tried}
//     ></input>
//   </div>
//   <div className="form-input-field-container">
//     <label className="form-label" htmlFor="cocktail-notes">
//       Notes:
//     </label>
//     <textarea
//       className="notes-field"
//       rows={4}
//       type="text"
//       id="cocktail-notes"
//       name="cocktail-notes"
//       defaultValue={cocktail.cocktailNotes}
//     ></textarea>
//   </div>

//   <Ingredients
//     ingredients={ingredients}
//     setIngredients={setIngredients}
//   ></Ingredients>
//   {tried && (
//     <>
//       <UploadForm
//         uploadImage={uploadImage}
//         imgUrl={imgUrl}
//         progresspercent={progresspercent}
//         defaultGrades={default_grades}
//       ></UploadForm>
//     </>
//   )}
//   {imgUrl && (
//     <img className="create-update-image" src={imgUrl} alt="uploaded file" />
//   )}

//   <button
//     disabled={progresspercent != 0 && !imgUrl}
//     className="submit-button"
//     type="submit"
//   >
//     Update
//   </button>
// </form>;
