import React, { useState, useRef, useEffect } from "react";
import "../assets/css/Game.css";
import backCard from "@assets/img/Card/card.png";

export default function Game() {
  const dragItem = useRef();
  const dragOverItem = useRef();
  /// HAND
  const [list, setList] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
  ]);

  const [normalAttack, setnormalAttack] = useState("");
  const [idPlayedCard, setIdPlayedCard] = useState("");
  const [endTurn, setEndturn] = useState(false);

  useEffect(() => {
    /// Fin de tour
    if (endTurn) {
      setnormalAttack("endTurn");
    } else {
      // Si pas la fin du tour
      setnormalAttack("normalAttack");
    }
  }, [idPlayedCard, endTurn, normalAttack]);

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };
  const drop = () => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
  };

  const allowDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const dropEnnemy = (e) => {
    e.preventDefault();
    setIdPlayedCard(dragItem.current);
  };

  return (
    <>
      <div>
        <div
          className="drag-drop-zone"
          onDrop={(e) => dropEnnemy(e)}
          onDragOver={(e) => allowDrop(e)}
        >
          <p>Attack le mechant !</p>
          <button type="button" onClick={() => setEndturn(true)}>
            Fin de Tour
          </button>
        </div>
      </div>
      <div className="game-bottom">
        <div>
          <img src={backCard} width="auto" alt="Deck" />
        </div>
        {list &&
          list.map((item) => {
            const { id } = item;
            return (
              <div
                style={{
                  backgroundColor: "lightblue",
                  margin: "20px auto",
                  textAlign: "center",
                  fontSize: "40px",
                }}
                onDragStart={(e) => dragStart(e, id)}
                onDragEnter={(e) => dragEnter(e, id)}
                onDragEnd={drop}
                key={id}
                draggable
              >
                {item}
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
