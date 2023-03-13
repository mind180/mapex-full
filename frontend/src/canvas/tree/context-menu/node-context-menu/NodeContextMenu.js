import React from "react";
import "./NodeContextMenu.css";
import ColorPicker from './color-picker/ColorPicker';

export default class NodeContextMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isColorPickerShown: false };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (e.target.classList.contains('color-picker-item')) {
      this.setState({isColorPickerShown: false});
    }
  }

  render() {
    if (!this.props.isOpen) return null;

    return (
      <div className='node-context-menu'>
        <div className='menu-point menu-point-color'
          onClick={this.handleClick}
          onMouseEnter={e => this.setState({isColorPickerShown: true})}
          onMouseLeave={e => this.setState({isColorPickerShown: false})}
          draggable onDragStart={e => e.preventDefault()}
        >
          Color
          <ColorPicker
              isShown={this.state.isColorPickerShown}
              color={this.props.color}
          />
        </div>
        <div className='menu-point' onClick={this.props.handleDeleteNode}>Delete</div>
      </div>
    );
  }
}
