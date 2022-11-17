import { useState } from "react";
import PropTypes from "prop-types";
import "../../assets/css/Game/ModalDraft.css";
import ModalDraft from "./ModalDraft";
import ModalStart from "./ModalStart";

export default function ModalDisplay({ setDeckJeu, setLvlGame }) {
  const [startGame, setStartGame] = useState(0);
  const deckDepart = [];

  return (
    <div className="Modale-wrapper">
      {!startGame ? (
        <ModalStart setStartGame={setStartGame} />
      ) : (
        <ModalDraft
          setDeckJeu={setDeckJeu}
          setLvlGame={setLvlGame}
          setStartGame={setStartGame}
          deckDepart={deckDepart}
        />
      )}
    </div>
  );
}

ModalDisplay.propTypes = {
  setDeckJeu: PropTypes.func,
  setLvlGame: PropTypes.func,
};

ModalDisplay.defaultProps = {
  setLvlGame: () => {},
  setDeckJeu: () => {},
};
