import "@assets/css/HomeMenu/HomeMenu.css";
import { Link } from "react-router-dom";

function HomeMenu() {
  return (
    <div className="Button-container">
      <div className="wrap Button-logo">
        <Link to="/game">
          <div />
        </Link>
        <Link to="/about-riot">
          <div />
        </Link>
        <Link to="/library">
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
