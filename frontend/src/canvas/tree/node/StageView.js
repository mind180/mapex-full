import React from 'react';
import './StageView.css';
import TitleView from  './title/TitleView';

const minWidth = 5;

export default class StageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 1,
      width: minWidth + 'px',
      isConnectionPointsShown: false,
      color: this.props.color
    };

    this.handleClick = this.handleClick.bind(this);
    this.setSize = this.setSize.bind(this);
  }

  handleClick(e) { 
    this.props.openEditStage(e);
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
        onClick={this.handleClick}
        onChange={this.handleChangeColor}
      >
        <TitleView
          stageId={this.props.id}
          text={this.props.title}
          rows={this.state.rows}
          initSize={this.setSize}
          backgroundColor={this.props.color}
        />
      </div>
    );
  }
}
