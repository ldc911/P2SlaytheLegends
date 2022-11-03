import React, { useState, useEffect } from "react";
import "@assets/css/Navbar/Navbar.css";
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

      if (window.innerWidth > 500) {
        setToggleMenu(false);
      }
    };
    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);
  return (
    <nav className="main-navbar">
      {(toggleMenu || largeur > 500) && (
        <ul className="liste-navbar">
          <li className="items">ACCUEIL</li>
          <li className="items">GAME</li>
          <li className="items">ABOUT RIOT</li>
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
