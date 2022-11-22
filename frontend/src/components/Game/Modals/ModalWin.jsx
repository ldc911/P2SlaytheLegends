import { Link } from "react-router-dom";
import victoryLogo from "../../../assets/img/Game/victory.png";

export default function ModalWin() {
  return (
    <div className="ModalReward-win">
      <h1>FELICITATIONS !</h1>
      <h1>VOUS AVEZ VAINCU.</h1>
      <Link className="Modale-link" to="/">
        <img src={victoryLogo} alt="victory" className="ModalReward-winLogo" />
      </Link>
    </div>
  );
}
