/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
import React from "react";
import PropTypes from "prop-types";
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

export default function Player({ player, playerLifeChange }) {
  return (
    <div className="player-stat">
      <div className="Top-Player">
        <div className="block-player">
          <FontAwesomeIcon
            icon="fa-solid fa-shield-halved"
            fixedWidth={false}
            size="2x"
            title={`${player.tempBuff.block.toString()} points de Block`}
          />
          {player.tempBuff.block > 0 && `${player.tempBuff.block} `}
        </div>
        <div
          className={
            playerLifeChange > 0 ? "playerLifeChange" : "playerinferieur"
          }
        >
          {" "}
          <span>
            <FontAwesomeIcon
              icon="fa-solid fa-heart"
              title="Derniers dégats subis ou derniers soins reçus"
            />
          </span>
          {playerLifeChange}
        </div>
      </div>
      <div className="entoure-barredevie-player">
        <div className="vie-text-player">
          {player.currentLife} / {player.maxLife}
        </div>
        <div
          className="vie-player"
          style={{
            width: `${(player.currentLife / player.maxLife) * 100}%`,
          }}
        />
      </div>

      <div>
        {player.tempBuff.avoidAttack > 0 && (
          <span className="avoidAttack">
            <FontAwesomeIcon
              icon="fa-solid fa-person-running"
              fixedWidth={false}
              size="1x"
              title="Evite la prochaine attaque"
            />
            {player.tempBuff.avoidAttack > 0 &&
              `${player.tempBuff.avoidAttack}`}{" "}
          </span>
        )}
        {player.fullCombatBuff.attackBuff > 0 && (
          <span className="attackBuff">
            <FontAwesomeIcon
              icon="fa-solid fa-hand-fist"
              fixedWidth={false}
              size="1x"
              title={`${player.fullCombatBuff.attackBuff.toString()} points d'attaque supplémentaires`}
            />
            {player.fullCombatBuff.attackBuff > 0 &&
              `${player.fullCombatBuff.attackBuff}`}{" "}
          </span>
        )}
        {player.fullCombatBuff.blockBuff > 0 && (
          <span className="blockBuff">
            <FontAwesomeIcon
              icon="fa-solid fa-shield"
              fixedWidth={false}
              size="1x"
              title={`${player.fullCombatBuff.blockBuff.toString()} points de Block supplémentaires`}
            />
            {player.fullCombatBuff.blockBuff > 0 &&
              `${player.fullCombatBuff.blockBuff}`}{" "}
          </span>
        )}

        <div>
          {player.debuff.vulnerable > 0 && (
            <span className="vulnerable">
              <FontAwesomeIcon
                icon="fa-solid fa-crosshairs"
                title="Subi 25% de dégats supplémentaires"
              />
              {player.debuff.vulnerable > 0 && `${player.debuff.vulnerable}`}{" "}
            </span>
          )}
          {player.debuff.weak > 0 && (
            <span className="weak">
              <FontAwesomeIcon
                icon="fa-solid fa-person-cane"
                title="dégats réduits de 50%"
              />
              {player.debuff.weak > 0 && `${player.debuff.weak}`}{" "}
            </span>
          )}
          {player.debuff.poison > 0 && (
            <span className="poison">
              <FontAwesomeIcon
                icon="fa-solid fa-skull-crossbones"
                title="Subi des dégats de poison à chaque début de tour"
              />
              {player.debuff.poison > 0 && `${player.debuff.poison}`}{" "}
            </span>
          )}
          {player.debuff.distribDown > 0 && (
            <span className="distribDown">
              <FontAwesomeIcon
                icon="fa-solid fa-hand-point-down"
                title="Reçoit 1 carte de moins au début du tour"
              />
              {player.debuff.distribDown > 0 && `${player.debuff.distribDown}`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

Player.propTypes = {
  player: PropTypes.shape({
    currentLife: PropTypes.number,
    maxLife: PropTypes.number,
    currentEnergy: PropTypes.number,
    tempBuff: PropTypes.shape({
      block: PropTypes.number,
      avoidAttack: PropTypes.number,
    }),
    fullCombatBuff: PropTypes.shape({
      attackBuff: PropTypes.number,
      blockBuff: PropTypes.number,
    }),
    fullGameBuff: PropTypes.shape({
      magicBuff: PropTypes.number,
      physBuff: PropTypes.number,
      defenseBuff: PropTypes.number,
      poisonBuff: PropTypes.number,
      healBuff: PropTypes.number,
    }),
    debuff: PropTypes.shape({
      vulnerable: PropTypes.number,
      weak: PropTypes.number,
      poison: PropTypes.number,
      distribDown: PropTypes.number,
    }),
    drawCard: PropTypes.number,
    startDistrib: PropTypes.number,
  }),
  playerLifeChange: PropTypes.number,
};

Player.defaultProps = {
  player: {
    currentLife: 0,
    maxLife: 0,
    currentEnergy: 0,
    tempBuff: {
      block: 0,
      avoidAttack: 0,
    },
    fullCombatBuff: {
      attackBuff: 0,
      blockBuff: 0,
    },
    fullGameBuff: {
      magicBuff: 0,
      physBuff: 0,
      defenseBuff: 0,
      poisonBuff: 0,
      healBuff: 0,
    },
    debuff: {
      vulnerable: 0,
      weak: 0,
      poison: 0,
      distribDown: -1,
    },
    drawCard: 0,
    startDistrib: 0,
  },
  playerLifeChange: 0,
};
