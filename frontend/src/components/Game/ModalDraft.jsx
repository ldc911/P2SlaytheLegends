/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import CardLib from "../Library/CardLib";
import api from "../../services/api";
import "../../assets/css/Game/ModalDraft.css";

const deckDepart = [];

export default function ModalDraft(setDeckJeu, setLvlGame) {
  const [champions, setChampions] = useState([]);
  const [isMounting, setIsMounting] = useState(true);
  const [turnOver, setTurnOver] = useState(false);
  const [propositions, setPropositions] = useState([]);
  const [cardSelected, setCardSelected] = useState(0);
  const [champArray, setChampArray] = useState([]);

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

  const buttonClick = () => {
    if (cardSelected !== 0 && deckDepart.length < 12) {
      deckDepart.push(cardSelected);
      setTurnOver(!turnOver);
      setPropositions([]);
      setCardSelected(0);
    }
  };

  // remontée des states
  const validateDeck = () => {
    setDeckJeu(deckDepart);
    setLvlGame(1);
  };

  // a faire : la fct qui reset selected card si up, a passer en props
  return (
    <div className="Modale-wrapper">
      <div className="Card-display">
        {propositions.map((champion) => {
          return (
            <CardLib
              key={champion[1].id}
              cardChampion={champion[1]}
              setCardSelected={setCardSelected}
            />
          );
        })}
      </div>
      {deckDepart.length < 12 ? (
        <button className="Modale-validate" type="button" onClick={buttonClick}>
          valider
        </button>
      ) : (
        <button
          className="Modale-validate"
          type="button"
          onClick={validateDeck}
        >
          Valider votre deck
        </button>
      )}
    </div>
  );
}
