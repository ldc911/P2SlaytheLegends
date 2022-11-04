/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from "react";
import "../assets/css/Library.css";
import searchIcon from "../assets/img/search_icon.svg";

export default function Library() {
  const [champClass, setChampClass] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [champMana, setChampMana] = useState("");
  const [classMenuHover, setClassMenuHover] = useState(false);
  const [manaMenuHover, setManaMenuHover] = useState(false);
  const [isUpTo1024px, setIsUpTo1024px] = useState(false);

  // on vérifie la taille de l'écran pour changer l'affichage du menu
  useEffect(() => {
    const handleResize = () => {
      // eslint-disable-next-line no-unused-expressions
      window.innerWidth > 1024 ? setIsUpTo1024px(true) : setIsUpTo1024px(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isClassHover = () => {
    return classMenuHover ? "Filter-list" : "Filter-list-none";
  };

  const isManaHover = () => {
    return manaMenuHover ? "Filter-list" : "Filter-list-none";
  };

  return (
    // champ de recherche
    <div className="Library-filterbar">
      <div className="Search-menu">
        <img src={searchIcon} className="Search-icon" alt="search logo" />
        <input
          type="text"
          id="search"
          name="search"
          value={userSearch}
          onChange={(event) => setUserSearch(event.target.value)}
        />
      </div>
      {/* menu déroulant classes */}
      <div>
        <div className="Filter-head">
          <span onClick={() => setClassMenuHover(!classMenuHover)}>
            {!champClass ? "CLASSES" : champClass}
          </span>
        </div>
        <ul className={isUpTo1024px ? "Filter-list-flat" : isClassHover()}>
          <li>
            <span onClick={() => setChampClass("")}>TOUTES</span>
          </li>
          <li>
            <span onClick={() => setChampClass("assassin")}>ASSASSIN</span>
          </li>
          <li>
            <span onClick={() => setChampClass("mage")}>MAGE</span>
          </li>
          <li>
            <span onClick={() => setChampClass("combattant")}>COMBATTANT</span>
          </li>
          <li>
            <span onClick={() => setChampClass("tireur")}>TIREUR</span>
          </li>
          <li>
            <span onClick={() => setChampClass("support")}>SUPPORT</span>
          </li>
          <li>
            <span onClick={() => setChampClass("tank")}>TANK</span>
          </li>
        </ul>
      </div>
      {/* menu déroulant niveau */}
      <div>
        <div className="Filter-head">
          <span onClick={() => setManaMenuHover(!manaMenuHover)}>
            {!champMana ? "MANA" : champMana}
          </span>
        </div>
        <ul className={isUpTo1024px ? "Filter-list-flat" : isManaHover()}>
          <li>
            <span onClick={() => setChampMana("")}>TOUT NIVEAU</span>
          </li>
          <li>
            <span onClick={() => setChampMana("0")}>0</span>
          </li>
          <li>
            <span onClick={() => setChampMana("1")}>1</span>
          </li>
          <li>
            <span onClick={() => setChampMana("2")}>2</span>
          </li>
          <li>
            <span onClick={() => setChampMana("3")}>3</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
