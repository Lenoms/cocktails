import React from "react";
import CocktailInfo from "../pages/CocktailInfo/CocktailInfo";
import UpdateCocktailInfo from "../pages/CreateAndUpdateCocktail/UpdateCocktailInfo";
import { Routes, Route, useLocation } from "react-router-dom";
import TriedList from "../pages/Lists/TriedList";
import UntriedList from "../pages/Lists/UntriedList";
import CreateCocktail from "../pages/CreateAndUpdateCocktail/CreateCocktail";

function AppRoutes() {
  let location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route exact path="/" element={<TriedList />} />
      <Route exact path="/tried" element={<TriedList />} />
      <Route exact path="/untried" element={<UntriedList />} />
      <Route exact path="/create" element={<CreateCocktail />} />
      <Route
        exact
        path="/info"
        element={<CocktailInfo location={location} />}
      />
      <Route
        exact
        path="/update"
        element={<UpdateCocktailInfo location={location} />}
      />
    </Routes>
  );
}

export default AppRoutes;
