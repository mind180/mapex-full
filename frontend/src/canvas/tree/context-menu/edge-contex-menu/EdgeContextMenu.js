import React from 'react';
import './EdgeContextMenu.css';

export default function EdgeContextMenu(props) {
  if (!props.isOpen) return null;

  const style = {
    left: props.positionX,
    top: props.positionY
  };

  const deleteEdge = () => {
    props.onDelete(props.edgeId);
  };

  return (
      <div className="edge-context-menu" style={style}>
        <div className="menu-point">
          Type
        </div>
        <div className="menu-point">
          Size
        </div>
        <div className="menu-point">
          Color
        </div>
        <div className="menu-point delete-edge"
             onClick={deleteEdge}>
          Delete
        </div>
      </div>
  );
}