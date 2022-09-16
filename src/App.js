import "./App.css";
import { AnimatePresence } from "framer-motion";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

const AppMain = ({
  searchQuery,
  searchSubmitted,
  sortBy,
  setSortBy,
  filterOn,
  setFilterOn,
}) => {
  return (
    <div className="App">
      <div className="app-header-and-body" id="app-header-and-body">
        <div className="app-header">
          <Header searchSubmitted={searchSubmitted} />
        </div>
        <div className="app-body">
          <AnimatePresence exitBeforeEnter>
            <AppRoutes
              sortBy={sortBy}
              searchQuery={searchQuery}
              filterOn={filterOn}
            />
          </AnimatePresence>
        </div>
      </div>

      <div className="footer">
        <Footer
          setSortBy={setSortBy}
          sortBy={sortBy}
          setFilterOn={setFilterOn}
        />
      </div>
    </div>
  );
};

function App() {
  const [sortBy, setSortBy] = useState("Alphabetical");
  const [searchQuery, setSearchQuery] = useState();
  const [filterOn, setFilterOn] = useState(false);
  const { isAuthenticated, isLoading } = useAuth0();
  const [loginTried, setLoginTried] = useState(false);

  function searchSubmitted(searchQuery) {
    setSearchQuery(searchQuery);
  }

  useEffect(() => {
    if (window.location.href.split("?").length > 1) {
      setLoginTried(true);
    }
  }, []);

  if (!isLoading || true) {
    if (isAuthenticated) {
      return (
        <AppMain
          searchQuery={searchQuery}
          searchSubmitted={searchSubmitted}
          sortBy={sortBy}
          setSortBy={setSortBy}
          setFilterOn={setFilterOn}
          filterOn={filterOn}
        />
      );
    } else {
      return <LoginPage loginTried={loginTried} />;
    }
  } else {
    return <LoadingSpinner />;
  }
}

export default App;
