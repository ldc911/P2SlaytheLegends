import React from "react";
import "@assets/css/Header/Header.css";
import logoHeader from "@assets/img/Header/logoLolHeader.png";
// eslint-disable-next-line import/no-unresolved
import Navbar from "@components/Navbar/Navbar";
import { matchPath, useLocation } from "react-router-dom";
import ThemeButton from "./ThemeButton";

export default function HeaderHome() {
  const location = useLocation();
  const specAc = matchPath({ path: "/" }, location.pathname);

  return (
    <header className="headerHome ">
      <img className="headerLogo" src={logoHeader} alt="logo Lol" />
      {!specAc && <Navbar />}
      <ThemeButton />
    </header>
  );
}
