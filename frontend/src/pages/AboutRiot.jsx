import { useState } from "react";
import "../assets/css/AboutRiot/AboutRiot.css";

import Enterprise from "../components/AboutRiot/Enterprise";
import Bds from "../components/AboutRiot/Bds";
import Netflix from "../components/AboutRiot/Netflix";
import Map from "../components/AboutRiot/Map";
import Esport from "../components/AboutRiot/Esport";
import Jeux from "../components/AboutRiot/Jeux";

export default function AboutRiot() {
  const [contentLoad, setContentLoad] = useState("enterprise");

  return (
    <div className="AboutRiot-menu">
      <nav>
        <ul className="AboutRiot-ul">
          {contentLoad === "enterprise" ? (
            ""
          ) : (
            <li>
              <button
                type="button"
                onClick={() => setContentLoad("enterprise")}
              >
                Entreprise
              </button>
            </li>
          )}
          {contentLoad === "anime" ? (
            ""
          ) : (
            <li>
              <button type="button" onClick={() => setContentLoad("anime")}>
                Bandes Dessinées
              </button>
            </li>
          )}
          {contentLoad === "netflix" ? (
            ""
          ) : (
            <li>
              <button type="button" onClick={() => setContentLoad("netflix")}>
                NetFlix
              </button>
            </li>
          )}
          {contentLoad === "map" ? (
            ""
          ) : (
            <li>
              <button type="button" onClick={() => setContentLoad("map")}>
                Carte
              </button>
            </li>
          )}
          {contentLoad === "esport" ? (
            ""
          ) : (
            <li>
              <button type="button" onClick={() => setContentLoad("esport")}>
                L'Esport
              </button>
            </li>
          )}
          {contentLoad === "jeux" ? (
            ""
          ) : (
            <li>
              <button type="button" onClick={() => setContentLoad("jeux")}>
                Les jeux
              </button>
            </li>
          )}
        </ul>
      </nav>
      <div className="AboutRiot-wrapper">
        {contentLoad === "map" ? <Map /> : ""}
        {contentLoad === "enterprise" ? <Enterprise /> : ""}
        {contentLoad === "anime" ? <Bds /> : ""}
        {contentLoad === "netflix" ? <Netflix /> : ""}
        {contentLoad === "esport" ? <Esport /> : ""}
        {contentLoad === "jeux" ? <Jeux /> : ""}
      </div>
    </div>
  );
}
