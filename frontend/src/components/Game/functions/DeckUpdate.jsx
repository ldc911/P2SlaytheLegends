/* eslint-disable no-unused-vars */
// import { useState, useEffect } from "react";

export default function Draft(deck, idCardPlayed, drawCard, startPlayerTurn) {
  // Condition 1 (Nouveau Tour)
  // If startPlayerTurn
  /// / RestHand(carte restantes) va dans cimetery(defausse) and DrawPile les 5 dernieres du tableau vont dans Hand (main du joeur)

  // Condition 2 (Joue une carte)
  /// La carte jouer (idCardPlayed) part dans cimetery et disparait de Hand
  /// / Si la carte est une carte pioche (drawCard > 0)
  /// // Prendre de drawPile le onmbre de carte == à la valeur de drawCard et les mettre dans Hand

  /// Redistribution dans le cas ou il manque des cartes dans drawPile
  // Cimetery passe dans drawPile et Shuffle de drawPile puis passer le nombre de cartes dans Hand

  // Return l'object
  const newDeck = {
    drawPile: [1, 2, 3, 4, 5, 6, 7],
    hand: [8, 9, 10],
    cimetery: [11, 12],
  };
  return newDeck;
}
