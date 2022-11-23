/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../assets/css/Library/ModalLib.css";
import apiChamp from "../../services/apiChamp";

function ModalLib({ setOpenModal, modalChamp }) {
  const [champion, setChampion] = useState([]);
  const [isMounting, setIsMounting] = useState(true);
  const [champLore, setChampLore] = useState([]);
  // appel Service API
  useEffect(() => {
    apiChamp.getChamp(modalChamp).then((json) => {
      setChampion(json.data);
      setIsMounting(false);
    });
  }, []);

  useEffect(() => {
    setChampLore(Object.entries(champion));
    // champLore.length > 0 && console.log(champLore); //pour check les données dans l API
  }, [champion]);

  return (
    <button
      type="button"
      className="modalLibBackground"
      onClick={() => {
        setOpenModal(false);
      }}
    >
      <div
        className="modalLibContainer"
        style={{
          backgroundImage: `url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${modalChamp}_0.jpg)`,
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modalLibTitleCloseBtn">
          <div
            type="button"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </div>
        </div>
        <div className="modalLibTitle">
          <h1>{modalChamp}</h1>
          <h2>{champLore.length > 0 && champLore[0][1].title}</h2>
        </div>
        <div className="modalLibBody">
          {isMounting ? (
            <p>En cours de chargement =P</p>
          ) : (
            champLore.length > 0 && <p>{champLore[0][1].lore}</p>
          )}
        </div>
      </div>
    </button>
  );
}

export default ModalLib;

ModalLib.propTypes = {
  setOpenModal: PropTypes.func,
  modalChamp: PropTypes.string,
};

ModalLib.defaultProps = {
  setOpenModal: () => {},
  modalChamp: "",
};
