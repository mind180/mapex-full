import React, { useState, useRef, useEffect } from 'react';
import './BoardPin.css'
import { useHistory } from 'react-router-dom';
import BoardPinMenu from "../board-pin-menu/BoardPinMenu";
import { processEntity } from '../../../api/api';

export default function BoardPin(props) {
  const {id: canvasId, title: canvasTitle, description: canvasDescription} = props;
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [title, setTitle] = useState(canvasTitle);
  const [description, setDescription] = useState(canvasDescription);
  const mapImageRef = useRef(null);

  const toggleMenu = (e) => {
    setOpen(!open);
    e.stopPropagation();
  };

  const closeMenu = () => setOpen(false);
  const hideBoardPin = () => setDeleted(true);

  const updateBoardPin = (name, description) => {
    setTitle(name);
    setDescription(description);
  };

  const redirectToBoard = () => {
    history.push(`/canvas/${canvasId}`);
  };

  useEffect(() => {
    processEntity('GET', `/maps/${props.id}/img`)
      .then(res => res.json())
      .then(image => { console.log(image); mapImageRef.current.src = image })
      .catch(err => console.error(err));
  }, []);

  return (
      <div className='board-pin'
        style={{display: deleted ? "none" : "block"}}
        onClick={redirectToBoard}
      >
        <div className='board-pin__preview'
          onMouseLeave={closeMenu}
        >
          <img className='board-pin__image' ref={mapImageRef} />
          <div className="board-pin__description">
            {description}
          </div>
          <div className="board-pin__menu-btn"
            onClick={toggleMenu}
          >
            ...
            <BoardPinMenu
              isOpen={open}
              canvasId={canvasId}
              canvasTitle={title}
              canvasDescription={description}
              hideBoardPin={hideBoardPin}
              updateBoardPin={updateBoardPin}
            />
          </div>
          <div className='board-pin__overlay'></div>
        </div>
        <div className='board-pin__info'>
          <div className="board-pin__info-title" title={title}>
            {title}
          </div>
        </div>
      </div>
  );
}