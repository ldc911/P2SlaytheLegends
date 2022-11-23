import PropTypes from "prop-types";
import lvlUp from "../../../assets/img/Game/lvlup.png";
import "../../../assets/css/Game/ModalReward.css";

export default function ModalSecondReward({
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
  enemyLvl5,
  actionEnemyLvl5,
  setPrevPlayerLife,
  setPrevEnemyLife,
}) {
  const modifyPlayer = (player) => {
    const newPlayerStats = player;
    newPlayerStats.currentEnergy = 4;
    newPlayerStats.maxLife += 50;
    newPlayerStats.maxEnergy = 4;
    newPlayerStats.currentLife += 50;
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
    setStartPlayerTurn(false);
    setEndPlayerTurn(false);
    setEnemyActionsResolution(false);
    setFightTurns(1);
    setPlayerLifeChange(0);
    setEnemyLifeChange(0);
    setEnemyStats(enemyLvl5);
    setIndexActionList(1);
    setEnemyActions(actionEnemyLvl5[0]);
    setEnemyActionList(actionEnemyLvl5);
    setLvlGame(5);
    setPrevPlayerLife(playerStats.currentLife);
    setPrevEnemyLife(enemyLvl5.currentLife);
  };

  return (
    <div className="Modale-reward">
      <h1> Félicitations, le second Boss est tombé ! </h1>
      <h2>Voici un petit coup de pouce pour l'épreuve finale...</h2>
      <div className="ModalReward-lvlUp">
        <h3>HEAL 50 PV</h3>
        <img src={lvlUp} alt="lvlup_pic" />
        <h3>+50 MAX PV</h3>
      </div>
      <h3>+1 ENERGIE</h3>

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

ModalSecondReward.propTypes = {
  reward: PropTypes.shape({
    id: PropTypes.number,
    pic: PropTypes.string,
    firstBuff: PropTypes.string,
    value1: PropTypes.number,
    secondBuff: PropTypes.string,
    value2: PropTypes.number,
  }),
  playerStats: PropTypes.shape({
    maxLife: PropTypes.number,
    maxEnergy: PropTypes.number,
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
  enemyLvl5: PropTypes.shape({
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
  actionEnemyLvl5: PropTypes.arrayOf(
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
};
ModalSecondReward.defaultProps = {
  reward: {
    id: 0,
    pic: "",
    firstBuff: "",
    value1: 0,
    secondBuff: "",
    value2: 0,
  },
  playerStats: {
    maxLife: 0,
    maxEnergy: 3,
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
  enemyLvl5: {
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
  actionEnemyLvl5: [
    {
      attack: 30,
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
      displayedActions: `30 Damages / 15 Block`,
    },
    {
      attack: 0,
      poison: 5,
      block: 15,
      avoidAttack: 0,
      vulne: 0,
      weak: 0,
      attackBuff: 0,
      blockBuff: 0,
      drawDebuff: 0,
      leech: false,
      distribDown: -1,
      displayedActions: `5 Poison / 15 Block`,
    },
    {
      attack: 40,
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
      displayedActions: `40 Damages / Leech Life`,
    },
    {
      attack: 0,
      poison: 0,
      block: 0,
      avoidAttack: 1,
      vulne: 0,
      weak: 1,
      attackBuff: 0,
      blockBuff: 0,
      drawDebuff: 0,
      leech: false,
      distribDown: -1,
      displayedActions: `1 Dodge / 1 Weak`,
    },
    {
      attack: 30,
      poison: 0,
      block: 20,
      avoidAttack: 0,
      vulne: 0,
      weak: 0,
      attackBuff: 0,
      blockBuff: 0,
      drawDebuff: 0,
      leech: false,
      distribDown: -1,
      displayedActions: `30 Damages / 20 Block`,
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
};
