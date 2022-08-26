import React from "react";
import CocktailInfo from "../pages/CocktailInfo/CocktailInfo";
import UpdateCocktailInfo from "../pages/CreateAndUpdateCocktail/UpdateCocktailInfo";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import TriedList from "../pages/Lists/TriedList";
import UntriedList from "../pages/Lists/UntriedList";
import CreateCocktail from "../pages/CreateAndUpdateCocktail/CreateCocktail";
import LoginPage from "../pages/LoginPage/LoginPage";
import { useAuth0 } from "@auth0/auth0-react";

function AppRoutes({ sortBy, searchQuery }) {
  let location = useLocation();
  const { isAuthenticated } = useAuth0();
  if (isAuthenticated) {
    return (
      <Routes location={location} key={location.pathname}>
        <Route
          exact
          path="/cocktails/tried"
          element={<TriedList sortBy={sortBy} searchQuery={searchQuery} />}
        />
        <Route
          exact
          path="/cocktails/untried"
          element={<UntriedList searchQuery={searchQuery} />}
        />
        <Route exact path="/cocktails/create" element={<CreateCocktail />} />
        <Route
          exact
          path="/cocktails/info"
          element={<CocktailInfo location={location} />}
        />
        <Route
          exact
          path="/cocktails/update"
          element={<UpdateCocktailInfo location={location} />}
        />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/*" element={<LoginPage />} />
      </Routes>
    );
  }
}

export default AppRoutes;
