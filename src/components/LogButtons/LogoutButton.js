import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./LogButtons.css";

const LogoutButton = ({ size }) => {
  const { logout } = useAuth0();

  return (
    <button
      className="log-button"
      style={{ width: size[0], height: size[1] }}
      onClick={() =>
        logout({ returnTo: window.location.origin + "/cocktails" })
      }
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
