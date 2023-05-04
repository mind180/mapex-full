import React from "react";
import "./NodeContextMenu.css";
import ColorPicker from './color-picker/ColorPicker';
import Modal from "../../../../components/ui/modal/Modal";

export default class NodeContextMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isColorPickerShown: false,
      isEditStageOpen: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSaveStageDescription= this.handleSaveStageDescription.bind(this);
    this.closeEditStage = this.closeEditStage.bind(this);
    this.openEditStage = this.openEditStage.bind(this);
  }

  handleClick(e) {
    if (e.target.classList.contains('color-picker-item')) {
      this.setState({isColorPickerShown: false});
    }
    if ((e.target.classList.contains('menu-point-color'))) {
      e.stopPropagation();
      this.setState({ isColorPickerShown: !this.state.isColorPickerShown });
    }
  }

  handleSaveStageDescription() {
    alert('save');
  }

  closeEditStage() {
    this.setState({ isEditStageOpen: false });
  }

  openEditStage() {
    this.setState({ isEditStageOpen: true });
  }

  render() {
    if (!this.props.isOpen) return null;

    return (
      <div className='node-context-menu'>
        <div className='menu-point' data-id={this.props.id} onClick={this.props.openEditStage}>🖊️</div>
        <div className='menu-point menu-point-color'
          onClick={this.handleClick}
          draggable onDragStart={e => e.preventDefault()}
        >
          🔵
          <ColorPicker
              isShown={this.state.isColorPickerShown}
              color={this.props.color}
          />
        </div>
        <div className='menu-point' onClick={this.props.handleDeleteNode}>✖️</div>
      </div>
    );
  }
}
