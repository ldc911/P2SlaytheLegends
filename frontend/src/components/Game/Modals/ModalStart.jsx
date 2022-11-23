import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../../../assets/css/Game/ModalDraft.css";

export default function ModalStart({ setStartGame }) {
  return (
    <div className="Modale-start">
      <button
        type="button"
        className="Modale-validate"
        onClick={() => setStartGame(1)}
      >
        START GAME
      </button>
      <Link className="Modale-link" to="/">
        <button type="button" className="Modale-validate">
          QUIT GAME
        </button>
      </Link>
    </div>
  );
}
ModalStart.propTypes = {
  setStartGame: PropTypes.func,
};

ModalStart.defaultProps = {
  setStartGame: () => {},
};
