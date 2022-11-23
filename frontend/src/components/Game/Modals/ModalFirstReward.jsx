/* eslint-disable no-unused-expressions */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import rewards from "../../../services/rewards";
import CardReward from "./CardReward";
import "../../../assets/css/Game/CardReward.css";

export default function ModalFirstReward({
  setLvlGame,
  setStartPlayerTurn,
  setEndPlayerTurn,
  setEnemyActionsResolution,
  setFightTurns,
  setPlayerLifeChange,
  setEnemyLifeChange,
  playerStats,
  setPlayerStats,
  setEnemyStats,
  setIndexActionList,
  setEnemyActions,
  setEnemyActionList,
  enemyLvl3,
  actionEnemyLvl3,
  setPrevPlayerLife,
  setPrevEnemyLife,
  setItem,
}) {
  const [selected, setSelected] = useState({});
  const [idSelectedCard, setIdSelectedCard] = useState();
  const [isMounted, setIsMounted] = useState(false);

  // shuffle et random du tableau des récompenses
  useEffect(() => {
    let currentIndex = rewards.length;
    let randomIndex;
    // While there remain elements to shuffle.
    // eslint-disable-next-line no-unreachable-loop
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      [rewards[currentIndex], rewards[randomIndex]] = [
        rewards[randomIndex],
        rewards[currentIndex],
      ];
    }
    rewards.splice(3);
    setIsMounted(true);
  }, []);

  const modifyPlayer = (player) => {
    const newPlayerStats = player;
    Object.keys(newPlayerStats).includes(selected.firstBuff)
      ? (newPlayerStats[selected.firstBuff] += selected.value1)
      : (newPlayerStats.fullGameBuff[selected.firstBuff] += selected.value1);
    Object.keys(newPlayerStats).includes(selected.secondBuff)
      ? (newPlayerStats[selected.secondBuff] += selected.value2)
      : (newPlayerStats.fullGameBuff[selected.secondBuff] += selected.value2);
    if (selected.thirdBuff) {
      Object.keys(newPlayerStats).includes(selected.thirdBuff)
        ? (newPlayerStats[selected.thirdBuff] += selected.value3)
        : (newPlayerStats.fullGameBuff[selected.thirdBuff] += selected.value3);
    }
    newPlayerStats.currentEnergy = 3;
    newPlayerStats.tempBuff.block = 0;
    newPlayerStats.tempBuff.avoidAttack = 0;
    newPlayerStats.fullCombatBuff.attackBuff = 0;
    newPlayerStats.fullCombatBuff.blockBuff = 0;
    newPlayerStats.debuff.vulnerable = 0;
    newPlayerStats.debuff.weak = 0;
    newPlayerStats.debuff.poison = 0;
    newPlayerStats.debuff.distribDown = -1;
    newPlayerStats.drawCard = 0;
    return newPlayerStats;
  };

  const validReward = () => {
    setPlayerStats(modifyPlayer(playerStats));
    setItem(selected);
    setIdSelectedCard();
    setStartPlayerTurn(false);
    setEndPlayerTurn(false);
    setEnemyActionsResolution(false);
    setFightTurns(1);
    setPlayerLifeChange(0);
    setEnemyLifeChange(0);
    setEnemyStats(enemyLvl3);
    setIndexActionList(1);
    setEnemyActions(actionEnemyLvl3[0]);
    setEnemyActionList(actionEnemyLvl3);
    setLvlGame(3);
    setPrevPlayerLife(playerStats.currentLife);
    setPrevEnemyLife(enemyLvl3.currentLife);
  };
  return (
    <div className="Modale-reward">
      <h1> Félicitations, vous êtes venu à bout du premier Boss ! </h1>
      <h2>
        Choisissez parmi ces trois récompenses, vous allez en avoir besoin...
      </h2>
      <div className="Card-display">
        {isMounted ? (
          rewards.map((reward) => {
            return (
              <CardReward
                key={reward.id}
                rewards={reward}
                setSelected={setSelected}
                setIdSelectedCard={setIdSelectedCard}
                idSelectedCard={idSelectedCard}
              />
            );
          })
        ) : (
          <p>Loading</p>
        )}
      </div>

      <button
        type="button"
        className="Modale-validate Modale-rewardValidate"
        onClick={validReward}
      >
        Valider la récompense
      </button>
    </div>
  );
}

ModalFirstReward.propTypes = {
  reward: PropTypes.shape({
    id: PropTypes.number,
    pic: PropTypes.string,
    firstBuff: PropTypes.string,
    value1: PropTypes.number,
    secondBuff: PropTypes.string,
    value2: PropTypes.number,
  }),
  playerStats: PropTypes.shape({
    currentLife: PropTypes.number,
    currentEnergy: PropTypes.number,
    tempBuff: PropTypes.shape({
      block: PropTypes.number,
      avoidAttack: PropTypes.number,
    }),
    fullCombatBuff: PropTypes.shape({
      attackBuff: PropTypes.number,
      blockBuff: PropTypes.number,
    }),
    fullGameBuff: PropTypes.shape({
      magicBuff: PropTypes.number,
      physBuff: PropTypes.number,
      defenseBuff: PropTypes.number,
      poisonBuff: PropTypes.number,
      healBuff: PropTypes.number,
    }),
    debuff: PropTypes.shape({
      vulnerable: PropTypes.number,
      weak: PropTypes.number,
      poison: PropTypes.number,
      distribDown: PropTypes.number,
    }),
    drawCard: PropTypes.number,
    startDistrib: PropTypes.number,
  }),
  enemyLvl3: PropTypes.shape({
    currentLife: PropTypes.number,
    maxLife: PropTypes.number,
    resistPhys: PropTypes.number,
    resistMag: PropTypes.number,
    tempBuff: PropTypes.shape({
      block: PropTypes.number,
      avoidAttack: PropTypes.number,
    }),
    fullCombatBuff: PropTypes.shape({
      attackBuff: PropTypes.number,
      blockBuff: PropTypes.number,
    }),
    debuff: PropTypes.shape({
      vulnerable: PropTypes.number,
      weak: PropTypes.number,
      poison: PropTypes.number,
    }),
  }),
  actionEnemyLvl3: PropTypes.arrayOf(
    PropTypes.shape(
      {
        attack: PropTypes.number,
        poison: PropTypes.number,
        block: PropTypes.number,
        avoidAttack: PropTypes.number,
        vulne: PropTypes.number,
        weak: PropTypes.number,
        attackBuff: PropTypes.number,
        blockBuff: PropTypes.number,
        drawDebuff: PropTypes.number,
        leech: PropTypes.bool,
        distribDown: PropTypes.number,
        displayedActions: PropTypes.string,
      },
      {
        attack: PropTypes.number,
        poison: PropTypes.number,
        block: PropTypes.number,
        avoidAttack: PropTypes.number,
        vulne: PropTypes.number,
        weak: PropTypes.number,
        attackBuff: PropTypes.number,
        blockBuff: PropTypes.number,
        drawDebuff: PropTypes.number,
        leech: PropTypes.bool,
        distribDown: PropTypes.number,
        displayedActions: PropTypes.string,
      },
      {
        attack: PropTypes.number,
        poison: PropTypes.number,
        block: PropTypes.number,
        avoidAttack: PropTypes.number,
        vulne: PropTypes.number,
        weak: PropTypes.number,
        attackBuff: PropTypes.number,
        blockBuff: PropTypes.number,
        drawDebuff: PropTypes.number,
        leech: PropTypes.bool,
        distribDown: PropTypes.number,
        displayedActions: PropTypes.string,
      },
      {
        attack: PropTypes.number,
        poison: PropTypes.number,
        block: PropTypes.number,
        avoidAttack: PropTypes.number,
        vulne: PropTypes.number,
        weak: PropTypes.number,
        attackBuff: PropTypes.number,
        blockBuff: PropTypes.number,
        drawDebuff: PropTypes.number,
        leech: PropTypes.bool,
        distribDown: PropTypes.number,
        displayedActions: PropTypes.string,
      },
      {
        attack: PropTypes.number,
        poison: PropTypes.number,
        block: PropTypes.number,
        avoidAttack: PropTypes.number,
        vulne: PropTypes.number,
        weak: PropTypes.number,
        attackBuff: PropTypes.number,
        blockBuff: PropTypes.number,
        drawDebuff: PropTypes.number,
        leech: PropTypes.bool,
        distribDown: PropTypes.number,
        displayedActions: PropTypes.string,
      }
    )
  ),

  setStartPlayerTurn: PropTypes.func,
  setEndPlayerTurn: PropTypes.func,
  setEnemyActionsResolution: PropTypes.func,
  setFightTurns: PropTypes.func,
  setPlayerLifeChange: PropTypes.func,
  setEnemyLifeChange: PropTypes.func,
  setEnemyStats: PropTypes.func,
  setIndexActionList: PropTypes.func,
  setEnemyActions: PropTypes.func,
  setEnemyActionList: PropTypes.func,
  setLvlGame: PropTypes.func,
  setPlayerStats: PropTypes.func,
  setPrevPlayerLife: PropTypes.func,
  setPrevEnemyLife: PropTypes.func,
  setItem: PropTypes.func,
};
ModalFirstReward.defaultProps = {
  reward: {
    id: 0,
    pic: "",
    firstBuff: "",
    value1: 0,
    secondBuff: "",
    value2: 0,
  },
  playerStats: {
    currentLife: 0,
    currentEnergy: 0,
    tempBuff: {
      block: 0,
      avoidAttack: 0,
    },
    fullCombatBuff: {
      attackBuff: 0,
      blockBuff: 0,
    },
    fullGameBuff: {
      magicBuff: 0,
      physBuff: 0,
      defenseBuff: 0,
      poisonBuff: 0,
      healBuff: 0,
    },
    debuff: {
      vulnerable: 0,
      weak: 0,
      poison: 0,
      distribDown: -1,
    },
    drawCard: 0,
    startDistrib: 0,
  },
  enemyLvl3: {
    currentLife: 1000,
    maxLife: 1000,
    resistPhys: 0,
    resistMag: 0,
    tempBuff: {
      block: 0,
      avoidAttack: 0,
    },
    fullCombatBuff: {
      attackBuff: 0,
      blockBuff: 0,
    },
    debuff: {
      vulnerable: 0,
      weak: 0,
      poison: 0,
    },
  },
  actionEnemyLvl3: [
    {
      attack: 25,
      poison: 0,
      block: 0,
      avoidAttack: 0,
      vulne: 0,
      weak: 0,
      attackBuff: 0,
      blockBuff: 0,
      drawDebuff: 0,
      leech: false,
      distribDown: -1,
      displayedActions: `25 Damages`,
    },
    {
      attack: 15,
      poison: 0,
      block: 15,
      avoidAttack: 0,
      vulne: 0,
      weak: 0,
      attackBuff: 0,
      blockBuff: 0,
      drawDebuff: 0,
      leech: false,
      distribDown: -1,
      displayedActions: `15 Damages / 15 Block`,
    },
    {
      attack: 0,
      poison: 0,
      block: 25,
      avoidAttack: 0,
      vulne: 1,
      weak: 0,
      attackBuff: 0,
      blockBuff: 0,
      drawDebuff: 0,
      leech: false,
      distribDown: -1,
      displayedActions: `25 Block / 1 Vulne`,
    },
    {
      attack: 30,
      poison: 0,
      block: 10,
      avoidAttack: 0,
      vulne: 0,
      weak: 0,
      attackBuff: 0,
      blockBuff: 0,
      drawDebuff: 0,
      leech: false,
      distribDown: -1,
      displayedActions: `30 Damages / 10 Block`,
    },
    {
      attack: 25,
      poison: 0,
      block: 0,
      avoidAttack: 0,
      vulne: 0,
      weak: 0,
      attackBuff: 0,
      blockBuff: 0,
      drawDebuff: 0,
      leech: true,
      distribDown: -1,
      displayedActions: `25 Damages / Leech Life`,
    },
  ],

  setStartPlayerTurn: () => {},
  setEndPlayerTurn: () => {},
  setEnemyActionsResolution: () => {},
  setFightTurns: () => {},
  setPlayerLifeChange: () => {},
  setEnemyLifeChange: () => {},
  setEnemyStats: () => {},
  setIndexActionList: () => {},
  setEnemyActions: () => {},
  setEnemyActionList: () => {},
  setLvlGame: () => {},
  setPlayerStats: () => {},
  setPrevPlayerLife: () => {},
  setPrevEnemyLife: () => {},
  setItem: () => {},
};
