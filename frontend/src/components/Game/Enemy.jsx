/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from "react";
import "../../assets/css/Game/Enemy.css";
import BLOCK from "../../assets/img/Board/Block.webp";

export default function Enemy({ enemy }) {
  return (
    <div className="enemy-stat">
      <div className="block-enemy">
        <i className="fa-solid fa-shield buff" />
        {enemy.tempBuff.block > 0 && ` ${enemy.tempBuff.block}  `}
      </div>
      <div className="entoure-barredevie-enemy">
        <div
          className="vie-enemy"
          style={{
            width: `${(enemy.currentLife / enemy.maxLife) * 100}%`,
          }}
        />
        <div className="vie-text-enemy">
          {enemy.currentLife} / {enemy.maxLife}
        </div>
      </div>

      <div>
        <span>
          {enemy.tempBuff.avoidAttack > 0 && `${enemy.tempBuff.avoidAttack}`}{" "}
        </span>
        <span>
          {enemy.fullCombatBuff.attackBuff > 0 &&
            `BAB: ${enemy.fullCombatBuff.attackBuff}`}{" "}
        </span>

        <div>
          <span>
            <i className="fa-duotone fa-axe-battle buff" />{" "}
            {enemy.fullCombatBuff.defenseBuff > 0 &&
              `DEB: ${enemy.fullCombatBuff.blockBuff}`}{" "}
            {enemy.debuff.vulnerable > 0 && `DV: ${enemy.debuff.vulnerable}`}{" "}
            {enemy.debuff.weak > 0 && `DW: ${enemy.debuff.weak}`}{" "}
            {enemy.debuff.poison > 0 && `DP: ${enemy.debuff.poison}`}
          </span>
        </div>
      </div>
    </div>
  );
}
