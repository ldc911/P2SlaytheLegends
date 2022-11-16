import { useState } from "react";
import "../../assets/css/Game/ModalDraft.css";
import ModalDraft from "./ModalDraft";
import ModalStart from "./ModalStart";

export default function ModalDisplay(setDeckJeu, setLvlGame) {
  const [startGame, setStartGame] = useState(0);
  return (
    <div className="Modale-wrapper">
      {!startGame ? (
        <ModalStart setStartGame={setStartGame} />
      ) : (
        <ModalDraft
          setDeckJeu={setDeckJeu}
          setLvlGame={setLvlGame}
          setStartGame={setStartGame}
        />
      )}
    </div>
  );
}
