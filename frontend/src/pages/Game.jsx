import ModalDisplay from "@components/Game/ModalDisplay";
import Deck from "@components/Game/Deck";
import React, { useState } from "react";
import "../assets/css/Game.css";

export default function Game() {
  // eslint-disable-next-line no-unused-vars
  const [deckJeu, setDeckJeu] = useState([]);
  const [lvlGame, setLvlGame] = useState(0);

  return (
    <div>
      {lvlGame === 0 && (
        <ModalDisplay setDeckJeu={setDeckJeu} setLvlGame={setLvlGame} />
      )}
      {lvlGame > 0 && <Deck champions={deckJeu} startPlayerTurn={false} />}
    </div>
  );
}
