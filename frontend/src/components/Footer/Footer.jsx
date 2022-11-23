import "../../assets/css/Footer/Footer.css";
import LogoFooter from "../../assets/img/Footer/logoLolFooter.png";
import LogoTeam from "../../assets/img/Footer/logoUndefined.png";
import LogoWildCodeSchool from "../../assets/img/Footer/Wildcodeschool.png";

function Footer() {
  return (
    /* Principal footer of the application */
    <footer className="main-footer">
      {/* the left side information of the footer */}
      <div className="colonne-footer">
        <img
          className="logo-Wild-footer"
          src={LogoWildCodeSchool}
          alt="logo-Wild-footer"
        />
      </div>
      {/* the information in the center of the footer */}
      <div className="colonne-footer">
        <img className="image-footer" src={LogoFooter} alt="Logo du footer" />
      </div>
      {/* the right side information of the footer */}
      <div className="colonne-footer">
        <img
          className="logo-team-footer"
          src={LogoTeam}
          alt="Logo de l'équipe"
        />
        <ul className="liste-namecreators-footer">
          <li className="name-creators-footer">Yannick</li>
          <li className="name-creators-footer">Rosbain</li>
        </ul>
        <ul className="liste-namecreators-footer">
          <li className="name-creators-footer">Laurent</li>
          <li className="name-creators-footer">Romain</li>
        </ul>
      </div>
    </footer>
  );
}
export default Footer;
