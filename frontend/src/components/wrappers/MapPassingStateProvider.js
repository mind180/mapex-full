import React, { Component } from 'react';
import MapPassing from '../../canvas/MapPassing.js';
import KeyStrokeHandler from  './KeyStrokeHandler.js';
import { processEntity } from '../../api/api.js';
import Loader from "../ui/loader/Loader";
import Comments from '../ui/comments/Comments.js';

export default class MapPassingStateProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasId: this.props.canvasId,
      nodes: [],
      edges: [],
      loading: true
    }

    const changeStageStatus = this.changeStageStatus.bind(this);
  }

  componentDidMount() {
    processEntity('GET', `/maps/${this.state.canvasId}`)
      .then(response => response.json())
      .then(canvas =>
        this.setState({
          canvas: canvas,
          nodes: canvas.stages || [],
          edges: canvas.connections || []
        })
      )
      .catch(error => console.log(error))
      .finally(() => this.setState({ loading: false }));
  }
  
  render() {
    if (this.state.loading) return <Loader/>;

    return (
      <div style={{backgroundColor: 'lightgrey'}}>
        <KeyStrokeHandler canvas={this.state.canvas} nodes={this.state.nodes} edges={this.state.edges} >
            <MapPassing
                title={this.state?.canvas?.name}
                description={this.state?.canvas?.description}
                nodes={this.state.nodes}
                edges={this.state.edges}
                onChangeStatus={this.changeStageStatus}
            />
        </KeyStrokeHandler>
        <Comments mapId={this.props.canvasId} />
      </div>
    );
  }

  changeStageStatus(stageId, status) {
    const stage = this.nodes.find(node => node.id === stageId);
    stage.data.status = status;
  }
}
