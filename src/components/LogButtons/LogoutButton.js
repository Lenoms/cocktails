import React from "react";
//import { useAuth0 } from "@auth0/auth0-react";
import "./LogButtons.css";
import LogoutIcon from "@mui/icons-material/Logout";

const LogoutButton = ({ size }) => {
  //const { logout } = useAuth0();

  return (
    <button
      className="log-button"
      style={{ width: size[0], height: size[1] }}
      // onClick={() =>
      //   logout({ returnTo: window.location.origin + "/cocktails" })
      // }
    >
      <LogoutIcon style={{ color: "white" }} />
    </button>
  );
};

export default LogoutButton;
