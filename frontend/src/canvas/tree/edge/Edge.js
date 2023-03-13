import React from 'react';
import { pathForm } from './lib/pathForm';
import { position } from './lib/position';

const defaultZIndex = '100';

export default class Edge extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseMove(e) {
    this.raiseEdgeLayer(e.pageX - window.scrollX, e.pageY - window.scrollY);
  };

  raiseEdgeLayer(x, y) {
    const elem = document.elementFromPoint(x, y);

    if (elem.classList.contains('edge')) {
      elem.closest('.edge-rect').style.zIndex = Number(defaultZIndex) + 10;
      return;
    }

    if (!elem.classList.contains('edge-rect')) return;

    elem.style.zIndex = defaultZIndex;
    elem.style.visibility = 'hidden';

    this.raiseEdgeLayer(x, y);
    elem.style.visibility = 'visible';
  }

  handleMouseEnter(e) {
    e.target.style.stroke = 'red';
    e.target.style.cursor = 'pointer';
  }

  handleMouseLeave(e) {
    e.target.style.stroke = 'black';
  }

  render() {
    if (!this.props.isShown) return null;

    const {from, to, width = 1, type = 'straight', orientation = 'horizontal', isDashed = false} = this.props;

    const directionName = this.getDirectionName(from, to);

    const positionStyle = position[directionName](from, to, width);
    const style = {
      position: 'absolute',
      top: positionStyle.y,
      left: positionStyle.x,
      height: positionStyle.height,
      width: positionStyle.width,
      strokeDasharray: isDashed ? (width * 3 + " " + width * 2) : "",
      zIndex: defaultZIndex
    };

    const drawPath = pathForm[type][orientation][directionName];
    const d = drawPath(positionStyle.height, positionStyle.width, width);

    return (
      <svg className='edge-rect' xmlns="http://www.w3.org/2000/svg" style={style}
        onMouseMove={this.handleMouseMove}
        data-allow-context-menu="true"
      >
        <path data-id={this.props.id}
              data-allow-context-menu="true"
              className='edge'
              d={d}
              stroke="black"
              strokeWidth={width}
              fill="transparent"
              strokeLinecap="round"
              strokeLinejoin="round"
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
        />
      </svg>
    );
  }

  getDirectionName(from ,to) {
    return this.getVerticalName(from, to) + this.getHorizontalName(from, to);
  }

  getVerticalName(from, to) {
    if (this.isTop(from, to)) {
      return 'Top';
    }
    return 'Bottom';
  }

  getHorizontalName(from, to) {
    if (this.isRight(from, to)) {
      return 'Right';
    }
    return 'Left';
  }

  isRight(from, to) {
    return from.x < to.x;
  }

  isTop(from, to) {
    return from.y > to.y;
  }
}
