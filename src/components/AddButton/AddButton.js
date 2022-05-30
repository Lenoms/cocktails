import React from "react";
import "./AddButton.css";
import AddIcon from "@mui/icons-material/Add";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
  },
});

function AddButton() {
  const navigate = useNavigate();

  return (
    <div className="button-container">
      <ThemeProvider theme={theme}>
        <button
          onClick={() => navigate("/cocktails/create")}
          className="add-button"
        >
          <AddIcon fontSize="large" color="primary" />
        </button>
      </ThemeProvider>
    </div>
  );
}

export default AddButton;
