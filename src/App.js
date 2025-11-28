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
import { getAuth, signInAnonymously } from "firebase/auth";

const AppMain = () => {
  return (
    <div className="App">
      <div className="app-header-and-body" id="app-header-and-body">
        <div className="app-header">
          <Header />
        </div>
        <div className="app-body">
          <AnimatePresence exitBeforeEnter>
            <AppRoutes />
          </AnimatePresence>
        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

function App() {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [loginTried, setLoginTried] = useState(false);
  const [auth0AndFBAuthenticated, setauth0AndFBAuthenticated] = useState(false);

  // Still no perfect. The API key is stored in index.js. I think we need to figure out a way to authenticate
  // to FB with our auth0 token. That way its all locked up and secure behind auth0.
  const authenticateToFirebase = () => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        setauth0AndFBAuthenticated(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (window.location.href.split("?").length > 1) {
      setLoginTried(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      authenticateToFirebase();
    }
  }, [isAuthenticated]);

  if (!isLoading) {
    if (auth0AndFBAuthenticated) {
      return (
        <CocktailContextProvider>
          <AppMain />
        </CocktailContextProvider>
      );
    } else if (isAuthenticated) {
      return <LoadingSpinner />;
    } else {
      return <LoginPage loginTried={loginTried} />;
    }
  } else {
    return <LoadingSpinner />;
  }
}

export default App;
