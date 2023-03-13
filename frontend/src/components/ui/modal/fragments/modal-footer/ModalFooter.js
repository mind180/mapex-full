import React from 'react';
import './ModalFooter.css';

export default function ModalFooter({ children }) {
  return (
      <div className="modal-footer">
        {children}
      </div>
  );
}