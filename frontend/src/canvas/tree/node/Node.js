import React from 'react';
import './Node.css';
import Title from  './title/Title';
import NodeContextMenu from '../context-menu/node-context-menu/NodeContextMenu';
import ConnectingPoints from './connecting-points/ConnectingPoints';

const minWidth = 5;

export default class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 1,
      width: minWidth + 'px',
      isConnectionPointsShown: false,
      color: this.props.color
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.setSize = this.setSize.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
  }

  handleClick(e) {
    if (e.target.classList.contains('color-picker-item')) {
      this.setState({ isConnectionPointsShown: false });
      this.props.onColorChange(this.props.id, e.target.dataset.color);
    }
  }

  handleChangeColor(e) {
    if (e.target.classList.contains('color-picker-value')) {
      console.log(e.target.value);
      this.setState({ isConnectionPointsShown: false });
      this.props.onColorChange(this.props.id, e.target.value);
    }
  }

  handleChangeTitle(e) {
    const inputElement = e.target;
    this.setSize(inputElement);
  }

  handleMouseEnter(e) {
    this.toggleConnectiongPoints(true);
  }

  handleMouseLeave(e) {
    this.toggleConnectiongPoints(false);
  }

  setSize(inputElement) {
    const titleLines = inputElement.value.split('\n');
    const mostLongLine = titleLines.sort((a, b) => b.length - a.length)[0];
    const fontDescription = this.getFontDescriptor(inputElement);
    const textWidth = this.getTextWidth(mostLongLine, fontDescription);

    this.setState({
      width: minWidth + textWidth + 'px',
      rows: titleLines.length
    });

    this.props.setLastTouchedNode(inputElement.closest('.node'));
  }

  getTextWidth(text, font) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  }

  getFontDescriptor(element) {
    const fontWeight = getComputedStyle(element).getPropertyValue("font-weight");
    const fontSize = getComputedStyle(element).getPropertyValue("font-size");
    const fontFamily = getComputedStyle(element).getPropertyValue("font-family");
    return fontWeight + ' ' + fontSize + ' ' + fontFamily; 
  }

  toggleConnectiongPoints(isShown) {
    this.setState({ isConnectionPointsShown: isShown });
  }

  render() {
    const style = {
      left: this.props.position.x,
      top: this.props.position.y,
      backgroundColor: this.props.color,
      width: this.state.width,
      zIndex: this.props.isContextMenuOpen ? '4000' : '1000'
    };

    return (
      <div data-id={this.props.id} className='node' style={style} data-allow-context-menu 
        onDoubleClick={this.handleDoubleClick}
        draggable
        onDragStart={this.props.handleDragStart}
        onDrag={this.props.handleDrag}
        onDragEnd={this.props.handleDragEnd}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onChange={this.handleChangeColor}
      >
        <Title
          text={this.props.title}
          rows={this.state.rows}
          initSize={this.setSize}
          onChangeText={this.handleChangeTitle}
          backgroundColor={this.props.color}
          handleUpdateTitle={this.props.handleUpdateTitle}
        />
        <NodeContextMenu
          isOpen={this.props.isContextMenuOpen}
          color={this.props.color}
          handleDeleteNode={this.props.handleDeleteNode}
          {...this.props}
        />
        <ConnectingPoints nodeId={this.props.id} isShown={this.state.isConnectionPointsShown}/>
      </div>
    );
  }
}
