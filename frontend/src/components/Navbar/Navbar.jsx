import React, { useState, useEffect } from "react";
import "../../assets/css/Navbar/Navbar.css";
import { Link } from "react-router-dom";
import poro from "../../assets/img/Navbar/poro.png";

// Gestion du menu burger avec bouton //
function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [largeur, setLargeur] = useState(window.innerWidth);
  const toggleNavSmallScreen = () => {
    setToggleMenu(!toggleMenu);
  };
  useEffect(() => {
    const changeWidth = () => {
      setLargeur(window.innerWidth);

      if (window.innerWidth > 800) {
        setToggleMenu(false);
      }
    };
    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);
  return (
    <nav className={toggleMenu ? "main-navbar" : "not-selected"}>
      {(toggleMenu || largeur > 800) && (
        <ul className="liste-navbar">
          <li className="items">
            <Link to="/library" onClick={toggleMenu}>
              LIBRARY
            </Link>
          </li>
          <span className="spannav" />
          <li className="items">
            <Link to="/game" onClick={toggleMenu}>
              GAME
            </Link>
          </li>
          <span className="spannav" />

          <li className="items">
            <Link to="/about-riot" onClick={toggleMenu}>
              ABOUT RIOT
            </Link>
          </li>
        </ul>
      )}

      <button onClick={toggleNavSmallScreen} type="submit" className="btn">
        {" "}
        <img src={poro} width="90" height="90" alt="submit" />
      </button>
    </nav>
  );
}

export default Navbar;
