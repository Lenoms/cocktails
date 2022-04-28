import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import TriedList from "./components/TriedList";
import UntriedList from "./components/UntriedList";
import CreateCocktail from "./components/CreateCocktail";
import { AnimatePresence } from "framer-motion";
import CocktailInfo from "./components/CocktailInfo";

function App() {
  let location = useLocation();
  return (
    <div className="App">
      <Header />

      <AnimatePresence exitBeforeEnter>
        <Routes location={location}>
          <Route exact path="/cocktails/tried" element={<TriedList />} />
          <Route exact path="/cocktails/untried" element={<UntriedList />} />
          <Route exact path="/cocktails/create" element={<CreateCocktail />} />
          <Route exact path="/cocktails/info" element={<CocktailInfo />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
