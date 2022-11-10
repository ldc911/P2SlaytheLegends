import PropTypes from "prop-types";
import "../../assets/css/CardLib.css";

function CardLib({ cardChampion, setModalOpen, setModalChamp }) {
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
  // test function to assign card skill 1 based on the champ class 1
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

  // test function to assign card skill 2 based on the champ class 2
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

  const loadModal = () => {
    setModalChamp(cardChampion.id);
    setModalOpen(true);
  };

  return (
    <button
      type="button"
      className="champCard"
      onClick={() => {
        loadModal();
      }}
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
  );
}

export default CardLib;

CardLib.propTypes = {
  cardChampion: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    info: PropTypes.shape({
      difficulty: PropTypes.number,
    }),
  }),
  setModalOpen: PropTypes.func,
  setModalChamp: PropTypes.func,
};

CardLib.defaultProps = {
  cardChampion: {
    id: "",
    tags: [""],
    info: {
      difficulty: 0,
    },
    name: "",
  },
  setModalOpen: () => {},
  setModalChamp: () => {},
};
