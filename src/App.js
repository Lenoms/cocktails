import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import TriedList from "./pages/Lists/TriedList";
import UntriedList from "./pages/Lists/UntriedList";
import CreateCocktail from "./pages/CreateAndUpdateCocktail/CreateCocktail";
import { AnimatePresence } from "framer-motion";
import CocktailInfo from "./pages/CocktailInfo/CocktailInfo";
import UpdateCocktailInfo from "./pages/CreateAndUpdateCocktail/UpdateCocktailInfo";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { useState } from "react";

function App() {
  let location = useLocation();

  const [sortBy, setSortBy] = useState("Alphabetical");
  const [searchQuery, setSearchQuery] = useState();

  function searchSubmitted(searchQuery) {
    setSearchQuery(searchQuery);
  }

  return (
    <div className="App">
      <div className="app-header-and-body">
        <div className="app-header">
          <Header searchSubmitted={searchSubmitted} />
        </div>
        <div className="app-body">
          <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
              <Route
                path="/cocktails"
                element={
                  <TriedList sortBy={sortBy} searchQuery={searchQuery} />
                }
              />
              <Route
                exact
                path="/cocktails/tried"
                element={
                  <TriedList sortBy={sortBy} searchQuery={searchQuery} />
                }
              />
              <Route
                exact
                path="/cocktails/untried"
                element={<UntriedList searchQuery={searchQuery} />}
              />
              <Route
                exact
                path="/cocktails/create"
                element={<CreateCocktail />}
              />
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
          </AnimatePresence>
        </div>
      </div>

      <div className="footer">
        <Footer setSortBy={setSortBy} sortBy={sortBy} />
      </div>
    </div>
  );
}

export default App;
