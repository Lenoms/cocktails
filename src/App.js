import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TriedList from "./components/TriedList";
import UntriedList from "./components/UntriedList";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/cocktails/tried" element={<TriedList />} />
        <Route exact path="/cocktails/untried" element={<UntriedList />} />
      </Routes>
    </div>
  );
}

export default App;
