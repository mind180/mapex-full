import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';
import ModalFooter from "./fragments/modal-footer/ModalFooter";
import PrimaryButton from "./fragments/modal-buttons/PrimaryButton";
import ModalBody from "./fragments/modal-body/ModalBody";
import ModalContent from "./fragments/modal-content/ModalContent";
import EditCanvas from './compiled-modals/EditCanvas';
import EditStage from './compiled-modals/edit-stage/EditStage';
import PassStage from './compiled-modals/pass-stage/PassStage';

export default function Modal({ children }) {
  const modalRoot = document.getElementById('modal');
  const element = document.createElement('div');
  element.classList.add('modal-dialog');

  useEffect(() => {
    modalRoot.appendChild(element);
    return () => { modalRoot.removeChild(element); };
  });

  return (
      createPortal(children, element)
  );
}

Modal.Content = ModalContent;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.PrimaryButton = PrimaryButton;
Modal.EditCanvas = EditCanvas;
Modal.EditStage = EditStage;
Modal.PassStage = PassStage;