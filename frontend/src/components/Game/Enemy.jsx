/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from "react";
import "../../assets/css/Game/Enemy.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHalved,
  faSkullCrossbones,
  faPersonRunning,
  faHandFist,
  faShield,
  faCrosshairs,
  faPersonCane,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faShieldHalved,
  faSkullCrossbones,
  faPersonRunning,
  faHandFist,
  faShield,
  faCrosshairs,
  faPersonCane,
  faHeart
);

export default function Enemy({ enemy, enemyLifeChange }) {
  return (
    <div className="enemy-stat">
      <div
        className={enemyLifeChange > 0 ? "enemyLifeChange" : "enemyinferieur"}
      >
        <span>
          <FontAwesomeIcon icon="fa-solid fa-heart" />
        </span>
        {enemyLifeChange}
      </div>
      <div className="block-enemy">
        {" "}
        <FontAwesomeIcon
          icon="fa-solid fa-shield-halved"
          fixedWidth={false}
          size="2x"
          title={`${enemy.tempBuff.block.toString()} points de Block`}
        />
        {enemy.tempBuff.block > 0 && `${enemy.tempBuff.block}  `}
      </div>
      <div className="entoure-barredevie-enemy">
        <div
          className="vie-enemy"
          style={{
            width: `${(enemy.currentLife / enemy.maxLife) * 100}%`,
          }}
        />
        <div className="inLineBlockEnemy">
          <div className="vie-text-enemy">
            {enemy.currentLife} / {enemy.maxLife}
          </div>
          {/* <div className="vidediv"></div> */}
        </div>
      </div>

      <div>
        <span className="avoidAttack">
          {" "}
          <FontAwesomeIcon
            icon="fa-solid fa-person-running"
            fixedWidth={false}
            size="1x"
            title={`${enemy.tempBuff.avoidAttack.toString()} points d'attaque`}
          />
          {enemy.tempBuff.avoidAttack > 0 && `${enemy.tempBuff.avoidAttack}`}{" "}
        </span>

        <span className="AttackBuff">
          {" "}
          <FontAwesomeIcon
            icon="fa-solid fa-hand-fist"
            fixedWidth={false}
            size="1x"
            title={`${enemy.fullCombatBuff.attackBuff.toString()} points de Buff`}
          />
          {enemy.fullCombatBuff.attackBuff > 0 &&
            `${enemy.fullCombatBuff.attackBuff}`}{" "}
        </span>

        <div>
          <span>
            <span className="blockBuff">
              {" "}
              <FontAwesomeIcon
                icon="fa-solid fa-shield"
                fixedWidth={false}
                size="1x"
                title={`${enemy.fullCombatBuff.blockBuff.toString()} points de Buff`}
              />
              {enemy.fullCombatBuff.blockBuff > 0 &&
                ` ${enemy.fullCombatBuff.blockBuff}`}{" "}
            </span>
            <span className="vulnerable">
              {" "}
              <FontAwesomeIcon icon="fa-solid fa-crosshairs" />
              {enemy.debuff.vulnerable > 0 && `${enemy.debuff.vulnerable}`}{" "}
            </span>
            <span className="weak">
              <FontAwesomeIcon icon="fa-solid fa-person-cane" />
              {enemy.debuff.weak > 0 && `${enemy.debuff.weak}`}{" "}
            </span>
            <span className="poison">
              {" "}
              <FontAwesomeIcon icon="fa-solid fa-skull-crossbones" />
              {enemy.debuff.poison > 0 && `${enemy.debuff.poison}`}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
