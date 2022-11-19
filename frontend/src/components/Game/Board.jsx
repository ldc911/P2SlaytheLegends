/* eslint-disable react/prop-types */
// import PropTypes from "prop-types";
import React from "react";

export default function Board({ playerStats, enemyStats, enemyActions }) {
  return (
    <div className="stats-wrapper">
      <div>
        <p>
          Boss: Life: {enemyStats.currentLife} / vulnerable:{" "}
          {enemyStats.debuff.vulnerable} / weak: {enemyStats.debuff.weak} /
          poison: {enemyStats.debuff.poison} / Next Action:{" "}
          {enemyActions.attack}
        </p>
      </div>
      <div>
        <p>
          Player: Life: {playerStats.currentLife} / Block:{" "}
          {playerStats.tempBuff.block} / dodge:{" "}
          {playerStats.tempBuff.avoidAttack} / Attack:{" "}
          {playerStats.fullCombatBuff.attackBuff} / Block+:{" "}
          {playerStats.fullCombatBuff.blockBuff} / Energy:{" "}
          {playerStats.currentEnergy} / {playerStats.maxEnergy}
        </p>
      </div>
    </div>
  );
}
