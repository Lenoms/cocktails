import React from "react";
import "./Navbar.css";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="nav-bar">
      <div className="nav-buttons">
        <button
          className="nav-button"
          onClick={() => navigate("/cocktails/tried")}
        >
          <CheckCircleIcon style={{ color: "black" }} />
        </button>
        <div style={{ width: "1%" }}></div>
        <button
          className="nav-button"
          onClick={() => navigate("/cocktails/untried")}
        >
          <ListAltIcon style={{ color: "black" }} />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
