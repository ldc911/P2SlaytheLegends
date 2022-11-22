/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import "../../assets/css/Game/player.css";
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
  faHandPointDown,
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
  faHandPointDown,
  faHeart
);

export default function player({ player, playerLifeChange }) {
  return (
    <div className="player-stat">
      <div
        className={
          playerLifeChange > 0 ? "playerLifeChange" : "playerinferieur"
        }
      >
        {" "}
        <span>
          <FontAwesomeIcon icon="fa-solid fa-heart" />
        </span>
        {playerLifeChange}
      </div>
      <div className="block-player">
        <FontAwesomeIcon
          icon="fa-solid fa-shield-halved"
          fixedWidth={false}
          size="2x"
          title={`${player.tempBuff.block.toString()} points de Block`}
        />
        {player.tempBuff.block > 0 && `${player.tempBuff.block} `}
      </div>
      <div className="entoure-barredevie-player">
        <div
          className="vie-player"
          style={{
            width: `${(player.currentLife / player.maxLife) * 100}%`,
          }}
        />
        <div className="inLineBlockPlayer">
          <div className="vie-text-player">
            {player.currentLife} / {player.maxLife}
          </div>
        </div>
      </div>

      <div>
        <span className="avoidAttack">
          <FontAwesomeIcon
            icon="fa-solid fa-person-running"
            fixedWidth={false}
            size="1x"
            title={`${player.tempBuff.avoidAttack.toString()} points d'attaque`}
          />
          {player.tempBuff.avoidAttack > 0 && `${player.tempBuff.avoidAttack}`}{" "}
        </span>
        <span className="attackBuff">
          <FontAwesomeIcon
            icon="fa-solid fa-hand-fist"
            fixedWidth={false}
            size="1x"
            title={`${player.fullCombatBuff.attackBuff.toString()} points de Buff`}
          />
          {player.fullCombatBuff.attackBuff > 0 &&
            `${player.fullCombatBuff.attackBuff}`}{" "}
        </span>

        <div>
          <span className="blockBuff">
            <FontAwesomeIcon
              icon="fa-solid fa-shield"
              fixedWidth={false}
              size="1x"
              title={`${player.fullCombatBuff.blockBuff.toString()} points de Buff`}
            />
            {player.fullCombatBuff.blockBuff > 0 &&
              `${player.fullCombatBuff.blockBuff}`}{" "}
          </span>
          <span className="vulnerable">
            <FontAwesomeIcon icon="fa-solid fa-crosshairs" />
            {player.debuff.vulnerable > 0 && `${player.debuff.vulnerable}`}{" "}
          </span>
          <span className="weak">
            <FontAwesomeIcon icon="fa-solid fa-person-cane" />
            {player.debuff.weak > 0 && `${player.debuff.weak}`}{" "}
          </span>
          <span className="poison">
            <FontAwesomeIcon icon="fa-solid fa-skull-crossbones" />
            {player.debuff.poison > 0 && `${player.debuff.poison}`}{" "}
          </span>
          <span className="distribDown">
            <FontAwesomeIcon icon="fa-solid fa-hand-point-down" />
            {player.debuff.distribDown > 0 && `${player.debuff.distribDown}`}
          </span>
        </div>
      </div>
    </div>
  );
}
