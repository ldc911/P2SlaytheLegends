import React from "react";
import "@assets/css/Header/Header.css";
import logoHeader from "@assets/img/Header/logoLolHeader.png";

export default function HeaderHome() {
  return (
    <header className="headerHome darkMode">
      <img className="headerLogo" src={logoHeader} alt="logo Lol" />
    </header>
  );
}
