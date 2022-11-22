/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import ModalDisplay from "../components/Game/ModalDisplay";
import Deck from "../components/Game/Deck";
import Board from "../components/Game/Board";
import "../assets/css/Game.css";

export default function Game() {
  // eslint-disable-next-line no-unused-vars
  const [render, setRender] = useState(false);
  const [deckJeu, setDeckJeu] = useState([]);
  const [lvlGame, setLvlGame] = useState(0);
  const [startPlayerTurn, setStartPlayerTurn] = useState(true);
  const [endPlayerTurn, setEndPlayerTurn] = useState(false);
  const [enemyActionsResolution, setEnemyActionsResolution] = useState(false);
  const [fightTurns, setFightTurns] = useState(1);
  const [totalTurns, setTotalTurns] = useState(1);
  const [playerLifeChange, setPlayerLifeChange] = useState(0);
  const [enemyLifeChange, setEnemyLifeChange] = useState(0);
  // Objet représentant le joueur
  const [playerStats, setPlayerStats] = useState({
    currentLife: 100,
    maxLife: 100,
    currentEnergy: 3,
    maxEnergy: 3,
    tempBuff: { block: 0, avoidAttack: 0 },
    fullCombatBuff: { attackBuff: 0, blockBuff: 0 },
    fullGameBuff: {
      magicBuff: 0,
      physBuff: 0,
      defenseBuff: 0,
      poisonBuff: 0,
      healBuff: 0,
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
    resistPoison: 0,
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
    leech: false,
    displayedActions: `15 Damages`,
  });
  // ${toString(15 + enemyStats.fullCombatBuff.attackBuff)}
  // Objet représentant la liste des actions possible de l'ennemi pendant le combat
  const [indexActionList, setIndexActionList] = useState(1);
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
      leech: false,
      displayedActions: `15 Damage`,
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
      leech: false,
      displayedActions: `15 Block`,
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
      leech: false,
      displayedActions: `10 Damage / 10 Block`,
    },
    {
      attack: 10,
      poison: 0,
      block: 0,
      avoidAttack: 0,
      vulne: 0,
      weak: 2,
      attackBuff: 0,
      blockBuff: 0,
      drawDebuff: 0,
      leech: false,
      displayedActions: `10 Damage / 2 Weak`,
    },
    {
      attack: 20,
      poison: 0,
      block: 0,
      avoidAttack: 0,
      vulne: 0,
      weak: 0,
      attackBuff: 0,
      blockBuff: 0,
      drawDebuff: 0,
      leech: false,
      displayedActions: `20 Damages`,
    },
  ]);
  // objet représentant les stats de départ de l'ennemi 2
  const enemyLvl3 = {
    currentLife: 200,
    maxLife: 200,
    resistPhys: 5,
    resistMag: 0,
    resistPoison: 0,
    tempBuff: { block: 0, avoidAttack: 0 },
    fullCombatBuff: { attackBuff: 0, blockBuff: 0 },
    debuff: { vulnerable: 0, weak: 0, poison: 0 },
  };
  // objet représentant les stats de départ de l'ennemi 3
  const enemyLvl5 = {
    currentLife: 300,
    maxLife: 300,
    resistPhys: 10,
    resistMag: 10,
    resistPoison: 5,
    tempBuff: { block: 0, avoidAttack: 0 },
    fullCombatBuff: { attackBuff: 0, blockBuff: 0 },
    debuff: { vulnerable: 0, weak: 0, poison: 0 },
  };
  // objet représentant les actions possibles de l'ennemi 2
  const actionEnemyLvl3 = [
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
        leech: false,
        displayedActions: `15 Damages`,
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
        leech: false,
        displayedActions: `15 Damages`,
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
        leech: false,
        displayedActions: `15 Damages`,
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
        leech: false,
        displayedActions: `15 Damages`,
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
        leech: false,
        displayedActions: `15 Damages`,
      },
    ],
  ];
  // objet représentant les actions possibles de l'ennemi 3
  const actionEnemyLvl5 = [
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
        leech: false,
        displayedActions: `15 Damages`,
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
        leech: false,
        displayedActions: `15 Damages`,
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
        leech: false,
        displayedActions: `15 Damages`,
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
        leech: false,
        displayedActions: `15 Damages`,
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
        leech: false,
        displayedActions: `15 Damages`,
      },
    ],
  ];
  // fonctions--------------------------------------------------
  const startPlayerTurnActionsForPlayer = (player) => {
    const playerCopy = player;
    playerCopy.currentEnergy = playerCopy.maxEnergy;
    playerCopy.tempBuff.block = 0;
    playerCopy.currentLife -= playerCopy.debuff.poison;
    return playerCopy;
  };
  const startPlayerTurnActionsForEnemy = (enemy) => {
    const enemyCopy = enemy;
    if (enemyCopy.debuff.vulnerable > 0) {
      enemyCopy.debuff.vulnerable -= 1;
    }
    if (enemyCopy.debuff.weak > 0) {
      enemyCopy.debuff.weak -= 1;
    }
    if (enemyCopy.debuff.poison > 0) {
      enemyCopy.debuff.poison -= 1;
    }
    return enemyCopy;
  };
  const endPlayerTurnActionsForEnemy = (enemy) => {
    const enemyCopy = enemy;
    enemyCopy.tempBuff.block = 0;
    enemyCopy.currentLife -=
      enemyCopy.debuff.poison > enemyCopy.resistPoison
        ? enemyCopy.debuff.poison - enemyCopy.resistPoison
        : 0;
    if (lvlGame === 3 && fightTurns % 3 === 0) {
      enemyCopy.fullCombatBuff.attackBuff += 1;
    }
    if (lvlGame === 5 && fightTurns % 3 === 0) {
      enemyCopy.fullCombatBuff.attackBuff += 2;
      enemyCopy.resistMag += 2;
      enemyCopy.resistPhys += 2;
      enemyCopy.resistPoison += 2;
    }
    return enemyCopy;
  };
  const endPlayerTurnActionsForPlayer = (player) => {
    const playerCopy = player;
    if (playerCopy.debuff.vulnerable > 0) {
      playerCopy.debuff.vulnerable -= 1;
    }
    if (playerCopy.debuff.weak > 0) {
      playerCopy.debuff.weak -= 1;
    }
    if (playerCopy.debuff.poison > 0) {
      playerCopy.debuff.poison -= 1;
    }
    if (playerCopy.debuff.distribDown > 0) {
      playerCopy.debuff.distribDown -= 1;
    }
    return playerCopy;
  };
  // fin des fonctions-----------------------------------------
  // tour du joueur
  useEffect(() => {
    if (startPlayerTurn) {
      const playerStatsCopy = playerStats;
      const enemyStatsCopy = enemyStats;
      const enemyActionsCopy = enemyActionList[indexActionList];
      if (indexActionList < 4) {
        setIndexActionList((prev) => prev + 1);
      } else setIndexActionList(0);
      setEnemyActions(enemyActionsCopy);
      setPlayerStats(startPlayerTurnActionsForPlayer(playerStatsCopy));
      setEnemyStats(startPlayerTurnActionsForEnemy(enemyStatsCopy));
      setStartPlayerTurn(false);
    }
  }, [startPlayerTurn]);
  // tour de l'ennemi
  // actions de début de tour enemy
  useEffect(() => {
    if (endPlayerTurn) {
      const playerStatsCopy = playerStats;
      const enemyStatsCopy = enemyStats;
      setPlayerStats(endPlayerTurnActionsForPlayer(playerStatsCopy));
      setEnemyStats(endPlayerTurnActionsForEnemy(enemyStatsCopy));
      setEndPlayerTurn(false);
      setEnemyActionsResolution(true);
    }
  }, [endPlayerTurn]);

  // actions de enemy
  useEffect(() => {
    if (enemyActionsResolution) {
      const playerCopy = playerStats;
      const enemyCopy = enemyStats;
      /* Attack action */
      if (enemyActions.attack > 0) {
        if (playerCopy.tempBuff.avoidAttack === 0) {
          let damage = Math.round(
            (enemyActions.attack + enemyCopy.fullCombatBuff.attackBuff) *
              (playerCopy.debuff.vulnerable > 0 ? 1.25 : 1) *
              (enemyCopy.debuff.weak > 0 ? 0.5 : 1)
          );
          if (playerCopy.tempBuff.block > 0) {
            if (damage > playerCopy.tempBuff.block) {
              damage -= playerCopy.tempBuff.block;
              playerCopy.tempBuff.block = 0;
              playerCopy.currentLife -= damage;
              if (enemyActions.leech) {
                enemyCopy.currentLife += damage;
                if (enemyCopy.currentLife > enemyCopy.maxLife) {
                  enemyCopy.currentLife = enemyCopy.maxLife;
                }
              }
            } else {
              playerCopy.tempBuff.block -= damage;
            }
          } else {
            playerCopy.currentLife -= damage;
            if (enemyActions.leech) {
              enemyCopy.currentLife += damage;
              if (enemyCopy.currentLife > enemyCopy.maxLife) {
                enemyCopy.currentLife = enemyCopy.maxLife;
              }
            }
          }
        } else playerCopy.tempBuff.avoidAttack -= 1;
      }
      /* block action */
      if (enemyActions.block > 0) {
        enemyCopy.tempBuff.block +=
          enemyActions.block + enemyCopy.fullCombatBuff.blockBuff;
      }
      /* poison action */
      if (enemyActions.poison > 0) {
        playerCopy.debuff.poison += enemyActions.poison;
      }
      /* dodge action */
      if (enemyActions.dodge > 0) {
        enemyCopy.tempBuff.avoidAttack += enemyActions.dodge;
      }
      /* vulnerability action */
      if (enemyActions.vulnerability > 0) {
        playerCopy.debuff.vulnerable += enemyActions.vulnerability;
      }
      /* weak action */
      if (enemyActions.weak > 0) {
        playerCopy.debuff.weak += enemyActions.weak;
      }

      setPlayerStats(playerCopy);
      setEnemyStats(enemyCopy);
      setFightTurns((prev) => prev + 1);
      setTotalTurns((prev) => prev + 1);
      setEnemyActionsResolution(false);
      setStartPlayerTurn(true);
    }
  }, [enemyActionsResolution]);

  // victoire et level up
  useEffect(() => {
    if (enemyStats.currentLife < 1) {
      setLvlGame((prev) => prev + 1);
    }
  }, [enemyStats.currentLife]);
  // Game Over
  useEffect(() => {
    if (playerStats.currentLife < 1) {
      setLvlGame(7);
    }
  }, [playerStats.currentLife]);
  // affichage changement de vie pour le joueur et l'ennemi

  // console.log(render);
  return (
    <div className="landscape">
      {lvlGame === 0 && (
        <ModalDisplay setDeckJeu={setDeckJeu} setLvlGame={setLvlGame} />
      )}
      {(lvlGame === 1 || lvlGame === 3 || lvlGame === 5) && deckJeu && (
        <>
          <Board
            playerStats={playerStats}
            enemyStats={enemyStats}
            enemyActions={enemyActions}
            setEndPlayerTurn={setEndPlayerTurn}
            fightTurns={fightTurns}
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
      {lvlGame === 2 && <div>Victoire le boss est vaincu !!!</div>}
      {lvlGame === 7 && <div>Game Over !!!</div>}
    </div>
  );
}
