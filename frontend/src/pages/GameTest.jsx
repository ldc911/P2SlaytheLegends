/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import "../assets/css/Game.css";
import backCard from "@assets/img/Card/card.png";
import GameCard from "../components/Game/GameCard";
import api from "../services/api";

export default function GameTest() {
  // pour appel API
  const [champions, setChampions] = useState([]);
  const [isMounting, setIsMounting] = useState(true);
  const [filteredChamp, setFilteredChamp] = useState([]);
  const [cardPlayed, setCardPlayed] = useState(false);
  const [enemyStats, setEnemyStats] = useState({
    currentLife: 1000,
    maxLife: 1000,
    resistPhys: 0,
    resistMag: 0,
    tempBuff: { block: 20, avoidAttack: 0 },
    fullCombatBuff: { attackBuff: 0, blockBuff: 0 },
    debuff: { vulnerable: 1, weak: 0, poison: 5 },
  });
  const [playerStats, setPlayerStats] = useState({
    currentLife: 90,
    maxLife: 100,
    currentEnergy: 3,
    maxEnergy: 3,
    tempBuff: { block: 0, avoidAttack: 0 },
    fullCombatBuff: { attackBuff: 3, blockBuff: 10 },
    debuff: { vulnerable: 0, weak: 0, poison: 0 },
    drawCard: 0,
  });

  const dragItem = useRef();
  const dragOverItem = useRef();
  /// HAND
  const [list, setList] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
  ]);

  const [normalAttack, setnormalAttack] = useState("");
  const [idPlayedCard, setIdPlayedCard] = useState("");
  const [endTurn, setEndturn] = useState(false);

  useEffect(() => {
    /// Fin de tour
    if (endTurn) {
      setnormalAttack("endTurn");
    } else {
      // Si pas la fin du tour
      setnormalAttack("normalAttack");
    }
  }, [idPlayedCard, endTurn, normalAttack]);

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };
  const drop = () => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
  };

  const allowDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const dropEnnemy = (e) => {
    e.preventDefault();
    setIdPlayedCard(dragItem.current);
  };

  // appel Service API
  useEffect(() => {
    api.getChampions().then((json) => {
      setChampions(json.data);
      setIsMounting(false);
    });
  }, []);

  useEffect(() => {
    let filteredChamp1 = Object.entries(champions);
    setFilteredChamp([...filteredChamp1]);
    console.log(filteredChamp1);
  }, [champions]);

  return (
    <>
      <div>
        {filteredChamp[0] ? (
          <GameCard
            cardChampion={filteredChamp[11][1]}
            cardPlayed={cardPlayed}
            setCardPlayed={setCardPlayed}
            enemyStats={enemyStats}
            setEnemyStats={setEnemyStats}
            playerStats={playerStats}
            setPlayerStats={setPlayerStats}
          />
        ) : (
          "TBD"
        )}
        <button
          type="button"
          onClick={() => {
            setCardPlayed(true);
          }}
        >
          play card: {cardPlayed ? "true" : "false"}
        </button>
        <p>
          Boss Life {enemyStats.currentLife} / Block
          {enemyStats.tempBuff.block} / vul {enemyStats.debuff.vulnerable} /
          weak {enemyStats.debuff.weak} / poison {enemyStats.debuff.poison} /
        </p>
        <p>
          player Energy {playerStats.currentEnergy} / Block{" "}
          {playerStats.tempBuff.block} / attack buff{" "}
          {playerStats.fullCombatBuff.attackBuff} / defense buff{" "}
          {playerStats.fullCombatBuff.blockBuff} / draw card{" "}
          {playerStats.drawCard} / Avoid {playerStats.tempBuff.avoidAttack}{" "}
        </p>
        <p>
          Player Life: {playerStats.currentLife} / {playerStats.maxLife}
        </p>
        <div
          className="drag-drop-zone"
          onDrop={(e) => dropEnnemy(e)}
          onDragOver={(e) => allowDrop(e)}
        >
          <p>Attack le mechant !</p>
          <button type="button" onClick={() => setEndturn(true)}>
            Fin de Tour
          </button>
        </div>
      </div>
      <div className="game-bottom">
        <div>
          <img src={backCard} width="auto" alt="Deck" />
        </div>
        {list &&
          list.map((item, index) => {
            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: "lightblue",
                  margin: "20px auto",
                  textAlign: "center",
                  fontSize: "40px",
                }}
                onDragStart={(e) => dragStart(e, index)}
                onDragEnter={(e) => dragEnter(e, index)}
                onDragEnd={drop}
                draggable
              >
                {item}
              </div>
            );
          })}
        <div>
          <img src={backCard} width="auto" alt="Cemetery" />
        </div>
      </div>
    </>
  );
}
