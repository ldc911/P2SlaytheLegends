import { useState } from "react";
import PropTypes from "prop-types";
import "../../assets/css/Game/ModalDraft.css";
import ModalDraft from "./Modals/ModalDraft";
import ModalStart from "./Modals/ModalStart";
import ModalFirstReward from "./Modals/ModalFirstReward";
import ModalSecondReward from "./Modals/ModaSecondReward";
import ModalWin from "./Modals/ModalWin";

export default function ModalDisplay({ setDeckJeu, setLvlGame, lvlGame }) {
  const [startGame, setStartGame] = useState(0);
  const deckDepart = [];

  return (
    <div className="Modale-wrapper">
      {lvlGame === 0 &&
        (!startGame ? (
          <ModalStart setStartGame={setStartGame} />
        ) : (
          <ModalDraft
            setDeckJeu={setDeckJeu}
            setLvlGame={setLvlGame}
            setStartGame={setStartGame}
            deckDepart={deckDepart}
          />
        ))}
      {lvlGame === 2 && (
        <div className="ModalReward-container">
          <ModalFirstReward setLvlGame={setLvlGame} />
        </div>
      )}
      {lvlGame === 4 && (
        <div className="ModalReward-container">
          <ModalSecondReward />
        </div>
      )}
      {lvlGame === 6 && (
        <div className="ModalReward-container">
          <ModalWin />
        </div>
      )}
    </div>
  );
}

ModalDisplay.propTypes = {
  lvlGame: PropTypes.number,
  setDeckJeu: PropTypes.func,
  setLvlGame: PropTypes.func,
};

ModalDisplay.defaultProps = {
  lvlGame: 0,
  setLvlGame: () => {},
  setDeckJeu: () => {},
};
