/* eslint-disable react/prop-types */
// import PropTypes from "prop-types";
import React from "react";

export default function Board({
  playerStats,
  enemyStats,
  enemyActions,
  setEndPlayerTurn,
  fightTurns,
  playerLifeChange,
}) {
  return (
    <div className="stats-wrapper">
      <div>
        <button type="button" onClick={() => setEndPlayerTurn(true)}>
          fin de tour
        </button>
        <div>Turn: {fightTurns}</div>
        <p>
          Boss: Life: {enemyStats.currentLife} / vulnerable:{" "}
          {enemyStats.debuff.vulnerable} / weak: {enemyStats.debuff.weak} /
          poison: {enemyStats.debuff.poison} / Next Action:{" "}
          {enemyActions.displayedActions} / Block: {enemyStats.tempBuff.block}
        </p>
      </div>
      <div>
        <p>
          Player: Life: {playerStats.currentLife} / Block:{" "}
          {playerStats.tempBuff.block} / dodge:{" "}
          {playerStats.tempBuff.avoidAttack} / Attack:{" "}
          {playerStats.fullCombatBuff.attackBuff} / Block+:{" "}
          {playerStats.fullCombatBuff.blockBuff} / Energy:{" "}
          {playerStats.currentEnergy} / {playerStats.maxEnergy} / vulne:{" "}
          {playerStats.debuff.vulnerable} / weak: {playerStats.debuff.weak} /
          poison: {playerStats.debuff.poison} / distrib down:{" "}
          {playerStats.debuff.distribDown} / last heal or damage:
          {playerLifeChange}
        </p>
      </div>
    </div>
  );
}
