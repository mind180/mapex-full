import React, { Component } from 'react';
import * as htmlToImage from 'html-to-image';
import Canvas from '../../canvas/Canvas.js';
import KeyStrokeHandler from  './KeyStrokeHandler.js';
import { createNode, deleteNode, setNestedKey } from '../../services/NodeService.js'
import { createEdge, deleteEdges, setUpdatedEdges } from '../../services/EdgeService.js';
import { processEntity } from '../../api/api.js';
import Loader from "../ui/loader/Loader";
import Comments from '../ui/comments/Comments.js';

export default class CanvasStateProvider extends Component {
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
          <Canvas
            id={this.state.canvasId}
            title={this.state?.canvas?.name}
            description={this.state?.canvas?.description}
            nodes={this.state.nodes}
            edges={this.state.edges}
            onNodeAdd={this.addNode.bind(this)}
            onNodeDelete={this.deleteNode.bind(this)}
            onNodeChange={this.updateNode.bind(this)}
            onEdgeAdd={this.addEdge.bind(this)}
            onEdgeDelete={this.deleteEdges.bind(this)}
            onEdgeChange={this.updateEdges.bind(this)}
          />
        </KeyStrokeHandler>
        <div style={{textAlign: 'center'}}>Metadata</div>
      </div>
    );
  }

  mapToImage(mapElement) {
    htmlToImage.toJpeg(mapElement, { quality: 0.01 })
      .then(imageBlob => this.saveImage(imageBlob))
      .catch(err => {
        console.error('oops, something went wrong!', err);
      });
  }

  saveImage(imageBlob) {
    processEntity('PUT', `/maps/${this.state.canvasId}/img`, imageBlob, 'application/octet-stream')
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  addNode(position, canvas) {
    const newNode = createNode(position);
    
    processEntity('POST', `/maps/${this.state.canvas.id}/stages`, [newNode])
      .then(response => response.json())
      .then(nodes => this.state.nodes.concat(nodes))
      .then(nodes => this.setState({ nodes }))
      .catch(error => console.log(error));

    console.log(canvas);
    this.mapToImage(canvas);
  }

  deleteNode(nodeId) {
    processEntity('DELETE', `/maps/${this.state.canvas.id}/stages/${nodeId}`)
      .then(responseOk => deleteNode(this.state.nodes, nodeId))
      .then(notDeletedNodes => this.setState({ nodes: notDeletedNodes }))
      .catch(error => console.log(error));
  }

  updateNode(nodeId, propertyName, value) {
    const node = this.state.nodes.find(node => node.id === nodeId);

    const pathToProperty = propertyName.split(".");
    setNestedKey(node, pathToProperty, value);

    processEntity('PUT', `/stages/${nodeId}`, node)
      .then(response => response.json())
      .catch(error => console.log(error));
  }

  addEdge(from, to) {
    const edge = createEdge(from, to);
    
    processEntity('POST', `/maps/${this.state.canvas.id}/connections`, [edge])
      .then(response => response.json())
      .then(edges => this.state.edges.concat(edges))
      .then(edges => this.setState({ edges }))
      .catch(error => console.log(error));
  }

  deleteEdges(edgeIds) {
    processEntity('DELETE', `/maps/${this.state.canvas.id}/connections?ids=` + edgeIds.join(','))
      .then(responseOk => deleteEdges(this.state.edges, edgeIds))
      .then(notDeletedEdges => this.setState({ edges: notDeletedEdges }))
      .catch(error => console.log(error));
  }

  updateEdges(mapUpdatedEdges) {
    setUpdatedEdges(this.state.edges, mapUpdatedEdges);

    const updatedEdgesAsArray = Array.from(mapUpdatedEdges.values());
    processEntity('PUT', `/maps/${this.state.canvas.id}/connections`, updatedEdgesAsArray)
      .catch(error => console.log(error));
  }
}
