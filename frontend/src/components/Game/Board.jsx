/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import "../../assets/css/Game/Board.css";
import Enemy from "./Enemy";
import Player from "./Player";

export default function Board({ enemy, player }) {
  return (
    <div className="board-container">
      <Enemy enemy={enemy} />
      <Player player={player} />
      <div className="mana-game">
        {player.currentEnergy} / {player.maxEnergy}
      </div>
      <button className="findetour-game" type="button">
        {" "}
        END TOUR{" "}
      </button>
    </div>
  );
}
