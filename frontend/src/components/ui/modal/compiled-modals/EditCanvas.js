import React, {useRef} from 'react';
import './EditCanvas.css';
import Modal from '../Modal';

export default function EditCanvas(props) {
  const {title = '', description = '', okButtonName = 'Save', onCancel, onOk} = props;
  const titleElement = useRef();
  const descriptionElement = useRef();

  const handleClickOk = () => {
    const name = titleElement.current.value;
    const description = descriptionElement.current.value;

    if (onOk) {
      onOk({name, description});
    }
  };

  return (
      <Modal.Content>
        <Modal.Body>
          <div className="modal-body-item">
            <input ref={titleElement} defaultValue={title} placeholder='Title' type="text"/>
          </div>
          <div className="modal-body-item">
            <textarea ref={descriptionElement} defaultValue={description} placeholder='Description'/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.PrimaryButton action={onCancel}>
              Cancel
          </Modal.PrimaryButton>
          <Modal.PrimaryButton action={handleClickOk}>
            {okButtonName}
          </Modal.PrimaryButton>
        </Modal.Footer>
      </Modal.Content>
  );
}