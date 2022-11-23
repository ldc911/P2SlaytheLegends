import "../../assets/css/HomeMenu/HomeMenu.css";
import { Link } from "react-router-dom";

function HomeMenu() {
  return (
    <div className="Button-container">
      <div className="wrap Button-logo">
        <Link className="Home-a Home-game" to="/game">
          <div />
        </Link>
        <Link className="Home-a Home-riot" to="/about-riot">
          <div />
        </Link>
        <Link className="Home-a Home-lib" to="/library">
          <div />
        </Link>
        <div className="Home-button">
          <div />
        </div>
      </div>
    </div>
  );
}

export default HomeMenu;
