import { useState } from "react";
import PropTypes from "prop-types";
import rewardtest from "../../../services/rewardtest";
import CardReward from "./CardReward";
import "../../../assets/css/Game/CardReward.css";

const templatePlayer = {
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
};

export default function ModalFirstReward({ setLvlgame }) {
  const reward = rewardtest[0];
  const [selected, setSelected] = useState({});
  const [idSelectedCard, setIdSelectedCard] = useState();

  const validReward = () => {
    templatePlayer.fullGameBuff[selected.firstBuff] += selected.value1;
    templatePlayer.fullGameBuff[selected.secondBuff] += selected.value2;
    if (selected.thirdBuff) {
      templatePlayer.fullGameBuff[selected.thirdBuff] += selected.value3;
      templatePlayer.fullGameBuff[selected.fourthBuff] += selected.value4;
    }
    setSelected({});
    setIdSelectedCard();
    setLvlgame(3);

  };

  return (
    <div className="Modale-validation">
      <CardReward
        reward={reward}
        setSelected={setSelected}
        setIdSelectedCard={setIdSelectedCard}
        idSelectedCard={idSelectedCard}
      />
      <button type="button" className="Modale-validate" onClick={validReward}>
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
  setLvlgame: PropTypes.func,
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
  setLvlgame: () => {},
};
