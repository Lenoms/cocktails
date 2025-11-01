import React from "react";
import CocktailInfo from "../pages/CocktailInfo/CocktailInfo";
import UpdateCocktailInfo from "../pages/CreateAndUpdateCocktail/UpdateCocktailInfo";
import { Routes, Route, useLocation } from "react-router-dom";
import TriedList from "../pages/Lists/TriedList";
import UntriedList from "../pages/Lists/UntriedList";
import CreateCocktail from "../pages/CreateAndUpdateCocktail/CreateCocktail";
import FilterList from "../pages/FilterList/FilterList";

function AppRoutes({ filterOn }) {
  let location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route exact path="/" element={<TriedList filterOn={filterOn} />} />
      <Route exact path="/tried" element={<TriedList filterOn={filterOn} />} />
      <Route
        exact
        path="/untried"
        element={<UntriedList filterOn={filterOn} />}
      />
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
      <Route exact path="/filter" element={<FilterList />} />
    </Routes>
  );
}

export default AppRoutes;
