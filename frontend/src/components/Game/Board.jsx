/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import "../../assets/css/Game/Board.css";
import Enemy from "./Enemy";
// eslint-disable-next-line import/no-unresolved
import Player from "./Player";

export default function Board({
  enemy,
  player,
  setEndPlayerTurn,
  fightTurns,
  playerLifeChange,
  enemyLifeChange,
}) {
  return (
    <div className="board-container">
      <Enemy enemy={enemy} enemyLifeChange={enemyLifeChange} />
      <Player player={player} playerLifeChange={playerLifeChange} />
      <div className="mana-game">
        {player.currentEnergy}/{player.maxEnergy}
      </div>
      <button
        className="findetour-game"
        type="button"
        onClick={() => setEndPlayerTurn(true)}
      >
        {" "}
        END TURN{" "}
      </button>
      <div className="">
        <div />
      </div>
    </div>
  );
}
