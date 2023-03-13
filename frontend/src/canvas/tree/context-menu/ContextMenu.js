import React from "react";
import "./ContextMenu.css";

export default class ContextMenu extends React.Component {
  render() {
    if (!this.props.isOpen) return null;

    const style = {
      left: this.props.positionX,
      top: this.props.positionY
    };

    return (
      <div className='canvas-context-menu' style={style}>
        <p onClick={this.props.handleClickCreateNode}>Create node</p>
      </div>
    );
  }
}
