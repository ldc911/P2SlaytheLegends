import React, { useState, useEffect } from "react";
import api from "../services/api";

const ChampionsList = () => {
  const [champions, setChampions] = useState([]);
  const [isMounting, setIsMounting] = useState(true);

  useEffect(() => {
    api.getChampions().then((json) => {
      setChampions(json.data);
      setIsMounting(false);
    });
  }, [isMounting]);

  return isMounting ? (
    <p>En cours de chargement</p>
  ) : (
    <ul>
      {champions &&
        Object.entries(champions).map((champion) => {
          return (
            <li key={champion[1].id}>
              {champion[1].stats.hp} {champion[1].title}
              <img
                alt={champion[1].id}
                src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion[1].id}_0.jpg`}
              />
            </li>
          );
        })}
    </ul>
  );
}

export default ChampionsList;
