import { useState } from "react";
import PropTypes from "prop-types";
import "../../assets/css/Game/ModalDraft.css";
import ModalDraft from "./Modals/ModalDraft";
import ModalStart from "./Modals/ModalStart";
import ModalFirstReward from "./Modals/ModalFirstReward";
import ModalSecondReward from "./Modals/ModalSecondReward";
import ModalWin from "./Modals/ModalWin";

export default function ModalDisplay({
  setDeckJeu,
  setLvlGame,
  lvlGame,
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
  enemyLvl5,
  actionEnemyLvl5,
  setPrevPlayerLife,
  setPrevEnemyLife,
  setItem,
}) {
  const [startGame, setStartGame] = useState(0);
  const deckDepart = [];

  return (
    <div className="Modale-wrapper">
      {lvlGame === 0 &&
        (!startGame ? (
          <ModalStart setStartGame={setStartGame} />
        ) : (
          <ModalDraft
            setDeckJeu={setDeckJeu}
            setLvlGame={setLvlGame}
            setStartGame={setStartGame}
            deckDepart={deckDepart}
          />
        ))}
      {lvlGame === 2 && (
        <div className="ModalReward-container">
          <ModalFirstReward
            setLvlGame={setLvlGame}
            setStartPlayerTurn={setStartPlayerTurn}
            setEndPlayerTurn={setEndPlayerTurn}
            setEnemyActionsResolution={setEnemyActionsResolution}
            setFightTurns={setFightTurns}
            setPlayerLifeChange={setPlayerLifeChange}
            setEnemyLifeChange={setEnemyLifeChange}
            playerStats={playerStats}
            setPlayerStats={setPlayerStats}
            setEnemyStats={setEnemyStats}
            setIndexActionList={setIndexActionList}
            setEnemyActions={setEnemyActions}
            setEnemyActionList={setEnemyActionList}
            enemyLvl3={enemyLvl3}
            actionEnemyLvl3={actionEnemyLvl3}
            setPrevPlayerLife={setPrevPlayerLife}
            setPrevEnemyLife={setPrevEnemyLife}
            setitem={setItem}
          />
        </div>
      )}
      {lvlGame === 4 && (
        <div className="ModalReward-container">
          <ModalSecondReward
            setLvlGame={setLvlGame}
            setStartPlayerTurn={setStartPlayerTurn}
            setEndPlayerTurn={setEndPlayerTurn}
            setEnemyActionsResolution={setEnemyActionsResolution}
            setFightTurns={setFightTurns}
            setPlayerLifeChange={setPlayerLifeChange}
            setEnemyLifeChange={setEnemyLifeChange}
            playerStats={playerStats}
            setPlayerStats={setPlayerStats}
            setEnemyStats={setEnemyStats}
            setIndexActionList={setIndexActionList}
            setEnemyActions={setEnemyActions}
            setEnemyActionList={setEnemyActionList}
            enemyLvl5={enemyLvl5}
            actionEnemyLvl5={actionEnemyLvl5}
            setPrevPlayerLife={setPrevPlayerLife}
            setPrevEnemyLife={setPrevEnemyLife}
          />
        </div>
      )}
      {lvlGame === 6 && (
        <div className="ModalReward-winContainer">
          <ModalWin />
        </div>
      )}
    </div>
  );
}

ModalDisplay.propTypes = {
  playerStats: PropTypes.shape({
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
  lvlGame: PropTypes.number,
  setDeckJeu: PropTypes.func,
  setLvlGame: PropTypes.func,
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
  setPlayerStats: PropTypes.func,
  setPrevPlayerLife: PropTypes.func,
  setPrevEnemyLife: PropTypes.func,
  setItem: PropTypes.func,
};

ModalDisplay.defaultProps = {
  playerStats: {
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

  lvlGame: 0,
  setLvlGame: () => {},
  setDeckJeu: () => {},
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
  setPlayerStats: () => {},
  setPrevPlayerLife: () => {},
  setPrevEnemyLife: () => {},
  setItem: () => {},
};
