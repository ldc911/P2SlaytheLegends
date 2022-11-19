/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import ModalDisplay from "@components/Game/ModalDisplay";
import React, { useEffect, useState } from "react";
import "../assets/css/Game.css";
import Board from "../components/Game/Board";

export default function Game() {
  // eslint-disable-next-line no-unused-vars
  const [deckJeu, setDeckJeu] = useState([]);
  const [lvlGame, setLvlGame] = useState(-1);

  const [player, setPlayer] = useState({
    currentLife: 100,
    maxLife: 100,
    currentEnergy: 3,
    maxEnergy: 3,
    tempBuff: { block: 10, avoidAttack: 10 },
    fullCombatBuff: { attackBuff: 10, blockBuff: 10 },
    debuff: { vulnerable: 10, weak: 10, poison: 10, distribDown: 10 },
    drawCard: 10,
    startDistrib: 5,
  });

  const [enemy, setEnemy] = useState({
    currentLife: 1000,
    maxLife: 1000,
    resistPhys: 0,
    resistMag: 0,
    tempBuff: { block: 10, avoidAttack: 10 },
    fullCombatBuff: { attackBuff: 10, blockBuff: 10 },
    debuff: { vulnerable: 10, weak: 10, poison: 10 },
  });
  // useEffect(()=> {
  // if (enemy.currentLife > 100000 )

  // },[]);

  return (
    <div>
      <Board player={player} enemy={enemy} />
      {lvlGame === 0 && (
        <ModalDisplay setDeckJeu={setDeckJeu} setLvlGame={setLvlGame} />
      )}
    </div>
  );
}
