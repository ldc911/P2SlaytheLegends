import Deck from "@components/Game/Deck";
import ModalDisplay from "@components/Game/ModalDisplay";
import Deck from "@components/Game/Deck";
import React, { useState } from "react";
import "../assets/css/Game.css";

export default function Game() {
  const [deckJeu, setDeckJeu] = useState([]);
  const [lvlGame, setLvlGame] = useState(0);
  const [playerStats, setPlayerStats] = useState({
    currentLife: 100,
    maxLife: 100,
    currentEnergy: 3,
    maxEnergy: 3,
    tempBuff: { block: 0, avoidAttack: 0 },
    fullCombatBuff: { attackBuff: 0, blockBuff: 0 },
    fullGameBuff: { magicBuff: 0, physBuff: 0, defenseBuff: 0, poisonBuff: 0 },
    debuff: { vulnerable: 0, weak: 0, poison: 0, distribDown: 0 },
    drawCard: 0,
    startDistrib: 5,
  });
  const [enemyStats, setEnemyStats] = useState({
    currentLife: 1000,
    maxLife: 1000,
    resistPhys: 0,
    resistMag: 0,
    tempBuff: { block: 0, avoidAttack: 0 },
    fullCombatBuff: { attackBuff: 0, blockBuff: 0 },
    debuff: { vulnerable: 0, weak: 0, poison: 0 },
  });

  return (
    <div>
      {lvlGame === 0 && (
        <ModalDisplay setDeckJeu={setDeckJeu} setLvlGame={setLvlGame} />
      )}
    </div>
  );
}
