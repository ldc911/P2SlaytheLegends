import { Link } from "react-router-dom";
import lolLogo from "../../../assets/img/Game/lol_logo.png";

export default function ModalWin() {
  return (
    <div className="ModalReward-win">
      <h1>FELICITATIONS !</h1>
      <h1>VOUS AVEZ VAINCU.</h1>
      <Link className="Modale-link" to="/">
        <img src={lolLogo} alt="lol_logo" />
      </Link>
    </div>
  );
}
