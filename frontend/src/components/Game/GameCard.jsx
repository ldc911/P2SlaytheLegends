/* eslint-disable consistent-return */
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "../../assets/css/CardLib.css";

function GameCard({
  cardChampion,
  cardIndex,
  cardManager,
  setCardManager,
  playerStats,
  setPlayerStats,
  enemyStats,
  setEnemyStats,
}) {
  const [cardEnergyCost, setCardEnergyCost] = useState(0);
  const [magicAttack, setMagicAttack] = useState(0);
  const [physAttack, setPhysAttack] = useState(0);
  const [block, setBlock] = useState(0);
  const [poison, setPoison] = useState(0);
  const [doublePoison, setDoublePoison] = useState(false);
  const [dodge, setDodge] = useState(0);
  const [playerAttackBuff, setPlayerAttackBuff] = useState(0);
  const [playerBlockBuff, setPlayerBlockBuff] = useState(0);
  const [vulnerability, setVulnerability] = useState(0);
  const [weak, setWeak] = useState(0);
  const [draw, setDraw] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [heal, setHeal] = useState(0);

  const manaCost = (champ) => {
    // console.log(cardChampion.info.difficulty);
    switch (champ) {
      case 0:
      case 1:
      case 2:
      case 3:
        return "0";
      case 4:
      case 5:
      case 6:
        return "1";
      case 7:
      case 8:
        return "2";
      case 9:
      case 10:
        return "3";
      default:
        return "TBD";
    }
  };
  // function to assign card skill 1 based on the champ class 1
  const skill1 = (champ) => {
    switch (champ.tags[0]) {
      case "Tank":
        return `Gain ${(
          7 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
          parseInt(manaCost(champ.info.difficulty), 10)
        ).toString()} Block`;
      case "Fighter":
        return `Deal ${(
          7 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
          parseInt(manaCost(champ.info.difficulty), 10)
        ).toString()} Phys Damage`;
      case "Support":
        return `Heal ${(
          4 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
          parseInt(manaCost(champ.info.difficulty), 10)
        ).toString()} HP`;
      case "Mage":
        return champ.tags.length === 2
          ? `Deal ${(
              7 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
              parseInt(manaCost(champ.info.difficulty), 10)
            ).toString()} Magic Damage`
          : `cards damage value + ${(
              1 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
              parseInt(manaCost(champ.info.difficulty), 10)
            ).toString()}`;
      case "Marksman":
        return `Apply ${(
          1 *
          (parseInt(manaCost(champ.info.difficulty), 10) + 1)
        ).toString()} Vulnerability`;
      case "Assassin":
        return champ.tags.length === 2
          ? `Apply ${(
              4 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
              parseInt(manaCost(champ.info.difficulty), 10)
            ).toString()} Poison`
          : "double ennemy Poison";
      default:
        return "TBD";
    }
  };

  // function to assign card skill 2 based on the champ class 2
  const skill2 = (champ) => {
    switch (champ.tags[1]) {
      case "Tank":
        return `Gain ${(
          7 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
          parseInt(manaCost(champ.info.difficulty), 10)
        ).toString()} Block`;
      case "Fighter":
        return `cards block value + ${(
          1 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
          parseInt(manaCost(champ.info.difficulty), 10)
        ).toString()}`;
      case "Support":
        return `gain ${
          parseInt(manaCost(champ.info.difficulty), 10) < 2 ? "1" : "2"
        } Energy`;
      case "Mage":
        return `Apply ${(
          1 *
          (parseInt(manaCost(champ.info.difficulty), 10) + 1)
        ).toString()} Weak`;
      case "Marksman":
        return "Ignore next attack";
      case "Assassin":
        return `Draw ${
          parseInt(manaCost(champ.info.difficulty), 10) < 2 ? "1" : "2"
        } card`;
      default:
        return "TBD";
    }
  };

  // function to set card skill values based on the champ class 1
  const skillValues1 = (champ) => {
    switch (champ.tags[0]) {
      case "Tank":
        setBlock(
          7 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
            parseInt(manaCost(champ.info.difficulty), 10)
        );
        break;
      case "Fighter":
        setPhysAttack(
          7 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
            parseInt(manaCost(champ.info.difficulty), 10)
        );
        break;
      case "Support":
        setHeal(
          4 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
            parseInt(manaCost(champ.info.difficulty), 10)
        );
        break;
      case "Mage":
        setMagicAttack(
          champ.tags.length === 2 &&
            7 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
              parseInt(manaCost(champ.info.difficulty), 10)
        );
        setPlayerAttackBuff(
          champ.tags.length === 1 &&
            1 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
              parseInt(manaCost(champ.info.difficulty), 10)
        );
        break;
      case "Marksman":
        setVulnerability(
          1 * (parseInt(manaCost(champ.info.difficulty), 10) + 1)
        );
        break;
      case "Assassin":
        setPoison(
          champ.tags.length === 2 &&
            4 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
              parseInt(manaCost(champ.info.difficulty), 10)
        );
        setDoublePoison(champ.tags.length === 1 && true);
        break;
      default:
        return "TBD";
    }
  };

  // function to set card skill values based on the champ class 1
  const skillValues2 = (champ) => {
    switch (champ.tags[1]) {
      case "Tank":
        setBlock(
          7 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
            parseInt(manaCost(champ.info.difficulty), 10)
        );
        break;
      case "Fighter":
        setPlayerBlockBuff(
          1 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
            parseInt(manaCost(champ.info.difficulty), 10)
        );
        break;
      case "Support":
        setEnergy(parseInt(manaCost(champ.info.difficulty), 10) < 2 ? 1 : 2);
        break;
      case "Mage":
        setWeak(1 * (parseInt(manaCost(champ.info.difficulty), 10) + 1));
        break;
      case "Marksman":
        setDodge(1);
        break;
      case "Assassin":
        setDraw(parseInt(manaCost(champ.info.difficulty), 10) < 2 ? 1 : 2);
        break;
      default:
        return "TBD";
    }
  };

  useEffect(() => {
    setCardEnergyCost(parseInt(manaCost(cardChampion.info.difficulty), 10));
    skillValues1(cardChampion);
    if (cardChampion.tags[1]) skillValues2(cardChampion);
  }, []);

  useEffect(() => {
    if (cardManager.isPlayed && cardManager.index === cardIndex) {
      const playerCopy = playerStats;
      const enemyCopy = enemyStats;
      playerCopy.currentEnergy -= cardEnergyCost;
      /* magic Attack action */
      if (magicAttack > 0) {
        if (enemyCopy.tempBuff.avoidAttack === 0) {
          let damage = Math.round(
            (magicAttack + playerCopy.fullCombatBuff.attackBuff) *
              (enemyCopy.debuff.vulnerable > 0 ? 1.25 : 1) *
              (playerCopy.debuff.weak > 0 ? 0.75 : 1)
          );
          damage -= enemyCopy.resistMag;
          if (enemyCopy.tempBuff.block > 0) {
            if (damage > enemyCopy.tempBuff.block) {
              damage -= enemyCopy.tempBuff.block;
              enemyCopy.tempBuff.block = 0;
              enemyCopy.currentLife -= damage;
            } else {
              enemyCopy.tempBuff.block -= damage;
            }
          } else enemyCopy.currentLife -= damage;
        } else enemyCopy.tempBuff.avoidAttack -= 1;
      }
      /* physique Attack action */
      if (physAttack > 0) {
        if (enemyCopy.tempBuff.avoidAttack === 0) {
          let damage = Math.round(
            (physAttack + playerCopy.fullCombatBuff.attackBuff) *
              (enemyCopy.debuff.vulnerable ? 1.25 : 1) *
              (playerCopy.debuff.weak > 0 ? 0.75 : 1)
          );
          damage -= enemyCopy.resistPhys;
          if (enemyCopy.tempBuff.block > 0) {
            if (damage > enemyCopy.tempBuff.block) {
              damage -= enemyCopy.tempBuff.block;
              enemyCopy.tempBuff.block = 0;
              enemyCopy.currentLife -= damage;
            } else {
              enemyCopy.tempBuff.block -= damage;
              damage = 0;
            }
          } else enemyCopy.currentLife -= damage;
        } else enemyCopy.tempBuff.avoidAttack -= 1;
      }
      /* block action */
      if (block > 0) {
        playerCopy.tempBuff.block +=
          block + playerCopy.fullCombatBuff.blockBuff;
      }
      /* poison action */
      if (poison > 0) {
        enemyCopy.debuff.poison += poison;
      }
      /* double poison action */
      if (doublePoison) {
        enemyCopy.debuff.poison *= 2;
      }
      /* dodge action */
      if (dodge > 0) {
        playerCopy.tempBuff.avoidAttack += dodge;
      }
      /* Attack buff action */
      if (playerAttackBuff > 0) {
        playerCopy.fullCombatBuff.attackBuff += playerAttackBuff;
      }
      /* Block buff action */
      if (playerBlockBuff > 0) {
        playerCopy.fullCombatBuff.blockBuff += playerBlockBuff;
      }
      /* vulnerability action */
      if (vulnerability > 0) {
        enemyCopy.debuff.vulnerable += vulnerability;
      }
      /* weak action */
      if (weak > 0) {
        enemyCopy.debuff.weak += weak;
      }
      /* energy recover action */
      if (energy > 0) {
        playerCopy.currentEnergy += energy;
      }
      /* heal action */
      if (heal > 0) {
        playerCopy.currentLife += heal;
        if (playerCopy.currentLife > playerCopy.maxLife) {
          playerCopy.currentLife = playerCopy.maxLife;
        }
      }
      /* draw card(s) action */
      if (draw > 0) {
        playerCopy.drawCard = draw;
      }
      setEnemyStats(enemyCopy);
      setPlayerStats(playerCopy);
      const cardManagerCopy = cardManager;
      cardManagerCopy.isPlayed = false;
      cardManagerCopy.actionDone = true;
      setCardManager(cardManagerCopy);
    }
  }, [cardManager.isPlayed]);
  return (
    <div>
      <button
        type="button"
        className="champCard"
        /* style={{ height: `calc(1.37 * 20vw)` }} */
      >
        {cardChampion ? (
          <div className="cardContainer">
            <div className="manaCard">
              <h3>{manaCost(cardChampion.info.difficulty)}</h3>
            </div>
            <div className="champCardName">
              <h3>{cardChampion.name}</h3>
            </div>
            <div
              className="cardPicContainer"
              style={{
                backgroundImage: `url(http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${cardChampion.id}_0.jpg)`,
              }}
            />
            <div className="skillsCard">
              <p>{skill1(cardChampion)}</p>
              <p>{cardChampion.tags[1] ? skill2(cardChampion) : null}</p>
            </div>
          </div>
        ) : (
          "TBD"
        )}
      </button>
    </div>
  );
}

export default GameCard;

GameCard.propTypes = {
  cardChampion: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    info: PropTypes.shape({
      difficulty: PropTypes.number,
    }),
  }),
  cardIndex: PropTypes.number,
  cardManager: PropTypes.shape({
    index: PropTypes.number,
    isPlayed: PropTypes.bool,
    actionDone: PropTypes.bool,
  }),
  setCardManager: PropTypes.func,
  playerStats: PropTypes.shape({
    currentLife: PropTypes.number,
    maxLife: PropTypes.number,
    currentEnergy: PropTypes.number,
    maxEnergy: PropTypes.number,
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
    drawCard: PropTypes.number,
  }),
  setPlayerStats: PropTypes.func,
  enemyStats: PropTypes.shape({
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
  setEnemyStats: PropTypes.func,
};

GameCard.defaultProps = {
  cardChampion: {
    id: "",
    tags: [""],
    info: {
      difficulty: 0,
    },
    name: "",
  },
  cardIndex: -2,
  cardManager: {
    index: -1,
    isPlayed: false,
    actionDone: false,
  },
  setCardManager: () => {},
  playerStats: {
    currentLife: 100,
    maxLife: 100,
    currentEnergy: 3,
    maxEnergy: 3,
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
    drawCard: 0,
  },
  setPlayerStats: () => {},
  enemyStats: {
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
  setEnemyStats: () => {},
};
