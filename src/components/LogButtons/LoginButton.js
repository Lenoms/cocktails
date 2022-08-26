import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./LogButtons.css";

const LoginButton = ({ handleClick }) => {
  const { loginWithRedirect } = useAuth0();

  const login = () => {
    loginWithRedirect();
    handleClick();
  };

  return (
    <button
      className="log-button"
      style={{ width: "150px", height: "60px" }}
      onClick={login}
    >
      Log In
    </button>
  );
};

export default LoginButton;
