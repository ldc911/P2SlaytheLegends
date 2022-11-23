import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CardLib from "../../Library/CardLib";
import api from "../../../services/api";
import "../../../assets/css/Game/ModalDraft.css";

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
  const [energyStats, setEnergyStats] = useState([0, 0, 0, 0]);

  // fonctions calcul Mana cost et stats cartes------------
  const manaCost = (champ) => {
    // console.log(cardChampion.info.difficulty);
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
  // test function to assign card skill 1 based on the champ class 1
  const skill1 = (champ) => {
    switch (champ.tags[0]) {
      case "Tank":
        return `${(
          7 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
          parseInt(manaCost(champ.info.difficulty), 10)
        ).toString()} Blk`;
      case "Fighter":
        return `${(
          7 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
          parseInt(manaCost(champ.info.difficulty), 10)
        ).toString()} PDam`;
      case "Support":
        return `Heal ${(
          4 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
          parseInt(manaCost(champ.info.difficulty), 10)
        ).toString()}`;
      case "Mage":
        return champ.tags.length === 2
          ? `${(
              7 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
              parseInt(manaCost(champ.info.difficulty), 10)
            ).toString()} MDam`
          : `dam + ${(
              1 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
              parseInt(manaCost(champ.info.difficulty), 10)
            ).toString()}`;
      case "Marksman":
        return `${(
          1 *
          (parseInt(manaCost(champ.info.difficulty), 10) + 1)
        ).toString()} Vul`;
      case "Assassin":
        return champ.tags.length === 2
          ? `${(
              4 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
              parseInt(manaCost(champ.info.difficulty), 10)
            ).toString()} Pois`
          : "Pois*2";
      default:
        return "TBD";
    }
  };

  // test function to assign card skill 2 based on the champ class 2
  const skill2 = (champ) => {
    switch (champ.tags[1]) {
      case "Tank":
        return `${(
          7 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
          parseInt(manaCost(champ.info.difficulty), 10)
        ).toString()} Blk`;
      case "Fighter":
        return `blk + ${(
          1 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
          parseInt(manaCost(champ.info.difficulty), 10)
        ).toString()}`;
      case "Support":
        return `${
          parseInt(manaCost(champ.info.difficulty), 10) < 2 ? "1" : "2"
        } En`;
      case "Mage":
        return `${(
          1 *
          (parseInt(manaCost(champ.info.difficulty), 10) + 1)
        ).toString()} Weak`;
      case "Marksman":
        return "Dodge";
      case "Assassin":
        return `Draw ${
          parseInt(manaCost(champ.info.difficulty), 10) < 2 ? "1" : "2"
        }C`;
      default:
        return "TBD";
    }
  };
  // fin fonctions calcul Mana cost et stats cartes-----------

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
        currentIndex -= 1;

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
      for (let i = 0; i < 3; i += 1) {
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
      const energyStatsCopy = energyStats;
      energyStatsCopy[
        parseInt(manaCost(cardSelected.champion.info.difficulty), 10)
      ] += 1;
      setEnergyStats(energyStatsCopy);
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
      {isMounting && <p>En Chargement...</p>}
      <div className="energy-Stats">
        <div className="energy-Stats-Container">
          <div className="energy-Bars-Container">
            <div
              className="energy-Bar"
              style={{ height: `${energyStats[0] * 8}%`, left: `4%` }}
            />
            <div
              className="energy-Bar"
              style={{ height: `${energyStats[1] * 8}%`, left: `28%` }}
            />
            <div
              className="energy-Bar"
              style={{ height: `${energyStats[2] * 8}%`, left: `53%` }}
            />
            <div
              className="energy-Bar"
              style={{ height: `${energyStats[3] * 8}%`, left: `77%` }}
            />
          </div>
          <div className="energy-Stats-Numbers">
            <div className="energy-Stats-Numbers-text">
              <p>0</p>
            </div>
            <div className="energy-Stats-Numbers-text">
              <p>1</p>
            </div>
            <div className="energy-Stats-Numbers-text">
              <p>2</p>
            </div>
            <div className="energy-Stats-Numbers-text">
              <p>3</p>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="Modale-close"
        onClick={() => setStartGame(0)}
      >
        X
      </button>
      <div className="Card-display">
        {deckDepart.length < 12 ? (
          propositions.map((champion) => {
            return (
              <CardLib
                key={champion[1].id}
                cardChampion={champion[1]}
                setCardSelected={setCardSelected}
                setIdSelectedCard={setIdSelectedCard}
                idSelectedCard={idSelectedCard}
              />
            );
          })
        ) : (
          <div className="Deck-Complete">
            <h1>PREPAREZ-VOUS</h1>
            <h1>LE PREMIER ADVERSAIRE VOUS ATTEND</h1>
          </div>
        )}
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
          Valider le deck
        </button>
      )}
      <div className="Modale-deckContainer">
        Votre deck : <br />
        <div className="stats-deck">
          {deckDepart.length >= 1 &&
            deckDepart.map((item) => {
              return (
                <div
                  style={{
                    display: `flex`,
                    flexDirection: `column`,
                    width: `7vw`,
                    position: `relative`,
                  }}
                >
                  <img
                    className="Modale-deck"
                    key={item.champion.id}
                    src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${item.champion.id}.png`}
                    alt="champ img"
                  />{" "}
                  <p className="mana-text">
                    {manaCost(item.champion.info.difficulty)}
                  </p>
                  <p className="skill-text">{skill1(item.champion)}</p>
                  <p className="skill-text">
                    {item.champion.tags[1] ? skill2(item.champion) : null}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
ModalDraft.propTypes = {
  setDeckJeu: PropTypes.func,
  setLvlGame: PropTypes.func,
  setStartGame: PropTypes.func,
  deckDepart: PropTypes.arrayOf(PropTypes.shape),
};

ModalDraft.defaultProps = {
  setStartGame: () => {},
  setLvlGame: () => {},
  setDeckJeu: () => {},
  deckDepart: [],
};
