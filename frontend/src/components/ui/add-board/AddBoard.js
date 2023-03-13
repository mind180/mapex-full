import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './AddBoard.css';
import { processEntity } from "../../../api/api";
import Modal from "../modal/Modal";

export default function AddBoard() {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateCanvas = ({name, description}) => {
    const newCanvas = {
      name: name || 'Untitled',
      description: description || 'not described yet...'
    };

    createCanvasAndMoveTo(newCanvas);
  };

  const createCanvasAndMoveTo = (newCanvas) => {
    processEntity('POST', '/canvas', newCanvas)
        .then(response => response.json())
        .then(canvas => history.push(`canvas/${canvas.id}`))
        .catch(error => console.error(error));
  };

  return (
    <div className='add-board'
      onClick={openModal}
    >
      <div className="add-board__shadow">
        <div className="add-board__plus">+</div>
        <div className="add-board__title">New</div>
      </div>
      {
        isModalOpen ?
          <Modal>
            <Modal.EditCanvas
              okButtonName='Create'
              onCancel={closeModal}
              onOk={handleCreateCanvas}
            />
          </Modal> : null
    }
    </div>
  );
}