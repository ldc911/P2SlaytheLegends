/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "../../assets/css/CardLib.css";

function GameCard({
  cardChampion,
  cardPlayed,
  playerStats,
  setPlayerStats,
  enemyStats,
  setEnemyStats,
  /* setDrawCard, */
}) {
  const [cardManaCost, setCardManaCost] = useState(0);
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
    setCardManaCost(parseInt(manaCost(cardChampion.info.difficulty), 10));
    skillValues1(cardChampion);
    if (cardChampion.tags[1]) skillValues2(cardChampion);
  }, []);

  useEffect(() => {
    let playerCopy = playerStats;
    let enemyCopy = enemyStats;
    if (cardPlayed) {
      playerCopy.currentMana -= cardManaCost;
      if (magicAttack > 0) enemyCopy.currentLife -= magicAttack;
      if (physAttack > 0) enemyCopy.currentLife -= physAttack;
      setEnemyStats(enemyCopy);
      setPlayerStats(playerCopy);
      /* console.log(enemyCopy.currentLife); */
    }
  }, [cardPlayed]);
  /* console.log("voici cardChampion"+cardChampion); */
  return (
    <div>
      <button type="button" className="champCard" onClick={() => {}}>
        {cardChampion ? (
          <div className="cardContainer">
            <div className="manaCard">
              {/* <h3>{manaCost(cardChampion.info.difficulty)}</h3> */}
              <h3>{cardManaCost}</h3>
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
      <div style={{ display: "flex" }}>
        <p>magicAttack {magicAttack}</p>
        <p>physAttack {physAttack}</p>
        <p>block {block}</p>
        <p>poison {poison}</p>
        <p>double poison{doublePoison ? " yes" : " no"}</p>
        <p>dodge {dodge}</p>
        <p>playerAttackBuff {playerAttackBuff}</p>
        <p>playerBlockBuff {playerBlockBuff}</p>
        <p>vulnerability {vulnerability}</p>
        <p>weak {weak}</p>
        <p>draw {draw}</p>
        <p>energy {energy}</p>
        <p>heal {heal}</p>
        <p>boss life {enemyStats.currentLife}</p>
      </div>
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
};
