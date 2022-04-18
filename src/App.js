import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TriedList from "./components/TriedList";
import UntriedList from "./components/UntriedList";
import CreateCocktail from "./components/CreateCocktail";

function App() {
  return (
    <div className="App">
      <Header />
      <div>Hello!</div>
      <Routes>
        <Route exact path="/cocktails/tried" element={<TriedList />} />
        <Route exact path="/cocktails/untried" element={<UntriedList />} />
        <Route exact path="/cocktails/create" element={<CreateCocktail />} />
      </Routes>
    </div>
  );
}

export default App;
