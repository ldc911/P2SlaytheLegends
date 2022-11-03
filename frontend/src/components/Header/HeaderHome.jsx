import React from "react";
import "@assets/css/Header/Header.css";
import logoHeader from "@assets/img/Header/logoLolHeader.png";
// eslint-disable-next-line import/no-unresolved
import Navbar from "@components/Navbar/Navbar";
import ThemeButton from "./ThemeButton";

export default function HeaderHome() {
  return (
    <header className="headerHome ">
      <img className="headerLogo" src={logoHeader} alt="logo Lol" />
      <Navbar />
      <ThemeButton />
    </header>
  );
}
