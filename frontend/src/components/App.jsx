import * as React from "react";
import { Routes, Route, matchPath, useLocation } from "react-router-dom";
import HeaderHome from "./Header/HeaderHome";
import Home from "../pages/Home";
import Game from "../pages/Game";
import Scores from "../pages/Scores";
import Library from "../pages/Library";
import AboutRiot from "../pages/AboutRiot";
import Footer from "./Footer/Footer";
import "../assets/css/App.css";
import api from "../services/api";

// random image background
const pic = () => {
  const splashs = [];
  api.getChampions().then((json) => {
    // recupere la liste json
    splashs.push(json.data);
    // met les premiere keys de json dans un array
    const bgm = Object.keys(splashs[0]);
    // Change le style background
    document.body.style.background = `no-repeat fixed url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${
      bgm[Math.floor(Math.random() * bgm.length)]
    }_0.jpg) 50% 50% / cover #ffffff`;
  });
};
pic();

export default function App() {
  const location = useLocation();
  const acceuil = matchPath({ path: "/" }, location.pathname);
  const game = matchPath({ path: "/game" }, location.pathname);

  return (
    <div className="App">
      {!game && <HeaderHome />}
      <main className={acceuil || game ? "" : "pagecontent"}>
        <div className="main-content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/game" element={<Game />} />
            <Route path="/about-riot" element={<AboutRiot />} />
            <Route path="/scores" element={<Scores />} />
          </Routes>
        </div>
      </main>
      {game ? "" : <Footer />}
    </div>
  );
}
