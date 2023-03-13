import React from 'react';
import './ModalBody.css';

export default function EditCanvas({ children }) {
  return (
      <div className="modal-body">
        {children}
      </div>
  );
}