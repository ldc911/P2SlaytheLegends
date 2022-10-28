import React from "react";
import "@assets/css/Header/Header.css";
import logoHeader from "@assets/img/Header/logoLolHeader.png";
import ThemeButton from "./ThemeButton";

export default function HeaderHome() {
  return (
    <header className="headerHome ">
      <img className="headerLogo" src={logoHeader} alt="logo Lol" />
      <ThemeButton />
    </header>
  );
}
