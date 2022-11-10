import Board from "../components/Game/Board";
import Deck from "../components/Game/Deck";

export default function Game() {
  return (
    <div>
      <Board />
      <Deck />
      {/* {modalOpen && (
      <ModalLib setOpenModal={setModalOpen} modalChamp={modalChamp} />
    )} */}
    </div>
  );
}
