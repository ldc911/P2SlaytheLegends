/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from "react";
import "../assets/css/Library.css";
import searchIcon from "../assets/img/search_icon.svg";
import Card from "../components/Card";
import api from "../services/api";

export default function Library() {
  const [champClass, setChampClass] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [champMana, setChampMana] = useState("");
  const [classMenuHover, setClassMenuHover] = useState(false);
  const [manaMenuHover, setManaMenuHover] = useState(false);
  const [isUpTo1024px, setIsUpTo1024px] = useState(false);
  const [champions, setChampions] = useState([]);
  const [isMounting, setIsMounting] = useState(true);
  const [filteredChamp, setFilteredChamp] = useState([]);

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

  // appel Service API
  useEffect(() => {
    api.getChampions().then((json) => {
      setChampions(json.data);
      setIsMounting(false);
    });
  }, []);

  // Fonction pour calculer le mana Cost d'une carte
  const manaCost = (champ) => {
    switch (champ) {
      case 0:
      case 1:
      case 2:
      case 3:
        return "0";
      case 4:
      case 5:
      case 6:
        return "1";
      case 7:
      case 8:
        return "2";
      case 9:
      case 10:
        return "3";
      default:
        return "TBD";
    }
  };

  // Fonction pour préparer le filtre
  // eslint-disable-next-line consistent-return
  const filterChamp = (champ) => {
    if (
      (champ[1].tags[0].includes(champClass) ||
        (champ[1].tags.length > 1 && champ[1].tags[1].includes(champClass))) &&
      manaCost(champ[1].info.difficulty).includes(champMana) &&
      champ[1].name.toLowerCase().includes(userSearch)
    ) {
      return true;
    }
  };

  // Fonction qui rempli un array avec les cartes filtrées
  useEffect(() => {
    let filteredChamp1 = Object.entries(champions);
    filteredChamp1 = filteredChamp1.filter((champ) => filterChamp(champ));
    setFilteredChamp([...filteredChamp1]);
  }, [champClass, champMana, userSearch, champions]);

  return (
    <div>
      {/* champ de recherche */}
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
              <span onClick={() => setChampClass("Assassin")}>ASSASSIN</span>
            </li>
            <li>
              <span onClick={() => setChampClass("Mage")}>MAGE</span>
            </li>
            <li>
              <span onClick={() => setChampClass("Fighter")}>COMBATTANT</span>
            </li>
            <li>
              <span onClick={() => setChampClass("Marksman")}>TIREUR</span>
            </li>
            <li>
              <span onClick={() => setChampClass("Support")}>SUPPORT</span>
            </li>
            <li>
              <span onClick={() => setChampClass("Tank")}>TANK</span>
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
      {isMounting ? (
        <p>En cours de chargement =P</p>
      ) : (
        <div className="libDisplay">
          {champions &&
            filteredChamp.map((champion) => {
              return <Card key={champion[1].id} cardChampion={champion[1]} />;
            })}
        </div>
      )}
    </div>
  );
}
