import PropTypes from "prop-types";
import React, { useState, useRef, useEffect } from "react";
import GameCard from "./GameCard";
import backCard from "../../assets/img/Card/card.png";
import "../../assets/css/Game.css";

export default function Deck({
  champions,
  startPlayerTurn,
  playerStats,
  setPlayerStats,
  enemyStats,
  setEnemyStats,
}) {
  // Les States
  const [deck, setDeck] = useState({
    drawPile: [0, 1, 2, 3, 4, 5, 6],
    hand: [7, 8, 9, 10, 11],
    cimetery: [],
  });
  const [cardManager, setCardManager] = useState({
    index: -1,
    isPlayed: false,
    actionDone: false,
  });

  // Action et Drag and Drop functions //
  const dragItem = useRef();
  const dragOverItem = useRef();
  /// La Main hand
  const [hand, setHand] = useState(deck.hand);

  /// / Function de gestion des cartes ////
  const redistribution = () => {
    deck.cimetery.sort(() => Math.random() - 0.5);
    deck.drawPile.unshift(...deck.cimetery);
    deck.cimetery = [];
    if (playerStats.drawCard === 0) {
      deck.hand = deck.drawPile.slice(
        deck.drawPile.length - 5,
        deck.drawPile.length
      );
      deck.drawPile.splice(deck.drawPile.length - 5, deck.drawPile.length);
    }
  };

  // useeffect
  useEffect(() => {
    if (cardManager.index > -1 && cardManager.actionDone) {
      /// idCardPlayed && ( // Condition 2 (Joue une carte)
      deck.hand = deck.hand.filter((item) => item !== cardManager.index); /// La carte jouer (idCardPlayed) part dans cimetery et disparait de Hand
      deck.cimetery.push(cardManager.index);

      if (playerStats.drawCard > 0) {
        /// / Si la carte est une carte pioche (drawCard > 0)
        if (deck.drawPile.length < playerStats.drawCard) {
          /// ICI IL MANQUE DU CODE
          redistribution();
        }
        deck.hand.unshift(
          ...deck.drawPile.slice(
            deck.drawPile.length - playerStats.drawCard,
            deck.drawPile.length
          )
        );
        deck.drawPile.splice(
          deck.drawPile.length - playerStats.drawCard,
          deck.drawPile.length
        );
        setPlayerStats({ ...playerStats, drawCard: 0 });
      }

      /// // Prendre de drawPile le onmbre de carte == à la valeur de drawCard et les mettre dans Hand
      setCardManager({
        index: -1,
        isPlayed: false,
        actionDone: false,
      });
    }
    setDeck(deck);
    setHand(deck.hand);
  }, [cardManager]);

  // Condition 1 (Nouveau Tour) => If startPlayerTurn
  if (startPlayerTurn) {
    // Si DrawPile n'est pas suffisant < 5
    if (deck.drawPile.length < 5) {
      deck.cimetery.unshift(...deck.hand);
      redistribution();
    } else {
      // startPlayerTurn = false
      deck.cimetery.unshift(...deck.hand);
      deck.hand = deck.drawPile.slice(
        deck.drawPile.length - 5,
        deck.drawPile.length
      );
      deck.drawPile.splice(deck.drawPile.length - 5, deck.drawPile.length);
    }
  }
  /// / FIN de la Function de gestion des cartes ////

  /// Les fonctions drag and drop
  const dragStart = (e, position) => {
    dragItem.current = position;
  };
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };
  const drop = () => {
    const copyListItems = [...hand];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setHand(copyListItems);
  };
  const allowDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const dropEnnemy = (e) => {
    e.preventDefault();
    const idCardPlayed = deck.hand[dragItem.current];
    // declenchement cardManager
    setCardManager({
      index: idCardPlayed,
      isPlayed: true,
      actionDone: false,
    });
  };
  /// Fin des actions et Drag and drop

export default function Draft() {
  return (
    <>
      <div />
      <div />
      <div />
    </>
  );
}
