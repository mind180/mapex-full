import React from 'react';
import './ModalContent.css';

export default function ModalContent({ children }) {
  const stopEventPropagation = (e) => e.stopPropagation();

  return (
      <div className='modal-content'
           onClick={stopEventPropagation}
      >
        {children}
      </div>
  );
}