import PropTypes from "prop-types";
import "../../../assets/css/Game/CardReward.css";

export default function CardReward({
  rewards,
  setSelected,
  setIdSelectedCard,
  idSelectedCard,
}) {
  const handleClick = () => {
    setSelected(rewards);
    setIdSelectedCard(rewards.id);
  };

  return (
    <div
      className={
        idSelectedCard === rewards.id
          ? "CardReward-item cardSelected"
          : "CardReward-item"
      }
    >
      <button type="button" onClick={handleClick}>
        <img src={rewards.pic} alt="reward_pic" className="CardReward-pic" />
      </button>
      <div className="CardReward-stats">
        <div>
          {rewards.firstBuff} + {rewards.value1}
        </div>
        <div>
          {rewards.secondBuff} + {rewards.value2}
        </div>
        {rewards.thirdBuff && (
          <div>
            {rewards.thirdBuff} + {rewards.value3}
          </div>
        )}
      </div>
    </div>
  );
}

CardReward.propTypes = {
  rewards: PropTypes.shape({
    id: PropTypes.number,
    pic: PropTypes.string,
    firstBuff: PropTypes.string,
    value1: PropTypes.number,
    secondBuff: PropTypes.string,
    value2: PropTypes.number,
    thirdBuff: PropTypes.string,
    value3: PropTypes.number,
  }),
  setIdSelectedCard: PropTypes.func,
  idSelectedCard: PropTypes.number,
  setSelected: PropTypes.func,
};
CardReward.defaultProps = {
  rewards: {
    id: 0,
    pic: "",
    firstBuff: "",
    value1: 0,
    secondBuff: "",
    value2: 0,
    thirdBuff: "",
    value3: 0,
  },
  setIdSelectedCard: () => {},
  idSelectedCard: 0,
  setSelected: () => {},
};
