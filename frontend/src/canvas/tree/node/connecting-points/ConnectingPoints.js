import React from 'react';
import ConnectionPoint from './connecting-point/ConnectionPoint';

export default class ConnectingPoints extends React.Component {
  render() {
    const style = {
      visibility: this.props.isShown ? 'visible' : 'hidden'
    };

    return(
      <div style={style}>
        <ConnectionPoint id={this.props.nodeId + "_1"} attachmentSide='top'/>
        <ConnectionPoint id={this.props.nodeId + "_2"} attachmentSide='right'/>
        <ConnectionPoint id={this.props.nodeId + "_3"} attachmentSide='bottom'/>
        <ConnectionPoint id={this.props.nodeId + "_4"} attachmentSide='left'/>
      </div>
    );
  }
}
