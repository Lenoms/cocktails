import "./App.css";
import { AnimatePresence } from "framer-motion";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { useState } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
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
            <AppRoutes sortBy={sortBy} searchQuery={searchQuery} />
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
