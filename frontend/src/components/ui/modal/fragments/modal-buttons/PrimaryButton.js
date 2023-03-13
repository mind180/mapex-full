import React from 'react';
import './ModalButtons.css';

export default function PrimaryButton({ children, action }) {
  const handleClick = (e) => {
    e.stopPropagation();
    if (action) {
      action();
    }
  };

  return (
      <button className='modal-button button-primary'
              onClick={handleClick}
      >
        {children}
      </button>
  );
}