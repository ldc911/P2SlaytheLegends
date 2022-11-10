/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import api from "../../services/api";

export default function Draft() {
  // const [isMounting, setIsMounting] = useState(true);
  // const [champions, setChampions] = useState([]);

  // // appel Service API
  // useEffect(() => {
  //   api.getChampions().then((json) => {
  //     setChampions(json.data);
  //     setIsMounting(false);
  //   });
  // }, []);

  // Shuffle all cards "champion"

  // 12 tours de 3 cards
  let deckdepart = [];

  // Shuffle deckdepart

  // return
  deckdepart = {
    0: [champion[0]],
    1: [champion[1]],
    2: [champion[2]],
    3: [champion[3]],
    4: [champion[4]],
    5: [champion[5]],
    6: [champion[6]],
    7: [champion[7]],
    8: [champion[8]],
    9: [champion[9]],
    10: [champion[10]],
    11: [champion[11]],
  };
  return deckdepart;
}
