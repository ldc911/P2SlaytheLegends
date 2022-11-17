import ModalDisplay from "@components/Game/ModalDisplay";
import React, { useState } from "react";
import "../assets/css/Game.css";

export default function Game() {
  const [deckJeu, setDeckJeu] = useState([]);
  const [lvlGame, setLvlGame] = useState(0);

  return (
    <div>
      {lvlGame === 0 && (
        <ModalDisplay setDeckJeu={setDeckJeu} setLvlGame={setLvlGame} />
      )}
    </div>
  );
}
