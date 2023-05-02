import React from 'react';
import './StagePassing.css';
import TitleView from './title/TitleView';
import StageStatus from './stage-status/StageStatus';

const minWidth = 5;

export default class StagePassing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 1,
      width: minWidth + 'px',
      isConnectionPointsShown: false,
      color: this.props.color,
      isPassingMenuOpen: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.setSize = this.setSize.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
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

  handleMouseEnter(e) {
    this.setState({ isPassingMenuOpen: true });
  }

  handleMouseLeave(e) {
    this.setState({ isPassingMenuOpen: false });
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
      <div data-id={this.props.id} className='stage-passing' style={style} data-allow-context-menu 
        onClick={this.handleClick}
        onChange={this.handleChangeColor}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <TitleView
          stageId={this.props.id}
          text={this.props.title}
          rows={this.state.rows}
          initSize={this.setSize}
          backgroundColor={this.props.color}
        />
        <StageStatus status={this.props.status} />
      </div>
    );
  }
}
