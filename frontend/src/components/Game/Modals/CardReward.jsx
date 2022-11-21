import PropTypes from "prop-types";
import "../../../assets/css/Game/CardReward.css";

export default function CardReward({
  reward,
  setSelected,
  setIdSelectedCard,
  idSelectedCard,
}) {
  const handleClick = () => {
    setSelected(reward);
    setIdSelectedCard(reward.id);
  };

  return (
    <div
      className={
        idSelectedCard === reward.id
          ? "CardReward-item cardSelected"
          : "CardReward-item"
      }
    >
      <button type="button" onClick={handleClick}>
        <img src={reward.pic} alt="reward_pic" className="CardReward-pic" />
      </button>
      <div>
        {reward.firstBuff} + {reward.value1}
      </div>
      <div>
        {reward.secondBuff} + {reward.value2}
      </div>
      {reward.thirdBuff && (
        <div>
          {reward.thirdBuff} + {reward.value3}
        </div>
      )}
      {reward.fourthBuff && (
        <div>
          {reward.fourthBuff} + {reward.value4}
        </div>
      )}
    </div>
  );
}

CardReward.propTypes = {
  reward: PropTypes.shape({
    id: PropTypes.number,
    pic: PropTypes.string,
    firstBuff: PropTypes.string,
    value1: PropTypes.number,
    secondBuff: PropTypes.string,
    value2: PropTypes.number,
    thirdBuff: PropTypes.string,
    value3: PropTypes.number,
    fourthBuff: PropTypes.string,
    value4: PropTypes.number,
  }),
  setIdSelectedCard: PropTypes.func,
  idSelectedCard: PropTypes.number,
  setSelected: PropTypes.func,
};
CardReward.defaultProps = {
  reward: {
    id: 0,
    pic: "",
    firstBuff: "",
    value1: 0,
    secondBuff: "",
    value2: 0,
    thirdBuff: "",
    value3: 0,
    fourthBuff: "",
    value4: 0,
  },
  setIdSelectedCard: () => {},
  idSelectedCard: 0,
  setSelected: () => {},
};
