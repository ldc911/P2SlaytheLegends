/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import PropTypes from "prop-types";
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
  faDumbbell,
  faShieldVirus,
  faVialCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faShieldHalved,
  faSkullCrossbones,
  faPersonRunning,
  faHandFist,
  faShield,
  faCrosshairs,
  faPersonCane,
  faHeart,
  faDumbbell,
  faShieldVirus,
  faVialCircleCheck
);

export default function Enemy({ enemy, enemyLifeChange }) {
  return (
    <div className="enemy-stat">
      <div className="Top-Enemy">
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
        <div
          className={enemyLifeChange > 0 ? "enemyLifeChange" : "enemyinferieur"}
        >
          <span>
            <FontAwesomeIcon
              icon="fa-solid fa-heart"
              title="Derniers dégats subis ou derniers soins reçus"
            />
          </span>
          {enemyLifeChange}
        </div>
      </div>
      <div className="entoure-barredevie-enemy">
        <div className="vie-text-enemy">
          {enemy.currentLife} / {enemy.maxLife}
        </div>
        <div
          className="vie-enemy"
          style={{
            width: `${(enemy.currentLife / enemy.maxLife) * 100}%`,
          }}
        />
      </div>

      <div>
        {enemy.tempBuff.avoidAttack > 0 && (
          <span className="avoidAttack">
            {" "}
            <FontAwesomeIcon
              icon="fa-solid fa-person-running"
              fixedWidth={false}
              size="1x"
              title="Evite la prochaine attaque"
            />
            {enemy.tempBuff.avoidAttack > 0 && `${enemy.tempBuff.avoidAttack}`}{" "}
          </span>
        )}

        {enemy.fullCombatBuff.attackBuff > 0 && (
          <span className="AttackBuff">
            {" "}
            <FontAwesomeIcon
              icon="fa-solid fa-hand-fist"
              fixedWidth={false}
              size="1x"
              title={`${enemy.fullCombatBuff.attackBuff.toString()} points d'attaque supplémentaires`}
            />
            {enemy.fullCombatBuff.attackBuff > 0 &&
              `${enemy.fullCombatBuff.attackBuff}`}{" "}
          </span>
        )}
        {enemy.fullCombatBuff.blockBuff > 0 && (
          <span className="blockBuff">
            {" "}
            <FontAwesomeIcon
              icon="fa-solid fa-shield"
              fixedWidth={false}
              size="1x"
              title={`${enemy.fullCombatBuff.blockBuff.toString()} points de Block supplémentaires`}
            />
            {enemy.fullCombatBuff.blockBuff > 0 &&
              ` ${enemy.fullCombatBuff.blockBuff}`}{" "}
          </span>
        )}
        {enemy.resistPhys > 0 && (
          <span className="resist-phys">
            {" "}
            <FontAwesomeIcon
              icon="fa-solid fa-dumbbell"
              fixedWidth={false}
              size="1x"
              title="Réduit les dégats physiques reçus"
            />
            {enemy.resistPhys > 0 && ` ${enemy.resistPhys}`}{" "}
          </span>
        )}
        {enemy.resistMag > 0 && (
          <span className="resist-magic">
            {" "}
            <FontAwesomeIcon
              icon="fa-solid fa-shield-virus"
              fixedWidth={false}
              size="1x"
              title="Réduit les dégats magiques reçus"
            />
            {enemy.resistMag > 0 && ` ${enemy.resistMag}`}{" "}
          </span>
        )}
        {enemy.resistPoison > 0 && (
          <span className="resist-poison">
            {" "}
            <FontAwesomeIcon
              icon="fa-solid fa-vial-circle-check"
              fixedWidth={false}
              size="1x"
              title="Réduit les dégats de poison reçus"
            />
            {enemy.resistPoison > 0 && ` ${enemy.resistPoison}`}{" "}
          </span>
        )}
        <div>
          <span>
            {enemy.debuff.vulnerable > 0 && (
              <span className="vulnerable">
                {" "}
                <FontAwesomeIcon
                  icon="fa-solid fa-crosshairs"
                  title="Subi 25% de dégats supplémentaires"
                />
                {enemy.debuff.vulnerable > 0 && `${enemy.debuff.vulnerable}`}{" "}
              </span>
            )}
            {enemy.debuff.weak > 0 && (
              <span className="weak">
                <FontAwesomeIcon
                  icon="fa-solid fa-person-cane"
                  title="dégats réduits de 50%"
                />
                {enemy.debuff.weak > 0 && `${enemy.debuff.weak}`}{" "}
              </span>
            )}
            {enemy.debuff.poison > 0 && (
              <span className="poison">
                {" "}
                <FontAwesomeIcon
                  icon="fa-solid fa-skull-crossbones"
                  title="Subi des dégats de poison à chaque début de tour"
                />
                {enemy.debuff.poison > 0 && `${enemy.debuff.poison}`}
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

Enemy.propTypes = {
  enemy: PropTypes.shape({
    currentLife: PropTypes.number,
    maxLife: PropTypes.number,
    resistPhys: PropTypes.number,
    resistMag: PropTypes.number,
    resistPoison: PropTypes.number,
    tempBuff: PropTypes.shape({
      block: PropTypes.number,
      avoidAttack: PropTypes.number,
    }),
    fullCombatBuff: PropTypes.shape({
      attackBuff: PropTypes.number,
      blockBuff: PropTypes.number,
    }),
    debuff: PropTypes.shape({
      vulnerable: PropTypes.number,
      weak: PropTypes.number,
      poison: PropTypes.number,
    }),
  }),
  enemyLifeChange: PropTypes.number,
};

Enemy.defaultProps = {
  enemy: {
    currentLife: 200,
    maxLife: 200,
    resistPhys: 0,
    resistMag: 0,
    resistPoison: 0,
    tempBuff: { block: 0, avoidAttack: 0 },
    fullCombatBuff: { attackBuff: 0, blockBuff: 0 },
    debuff: { vulnerable: 0, weak: 0, poison: 0 },
  },
  enemyLifeChange: 0,
};
