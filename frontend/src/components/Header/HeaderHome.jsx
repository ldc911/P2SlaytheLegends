import React from "react";
import { matchPath, useLocation } from "react-router-dom";
import "../../assets/css/Header/Header.css";
import Navbar from "../Navbar/Navbar";
import logoHeader from "../../assets/img/Header/logoLolHeader.png";
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
