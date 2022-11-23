import PropTypes from "prop-types";
import React, { useState, useRef, useEffect } from "react";
import GameCard from "./GameCard";
import backCard from "../../assets/img/Game/back.png";
import "../../assets/css/Game/Deck.css";

export default function Deck({
  champions,
  startPlayerTurn,
  setStartPlayerTurn,
  playerStats,
  setPlayerStats,
  enemyStats,
  setEnemyStats,
  render,
  setRender,
}) {
  // Les States

  ///Premierer distribution à chaque nouveau LvL
  const firstCard = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // default deck
  firstCard.sort(() => Math.random() - 0.5); // melange le deck default
  let numberDistribStart = playerStats.startDistrib;
  console.log(`playerstatsdebuff = >> ${playerStats.debuff.distribDown}`)
  if (playerStats.debuff.distribDown >= 0){
    numberDistribStart = numberDistribStart - 1;
    console.log(`Carte de depart à deistribuer = >> ${numberDistribStart}`)
  }
  const [deck, setDeck] = useState({
    drawPile: [...firstCard.splice(numberDistribStart)],
    hand: [...firstCard.splice(0, numberDistribStart)],
    cimetery: [],
  });
  /////// Fin distribution audepart ////

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
        deck.drawPile.length - numberDistribStart,
        deck.drawPile.length
      );
      deck.drawPile.splice(deck.drawPile.length - numberDistribStart, deck.drawPile.length);
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

      /// // Prendre de drawPile le nombre de carte == à la valeur de drawCard et les mettre dans Hand
      setCardManager({
        index: -1,
        isPlayed: false,
        actionDone: false,
      });
    }
    // setDeck(deck);
    setHand(deck.hand);
  }, [cardManager]);

  // Condition 1 (Nouveau Tour) => If startPlayerTurn
  useEffect(() => {
    // console.log(deck);
    if (startPlayerTurn) {
      // Si DrawPile n'est pas suffisant < 5
      if (deck.drawPile.length < numberDistribStart) {
        deck.cimetery.unshift(...deck.hand);
        redistribution();
      } else {
        // startPlayerTurn = false
        deck.cimetery.unshift(...deck.hand);
        deck.hand = deck.drawPile.slice(
          deck.drawPile.length - numberDistribStart,
          deck.drawPile.length
        );
        deck.drawPile.splice(deck.drawPile.length - numberDistribStart, deck.drawPile.length);
      }
      setHand(deck.hand);
      setDeck(deck);
      setStartPlayerTurn(false);
    }
  }, [startPlayerTurn]);
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
  // console.log(deck);
  return (
    <>
      <div>
        <div
          className="drag-drop-zone"
          onDrop={(e) => dropEnnemy(e)}
          onDragOver={(e) => allowDrop(e)}
        >
        
        </div>
      </div>
      <div className="game-bottom">
        <div className="dumpcard">
          <div className="drawpile">
            <div className="infoparent">
              <p className="infodumpcard">{deck.drawPile.length}</p>
              <img src={backCard} alt="Deck" draggable="false" />
            </div>
          </div>
          <div className="cimetery">
            <div className="infoparent">
              <p className="infodumpcard">{deck.cimetery.length}</p>
              <img src={backCard} alt="Cemetery" draggable="false" />
            </div>
          </div>
        </div>
        <div className="hand">
          {champions &&
            hand.map((item, index) => {
              // Check Mana
              const manaCost = (champ) => {
                // console.log(cardChampion.info.difficulty);
                switch (champ) {
                  case 0:
                  case 1:
                  case 2:
                  case 3:
                    return "0";
                  case 4:
                  case 5:
                  case 6:
                    return "1";
                  case 7:
                  case 8:
                    return "2";
                  case 9:
                  case 10:
                    return "3";
                  default:
                    return "TBD";
                }
              };
              const cardEnergy = parseInt(
                manaCost(champions[item].champion.info.difficulty),
                10
              );
              return (
                <div
                  className={`Card-Zone draggable${
                    cardEnergy > playerStats.currentEnergy ? " manared" : ""
                  }`}
                  key={champions[item].champion.id}
                  style={{
                    /* margin: "20px auto",
                  textAlign: "center",
                  fontSize: "40px", */
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
                  draggable={cardEnergy <= playerStats.currentEnergy}
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
                    setRender={setRender}
                    render={render}
                  />
                </div>
              );
            })}
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
  startPlayerTurn: PropTypes.bool,
  setStartPlayerTurn: PropTypes.func,
  setRender: PropTypes.func,
  render: PropTypes.bool,
};

Deck.defaultProps = {
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
  startPlayerTurn: false,
  setStartPlayerTurn: () => {},
  setRender: () => {},
  render: false,
};
