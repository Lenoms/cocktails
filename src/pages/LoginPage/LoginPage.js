import React, { useEffect } from "react";
import LoginButton from "../../components/LogButtons/LoginButton";
import LogoutButton from "../../components/LogButtons/LogoutButton";
import "./LoginPage.css";
import { useAuth0, useUser } from "@auth0/auth0-react";

function LoginPage({ loginTried }) {
  return (
    <div className="login-page-container">
      <img
        className="login-page-cocktail-image"
        src={process.env.PUBLIC_URL + "/cocktail-login-screen.png"}
      ></img>
      {!loginTried && <LoginButton />}
      {loginTried && (
        <div className="logout-box">
          <LogoutButton size={["150px", "60px"]} />
          <p style={{ color: "red" }}>Your account is not authorised!</p>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
