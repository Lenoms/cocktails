import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import TriedList from "./pages/TriedList";
import UntriedList from "./pages/UntriedList";
import CreateCocktail from "./pages/CreateCocktail";
import { AnimatePresence } from "framer-motion";
import CocktailInfo from "./pages/CocktailInfo";
import UpdateCocktailInfo from "./pages/UpdateCocktailInfo";

function App() {
  let location = useLocation();
  return (
    <div className="App">
      <Header />

      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/cocktails" element={<TriedList />} />
          <Route exact path="/cocktails/tried" element={<TriedList />} />
          <Route exact path="/cocktails/untried" element={<UntriedList />} />
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
      </AnimatePresence>
    </div>
  );
}

export default App;
