import "./App.css";
import { AnimatePresence } from "framer-motion";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import { CocktailContextProvider } from "./services/CocktailContextProvider";

const AppMain = ({ filterOn, setFilterOn }) => {
  return (
    <div className="App">
      <div className="app-header-and-body" id="app-header-and-body">
        <div className="app-header">
          <Header />
        </div>
        <div className="app-body">
          <AnimatePresence exitBeforeEnter>
            <AppRoutes filterOn={filterOn} />
          </AnimatePresence>
        </div>
      </div>

      <div className="footer">
        <Footer setFilterOn={setFilterOn} />
      </div>
    </div>
  );
};

function App() {
  const [filterOn, setFilterOn] = useState(false);
  const { isAuthenticated, isLoading } = useAuth0();
  const [loginTried, setLoginTried] = useState(false);

  useEffect(() => {
    if (window.location.href.split("?").length > 1) {
      setLoginTried(true);
    }
  }, []);

  if (!isLoading) {
    if (isAuthenticated) {
      return (
        <CocktailContextProvider>
          <AppMain setFilterOn={setFilterOn} filterOn={filterOn} />
        </CocktailContextProvider>
      );
    } else {
      return <LoginPage loginTried={loginTried} />;
    }
  } else {
    return <LoadingSpinner />;
  }
}

export default App;
