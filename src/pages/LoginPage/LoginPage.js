import React, { useState } from "react";
import LoginButton from "../../components/LogButtons/LoginButton";
import LogoutButton from "../../components/LogButtons/LogoutButton";
import "./LoginPage.css";
import { motion } from "framer-motion";

function LoginPage({ loginTried }) {
  const [triggerBounce, setTriggerBounce] = useState(true);
  const handleClick = () => {
    setTriggerBounce(!triggerBounce);
  };

  const variants = {
    bounce: {
      y: [0, -30, 0],
    },
    bounce2: {
      y: [0, -30, 0],
    },
  };
  return (
    <div className="login-page-container">
      <motion.div
        className="login-page-image-container"
        variants={variants}
        transition={{ type: "spring" }}
        animate={triggerBounce ? "bounce" : "bounce2"}
      >
        <img
          className="login-page-cocktail-image"
          src={process.env.PUBLIC_URL + "/cocktail-login-screen.png"}
          onClick={handleClick}
        ></img>
      </motion.div>
      {!loginTried && <LoginButton handleClick={handleClick} />}
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
