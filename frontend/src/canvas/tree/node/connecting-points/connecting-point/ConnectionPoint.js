import React from 'react';
import './ConnectionPoint.css';

const attachmentSides = {
  top: {
    left: '50% - 100px',
    top: '-2%'
  },
  right: {
    left: '100%',
    top: '50%'
  },
  bottom: {
    left: '50%',
    top: '100%'
  },
  left: {
    left: '0%',
    top: '50%'
  }
};

export default class ConnectionPoint extends React.Component {
  render() {
    const style = {
      top: attachmentSides[this.props.attachmentSide].top,
      left: attachmentSides[this.props.attachmentSide].left
    };

    return(
      <div id={this.props.id} className='connection-point' style={style}
           draggable onDragStart={e => e.preventDefault()}>
      </div>
    );
  }
}
