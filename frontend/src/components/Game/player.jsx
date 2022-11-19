/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import "../../assets/css/Game/player.css";

export default function player({ player }) {
  return (
    <div className="player-stat">
      <div className="block-player">
        {" "}
        <i className="fa-solid fa-shield buff" />
        {player.tempBuff.block > 0 && ` ${player.tempBuff.block} `}
      </div>
      <div className="entoure-barredevie-player">
        <div
          className="vie-player"
          style={{
            width: `${(player.currentLife / player.maxLife) * 100}%`,
          }}
        />
        <div className="vie-text-player">
          {player.currentLife} / {player.maxLife}
        </div>
      </div>

      <div>
        <span className="paragraph-player">
          {player.tempBuff.avoidAttack > 0 &&
            `BAA:${player.tempBuff.avoidAttack}`}{" "}
        </span>
        <span>
          {player.fullCombatBuff.attackBuff > 0 &&
            `BAB: ${player.fullCombatBuff.attackBuff}`}{" "}
        </span>

        <div>
          <span className="paragraph-player">
            {player.fullCombatBuff.blockBuff > 0 &&
              `DEB: ${player.fullCombatBuff.blockBuff}`}{" "}
            {player.debuff.vulnerable > 0 && `DV: ${player.debuff.vulnerable}`}{" "}
            {player.debuff.weak > 0 && `DW: ${player.debuff.weak}`}{" "}
            {player.debuff.poison > 0 && `DP: ${player.debuff.poison}`}{" "}
            {player.debuff.distribDown > 0 &&
              `DD: ${player.debuff.distribDown}`}
          </span>
        </div>
      </div>
    </div>
  );
}
