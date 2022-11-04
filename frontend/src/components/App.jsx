import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderHome from "./Header/HeaderHome";
import Home from "../pages/Home";
import Game from "../pages/Game";
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
  return (
    <Router>
      <div className="App">
        <HeaderHome />
        <main>
          <div className="MainContent">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/library" element={<Library />} />
              <Route path="/game" element={<Game />} />
              <Route path="/about-riot" element={<AboutRiot />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
