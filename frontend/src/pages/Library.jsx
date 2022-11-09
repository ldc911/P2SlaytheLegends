/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from "react";
import "../assets/css/Library.css";
import searchIcon from "../assets/img/search_icon.svg";
import CardLib from "../components/Library/CardLib";
import api from "../services/api";
import ModalLib from "../components/Library/ModalLib";

export default function Library() {
  const [champClass, setChampClass] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [champMana, setChampMana] = useState("");
  const [classMenuHover, setClassMenuHover] = useState(false);
  const [manaMenuHover, setManaMenuHover] = useState(false);
  const [isUpTo800px, setIsUpTo800px] = useState(false);
  const [champions, setChampions] = useState([]);
  const [isMounting, setIsMounting] = useState(true);
  const [filteredChamp, setFilteredChamp] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalChamp, setModalChamp] = useState("ok");

  // on vérifie la taille de l'écran pour changer l'affichage du menu
  useEffect(() => {
    const handleResize = () => {
      // eslint-disable-next-line no-unused-expressions
      window.innerWidth > 800 ? setIsUpTo800px(true) : setIsUpTo800px(false);
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
    <div className="libWrapper">
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
            <button
              type="button"
              onClick={() => setClassMenuHover(!classMenuHover)}
            >
              {!champClass ? "CLASSES" : champClass}
            </button>
          </div>
          <div
            className={isUpTo800px ? "Filter-list-widescreen" : isClassHover()}
          >
            <button
              type="button"
              onClick={() => setChampClass("")}
              className={!champClass ? "Filter-selected" : "not-selected"}
            >
              TOUTES
            </button>
            <button
              type="button"
              onClick={() => setChampClass("Assassin")}
              className={
                champClass === "Assassin" ? "Filter-selected" : "not-selected"
              }
            >
              ASSASSIN
            </button>
            <button
              type="button"
              onClick={() => setChampClass("Mage")}
              className={
                champClass === "Mage" ? "Filter-selected" : "not-selected"
              }
            >
              MAGE
            </button>
            <button
              type="button"
              onClick={() => setChampClass("Fighter")}
              className={
                champClass === "Fighter" ? "Filter-selected" : "not-selected"
              }
            >
              COMBATTANT
            </button>
            <button
              type="button"
              onClick={() => setChampClass("Marksman")}
              className={
                champClass === "Marksman" ? "Filter-selected" : "not-selected"
              }
            >
              TIREUR
            </button>
            <button
              type="button"
              onClick={() => setChampClass("Support")}
              className={
                champClass === "Support" ? "Filter-selected" : "not-selected"
              }
            >
              SUPPORT
            </button>
            <button
              type="button"
              onClick={() => setChampClass("Tank")}
              className={
                champClass === "Tank" ? "Filter-selected" : "not-selected"
              }
            >
              TANK
            </button>
          </div>
        </div>
        {/* menu déroulant niveau */}
        <div>
          <div className="Filter-head">
            <button
              type="button"
              onClick={() => setManaMenuHover(!manaMenuHover)}
            >
              {!champMana ? "MANA" : champMana}
            </button>
          </div>
          <div
            className={isUpTo800px ? "Filter-list-widescreen" : isManaHover()}
          >
            <button
              type="button"
              onClick={() => setChampMana("")}
              className={!champMana ? "Filter-selected" : "not-selected"}
            >
              TOUT NIVEAU
            </button>
            <button
              type="button"
              onClick={() => setChampMana("0")}
              className={champMana === "0" ? "Filter-selected" : "not-selected"}
            >
              0
            </button>
            <button
              type="button"
              onClick={() => setChampMana("1")}
              className={champMana === "1" ? "Filter-selected" : "not-selected"}
            >
              1
            </button>
            <button
              type="button"
              onClick={() => setChampMana("2")}
              className={champMana === "2" ? "Filter-selected" : "not-selected"}
            >
              2
            </button>
            <button
              type="button"
              onClick={() => setChampMana("3")}
              className={champMana === "3" ? "Filter-selected" : "not-selected"}
            >
              3
            </button>
          </div>
        </div>
      </div>
      {isMounting ? (
        <p>En cours de chargement =P</p>
      ) : (
        <div className="libDisplay">
          {champions &&
            filteredChamp.map((champion) => {
              return (
                <CardLib
                  key={champion[1].id}
                  cardChampion={champion[1]}
                  setModalChamp={setModalChamp}
                  setModalOpen={setModalOpen}
                />
              );
            })}
          {modalOpen && (
            <ModalLib setOpenModal={setModalOpen} modalChamp={modalChamp} />
          )}
        </div>
      )}
    </div>
  );
}
