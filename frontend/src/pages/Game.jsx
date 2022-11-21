import ModalDisplay from "@components/Game/ModalDisplay";
import React, { useState } from "react";
import "../assets/css/Game.css";

export default function Game() {
  // eslint-disable-next-line no-unused-vars
  const [deckJeu, setDeckJeu] = useState([]);
  const [lvlGame, setLvlGame] = useState(2);

  return (
    <div>
      {(lvlGame === 0 || lvlGame === 2 || lvlGame === 4 || lvlGame === 6) && (
        <ModalDisplay
          setDeckJeu={setDeckJeu}
          setLvlGame={setLvlGame}
          lvlGame={lvlGame}
        />
      )}
    </div>
  );
}
