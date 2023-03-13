import React, {useState} from "react";
import './BoardPinMenu.css';
import {processEntity} from "../../../api/api";
import Modal from "../modal/Modal";

export default function BoardPinMenu(props) {
  const { isOpen, canvasId, canvasTitle, canvasDescription, hideBoardPin, updateBoardPin } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleUpdateCanvas = ({name, description}) => {
    const updatedCanvas = {
      name: name || 'Untitled',
      description: description || 'not described yet...'
    };

    processEntity('PUT', `/canvas/${canvasId}`, updatedCanvas)
        .then(responseOk => updateBoardPin(name, description))
        .then(() => closeModal())
        .catch(error => console.log(error));
  };

  const handleDeleteCanvas = () => {
    processEntity('DELETE', `/canvas/${canvasId}`)
      .then(responseOk => hideBoardPin())
      .catch(error => console.log(error));
  };

  return (
    <ul className="board-pin__menu"
        style={{display: isOpen  ? "block" : "none"}}
    >
      <li className="board-pin__menu-item"
          onClick={openModal}
      >
        Edit
      </li>
      <li className="board-pin__menu-item"
          onClick={handleDeleteCanvas}
      >
        Delete
      </li>
      {
        isModalOpen ? (
            <Modal>
              <Modal.EditCanvas
                title={canvasTitle}
                description={canvasDescription}
                onCancel={closeModal}
                onOk={handleUpdateCanvas}
              />
            </Modal>
        ) : null
      }
    </ul>
  )
}