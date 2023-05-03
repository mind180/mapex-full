import React, { Component } from 'react';
import MapVeiwer from '../../canvas/MapViewer.js';
import KeyStrokeHandler from  './KeyStrokeHandler.js';
import { processEntity } from '../../api/api.js';
import Loader from "../ui/loader/Loader";
import Comments from '../ui/comments/Comments.js';

export default class MapViewerStateProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasId: this.props.canvasId,
      nodes: [],
      edges: [],
      loading: true
    }
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
      <div style={{backgroundColor: '#f9fafb'}}>
        <KeyStrokeHandler canvas={this.state.canvas} nodes={this.state.nodes} edges={this.state.edges} >
            <MapVeiwer
                title={this.state?.canvas?.name}
                description={this.state?.canvas?.description}
                nodes={this.state.nodes}
                edges={this.state.edges}
            />
        </KeyStrokeHandler>
        <Comments mapId={this.props.canvasId} />
      </div>
    );
  }
}
