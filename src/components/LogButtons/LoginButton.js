import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./LogButtons.css";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="log-button"
      style={{ width: "150px", height: "60px" }}
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );
};

export default LoginButton;
