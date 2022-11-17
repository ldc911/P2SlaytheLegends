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
        if (deck.drawPile.length < playerStats.drawCard) redistribution();
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
        setPlayerStats({ playerStats: { drawCard: 0 } });
      }
      setDeck(deck);
      setHand(deck.hand);
      /// // Prendre de drawPile le onmbre de carte == à la valeur de drawCard et les mettre dans Hand
      setCardManager({
        index: -1,
        isPlayed: false,
        actionDone: false,
      });
    }
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

  return (
    <>
      <div>
        <div
          className="drag-drop-zone"
          onDrop={(e) => dropEnnemy(e)}
          onDragOver={(e) => allowDrop(e)}
        >
          <p>Attack le mechant !</p>
        </div>
      </div>
      <div className="game-bottom">
        <div>
          <img src={backCard} width="auto" alt="Deck" />
        </div>
        {hand &&
          hand.map((item, index) => {
            return (
              <div
                key={champions[item].champion.id}
                style={{
                  backgroundColor: "lightblue",
                  margin: "20px auto",
                  textAlign: "center",
                  fontSize: "40px",
                  animate: false,
                  sticky: false,
                  dragx: true,
                  dragy: true,
                  rotate: false,
                  resort: true,
                  scale: false,
                }}
                onDragStart={(e) => dragStart(e, index)}
                onDragEnter={(e) => dragEnter(e, index)}
                onDragEnd={drop}
                draggable
              >
                <GameCard
                  key={champions[item].champion.id}
                  cardChampion={champions[item].champion}
                  cardIndex={item}
                  cardManager={cardManager}
                  playerStats={playerStats}
                  enemyStats={enemyStats}
                  setPlayerStats={setPlayerStats}
                  setEnemyStats={setEnemyStats}
                  setCardManager={setCardManager}
                />
              </div>
            );
          })}
        <div>
          <img src={backCard} width="auto" alt="Cemetery" />
        </div>
      </div>
    </>
  );
}

Deck.propTypes = {
  champions: PropTypes.shape({
    cardChampion: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      info: PropTypes.shape({
        difficulty: PropTypes.number,
      }),
    }),
  }),
};
Deck.defaultProps = {
  champions: {
    cardChampion: {
      id: "",
      tags: [""],
      info: {
        difficulty: 0,
      },
      name: "",
    },
  },
};
Deck.propTypes = {
  startPlayerTurn: PropTypes.bool,
  cardChampion: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    info: PropTypes.shape({
      difficulty: PropTypes.number,
    }),
  }),
  cardManager: PropTypes.shape({
    index: PropTypes.number,
    isPlayed: PropTypes.bool,
    actionDone: PropTypes.bool,
  }),
  playerStats: PropTypes.shape({
    currentLife: PropTypes.number,
    maxLife: PropTypes.number,
    currentEnergy: PropTypes.number,
    maxEnergy: PropTypes.number,
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
    drawCard: PropTypes.number,
  }),
  setPlayerStats: PropTypes.func,
  enemyStats: PropTypes.shape({
    currentLife: PropTypes.number,
    maxLife: PropTypes.number,
    resistPhys: PropTypes.number,
    resistMag: PropTypes.number,
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
  setEnemyStats: PropTypes.func,
};

Deck.defaultProps = {
  startPlayerTurn: false,
  cardChampion: {
    id: "",
    tags: [""],
    info: {
      difficulty: 0,
    },
    name: "",
  },
  cardManager: {
    index: -1,
    isPlayed: false,
    actionDone: false,
  },
  playerStats: {
    currentLife: 100,
    maxLife: 100,
    currentEnergy: 3,
    maxEnergy: 3,
    tempBuff: {
      block: 0,
      avoidAttack: 0,
    },
    fullCombatBuff: {
      attackBuff: 0,
      blockBuff: 0,
    },
    debuff: {
      vulnerable: 0,
      weak: 0,
      poison: 0,
    },
    drawCard: 0,
  },
  setPlayerStats: () => {},
  enemyStats: {
    currentLife: 1000,
    maxLife: 1000,
    resistPhys: 0,
    resistMag: 0,
    tempBuff: {
      block: 0,
      avoidAttack: 0,
    },
    fullCombatBuff: {
      attackBuff: 0,
      blockBuff: 0,
    },
    debuff: {
      vulnerable: 0,
      weak: 0,
      poison: 0,
    },
  },
  setEnemyStats: () => {},
};
