import React, { useState } from "react";
import "./Footer.css";

function Footer() {
  const [activeFooter, setActiveFooter] = useState(false);

  function toggleFooter() {
    setActiveFooter(!activeFooter);
  }
  return (
    <div
      className={
        activeFooter
          ? "footer-showing footer-body"
          : "footer-hiding footer-body"
      }
    >
      <button onClick={toggleFooter}>X</button>
      {activeFooter ? <div>Sort Button!</div> : ""}
    </div>
  );
}

export default Footer;
