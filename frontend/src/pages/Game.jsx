/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ModalDisplay from "../components/Game/ModalDisplay";
import Deck from "../components/Game/Deck";
import Board from "../components/Game/Board";
import "../assets/css/Game.css";

export default function Game() {
  // eslint-disable-next-line no-unused-vars
  const [render, setRender] = useState(false);
  const [deckJeu, setDeckJeu] = useState([]);
  const [lvlGame, setLvlGame] = useState(0);
  const [startPlayerTurn, setStartPlayerTurn] = useState(false);
  // Objet représentant le joueur
  const [playerStats, setPlayerStats] = useState({
    currentLife: 100,
    maxLife: 100,
    currentEnergy: 3,
    maxEnergy: 3,
    tempBuff: { block: 0, avoidAttack: 0 },
    fullCombatBuff: { attackBuff: 0, blockBuff: 0 },
    fullGameBuff: {
      magicBuff: 1,
      physBuff: 1,
      defenseBuff: 1,
      poisonBuff: 1,
      healBuff: 1,
    },
    debuff: { vulnerable: 0, weak: 0, poison: 0, distribDown: 0 },
    drawCard: 0,
    startDistrib: 5,
  });
  // Objet représentant l'ennemi combattu
  const [enemyStats, setEnemyStats] = useState({
    currentLife: 150,
    maxLife: 150,
    resistPhys: 0,
    resistMag: 0,
    tempBuff: { block: 0, avoidAttack: 0 },
    fullCombatBuff: { attackBuff: 0, blockBuff: 0 },
    debuff: { vulnerable: 0, weak: 0, poison: 0 },
  });
  // Objet représentant les actions effectuées par l'ennemi pendant son tour
  const [enemyActions, setEnemyActions] = useState({
    attack: 15,
    poison: 0,
    block: 0,
    avoidAttack: 0,
    vulne: 0,
    weak: 0,
    attackBuff: 0,
    blockBuff: 0,
    drawDebuff: 0,
  });

  const [enemyActionList, setEnemyActionList] = useState([
    {
      attack: 15,
      poison: 0,
      block: 0,
      avoidAttack: 0,
      vulne: 0,
      weak: 0,
      attackBuff: 0,
      blockBuff: 0,
      drawDebuff: 0,
    },
    {
      attack: 0,
      poison: 0,
      block: 15,
      avoidAttack: 0,
      vulne: 0,
      weak: 0,
      attackBuff: 0,
      blockBuff: 0,
      drawDebuff: 0,
    },
    {
      attack: 10,
      poison: 0,
      block: 10,
      avoidAttack: 0,
      vulne: 0,
      weak: 0,
      attackBuff: 0,
      blockBuff: 0,
      drawDebuff: 0,
    },
  ]);

  const enemy2 = {
    currentLife: 200,
    maxLife: 200,
    resistPhys: 5,
    resistMag: 0,
    tempBuff: { block: 0, avoidAttack: 0 },
    fullCombatBuff: { attackBuff: 0, blockBuff: 0 },
    debuff: { vulnerable: 0, weak: 0, poison: 0 },
  };
  const enemy3 = {
    currentLife: 300,
    maxLife: 300,
    resistPhys: 10,
    resistMag: 10,
    tempBuff: { block: 0, avoidAttack: 0 },
    fullCombatBuff: { attackBuff: 0, blockBuff: 0 },
    debuff: { vulnerable: 0, weak: 0, poison: 0 },
  };

  const actionEnemy2 = [
    [
      {
        attack: 15,
        poison: 0,
        block: 0,
        avoidAttack: 0,
        vulne: 0,
        weak: 0,
        attackBuff: 0,
        blockBuff: 0,
        drawDebuff: 0,
      },
      {
        attack: 0,
        poison: 0,
        block: 15,
        avoidAttack: 0,
        vulne: 0,
        weak: 0,
        attackBuff: 0,
        blockBuff: 0,
        drawDebuff: 0,
      },
      {
        attack: 10,
        poison: 0,
        block: 10,
        avoidAttack: 0,
        vulne: 0,
        weak: 0,
        attackBuff: 0,
        blockBuff: 0,
        drawDebuff: 0,
      },
    ],
  ];
  const actionEnemy3 = [
    [
      {
        attack: 15,
        poison: 0,
        block: 0,
        avoidAttack: 0,
        vulne: 0,
        weak: 0,
        attackBuff: 0,
        blockBuff: 0,
        drawDebuff: 0,
      },
      {
        attack: 0,
        poison: 0,
        block: 15,
        avoidAttack: 0,
        vulne: 0,
        weak: 0,
        attackBuff: 0,
        blockBuff: 0,
        drawDebuff: 0,
      },
      {
        attack: 10,
        poison: 0,
        block: 10,
        avoidAttack: 0,
        vulne: 0,
        weak: 0,
        attackBuff: 0,
        blockBuff: 0,
        drawDebuff: 0,
      },
    ],
  ];

  // console.log(render);
  return (
    <div>
      {lvlGame === 0 && (
        <ModalDisplay setDeckJeu={setDeckJeu} setLvlGame={setLvlGame} />
      )}
      {(lvlGame === 1 || lvlGame === 3 || lvlGame === 5) && deckJeu && (
        <>
          <button type="button" onClick={() => setStartPlayerTurn(true)}>
            fin de tour
          </button>
          <button type="button" onClick={() => setRender(!render)}>
            fin de tour
          </button>
          <Board
            playerStats={playerStats}
            enemyStats={enemyStats}
            enemyActions={enemyActions}
          />
          <Deck
            champions={deckJeu}
            startPlayerTurn={startPlayerTurn}
            setStartPlayerTurn={setStartPlayerTurn}
            setEnemyStats={setEnemyStats}
            setPlayerStats={setPlayerStats}
            playerStats={playerStats}
            enemyStats={enemyStats}
            setRender={setRender}
            render={render}
          />
        </>
      )}
    </div>
  );
}
