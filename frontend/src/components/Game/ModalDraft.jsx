/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CardLib from "../Library/CardLib";
import api from "../../services/api";
import "../../assets/css/Game/ModalDraft.css";

export default function ModalDraft({
  setDeckJeu,
  setLvlGame,
  setStartGame,
  deckDepart,
}) {
  const [champions, setChampions] = useState([]);
  const [isMounting, setIsMounting] = useState(true);
  const [turnOver, setTurnOver] = useState(false);
  const [propositions, setPropositions] = useState([]);
  const [cardSelected, setCardSelected] = useState({});
  const [champArray, setChampArray] = useState([]);
  const [idSelectedCard, setIdSelectedCard] = useState("");

  // appel Service API
  useEffect(() => {
    api.getChampions().then((json) => {
      setChampions(json.data);
      setIsMounting(false);
    });
  }, []);

  // conversion de champion en array
  useEffect(() => {
    if (champions.length !== 0) {
      const tempArr = Object.entries(champions);
      setChampArray([...tempArr]);
    }
  }, [champions]);

  // shuffle de champions
  useEffect(() => {
    if (champArray.length !== 0) {
      let currentIndex = champArray.length;
      let randomIndex;
      // While there remain elements to shuffle.
      while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [champArray[currentIndex], champArray[randomIndex]] = [
          champArray[randomIndex],
          champArray[currentIndex],
        ];
      }
    }
  }, [champArray]);

  // préparation des trois cartes à présenter pour le choix
  useEffect(() => {
    if (champArray.length !== 0) {
      const myArr = [];
      for (let i = 0; i < 3; i++) {
        myArr.push(champArray[0]);
        champArray.splice(0, 1); // retrait de la carte présentée de la liste des possibles
      }
      setPropositions(myArr);
    }
  }, [turnOver, champArray]);

  // fonction de check d'objet vide
  const emptyCheck = (objet) => {
    return Object.keys(objet).length !== 0;
  };

  const buttonClick = () => {
    if (emptyCheck(cardSelected) && deckDepart.length < 12) {
      deckDepart.push(cardSelected);
      setTurnOver(!turnOver);
      setPropositions([]);
      setCardSelected({});
    }
  };

  // remontée des states
  const validateDeck = () => {
    setDeckJeu(deckDepart);
    setLvlGame(1);
  };

  return (
    <div className="Modale-choice">
      <button
        type="button"
        className="Modale-close"
        onClick={() => setStartGame(0)}
      >
        X
      </button>
      <div className="Card-display">
        {propositions.map((champion) => {
          return (
            <CardLib
              key={champion[1].id}
              cardChampion={champion[1]}
              setCardSelected={setCardSelected}
              setIdSelectedCard={setIdSelectedCard}
              idSelectedCard={idSelectedCard}
            />
          );
        })}
      </div>
      {deckDepart.length < 12 ? (
        <div className="Modale-validation">
          <button
            className="Modale-validate"
            type="button"
            onClick={buttonClick}
          >
            valider
          </button>
          <span className="Modale-compteur">{deckDepart.length}/12</span>
        </div>
      ) : (
        <button
          className="Modale-validate"
          type="button"
          onClick={validateDeck}
        >
          Valider votre deck
        </button>
      )}
      <div className="Modale-deckContainer">
        Votre deck : <br />
        {deckDepart.length >= 1 &&
          deckDepart.map((item) => {
            return (
              <>
                <img
                  className="Modale-deck"
                  key={item.champion.id}
                  src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${item.champion.id}.png`}
                  alt="champ img"
                />{" "}
              </>
            );
          })}
      </div>
    </div>
  );
}
ModalDraft.propTypes = {
  setDeckJeu: PropTypes.func,
  setLvlGame: PropTypes.func,
  setStartGame: PropTypes.func,
  deckDepart: PropTypes.arrayOf,
};

ModalDraft.defaultProps = {
  setStartGame: () => {},
  setLvlGame: () => {},
  setDeckJeu: () => {},
  deckDepart: [],
};
