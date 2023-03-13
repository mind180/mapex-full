import React from 'react';
import './Canvas.css';
import Caption from './tree/caption/Caption';
import Edge from './tree/edge/Edge';
import Node from './tree/node/Node';
import ContextMenu from './tree/context-menu/ContextMenu';
import {increaseCanvas, decreaseCanvas, initCanvasSize, zoneSize} from './services/resize-service/ResizeService.js';
import EdgeContextMenu from "./tree/context-menu/edge-contex-menu/EdgeContextMenu";

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isContextMenuOpen: false,
      isEdgeMenuOpen: false,
      edgeMenuPosition: {x: 0, y: 0},
      isEdgeCreating: false,
      isSizeInit: false,
      demoEdgeFrom: {x: 0, y: 0},
      demoEdgeTo: {x: 0, y: 0},
    };
    
    this.canvasWrapper = React.createRef();
    this.canvasElement = React.createRef();
    this.canvasScroll = React.createRef();

    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickCreateNode = this.handleClickCreateNode.bind(this);
    this.handleDeleteNode = this.handleDeleteNode.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.setLastTouchedNode = this.setLastTouchedNode.bind(this);
    this.openEdgeContextMenu = this.openEdgeContextMenu.bind(this);
    this.handleDeleteEdge = this.handleDeleteEdge.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.isSizeInit && this.state.lastChangedNode) {
      const {height, width} = initCanvasSize(this.canvasElement.current, this.props.nodes);
      
      this.updateCanvasSize(height, width);
      this.setState({ isSizeInit: true });
    }
    if (this.state.lastChangedNode) {
      this.rerenderConnectedEdges(this.state.lastChangedNode);
      this.handleDecreaseCanvas();
      
      this.setState({ lastChangedNode: null });
    }
    if (this.state.lastDeletedNode) {
      this.deleteConnectedEdges(this.state.lastDeletedNode);
    }
  }

  handleContextMenu(e) {
    e.preventDefault();
    this.closeAllContextMenu();

    if (!e.target.dataset.allowContextMenu) return;

    if (e.target.classList.contains('canvas')) {
      this.openContextMenu(this.getCursorPosition(e.pageX, e.pageY, e.target));
    }
    if (e.target.classList.contains('node')) {
      this.openNodeContextMenu(e.target.dataset.id);
    }
    if (e.target.classList.contains('edge')) {
      this.openEdgeContextMenu(e.target.dataset.id, e.pageX, e.pageY);
    }
  }

  closeAllContextMenu() {
    this.closeNodesContextMenu();
    this.closeCanvasContextMenu();
    this.closeEdgeContextMenu();
  }

  handleClick(e) {
    this.closeAllContextMenu();
  }

  handleChangeColor(nodeId, color) {
    this.props.onNodeChange(nodeId, "data.color", color);
  }

  handleDragStart(e) {
    if (e.target.classList.contains('connection-point')) return;
    if (e.target.classList.contains('node-title')) return;
    if (e.target.classList.contains('menu-point')) return;

    this.setOffsetInsideNode(e.pageX, e.pageY, e.target);
  }

  handleDrag(e) {
    const draggingNode = e.target;
    this.increaseCanvas(this.canvasElement.current, this.canvasScroll.current, draggingNode, e.pageX, e.pageY);
  }

  handleDragEnd(e) {
    if (e.target.classList.contains('node-title')) return;
    const draggedNode = e.target;
    const draggedNodeId = e.target.dataset.id;
    
    this.setState({ isEdgeCreating: false });
    this.setState({ lastChangedNode: draggedNode });
    
    const position = this.getNewNodePosition(draggedNodeId, e.pageX, e.pageY);
    this.props.onNodeChange(draggedNodeId, "position", position);
  }

  handleMouseDown(e) {
    if (!e.target.classList.contains('connection-point')) return;
    const connectionPointId = e.target.getAttribute('id');
    const connectionPointRect = e.target.getBoundingClientRect();
    this.showDemoEdge(connectionPointId, connectionPointRect);
  }

  handleMouseMove(e) {
    if (!this.state.isEdgeCreating) return;
    this.updateDemoEdge(e.pageX, e.pageY);
  }

  handleMouseUp(e) {
    if (!this.state.isEdgeCreating) return;
    if (!e.target.classList.contains('connection-point')) {
      this.setState({ isEdgeCreating: false });
      return;
    }
    const connectionPointElement = e.target;
    this.createEdge(connectionPointElement);
    this.setState({ isEdgeCreating: false });
  }

  handleClickCreateNode(e) {
    const cursorPosition = this.getCursorPosition(e.pageX, e.pageY, e.target);
    const posXInsideCanvas = cursorPosition.x - this.canvasElement.current.offsetLeft;
    const posYInsideCanvas = cursorPosition.y - this.canvasElement.current.offsetTop;
    
    this.props.onNodeAdd({ x: posXInsideCanvas, y: posYInsideCanvas });
  }

  handleDeleteNode(e) {
    const nodeElement = e.target.closest('.node');

    this.props.onNodeDelete(nodeElement.dataset.id);
    this.setState({ lastDeletedNode: nodeElement });
  }

  handleDeleteEdge(edgeId) {
    this.props.onEdgeDelete([edgeId]);
  }

  handleUpdateTitle(e) {
    const nodeId = e.target.closest('.node').dataset.id;
    const newTitle = e.target.value;
    
    this.props.onNodeChange(nodeId, "data.title", newTitle);
  }

  increaseCanvas(canvasElement, canvasScroll, draggingNode, pageX, pageY) {
    const {height, width} = increaseCanvas(canvasElement, canvasScroll, draggingNode, pageX, pageY);
    this.updateCanvasSize(height, width);
  }

  handleDecreaseCanvas() {
    const {height, width} = decreaseCanvas(this.canvasElement.current, this.props.nodes);
    this.updateCanvasSize(height, width);
  }

  updateCanvasSize(height, width) {
    this.canvasElement.current.style.height = height + 'px';
    this.canvasElement.current.style.width = width + 'px';
    this.canvasWrapper.current.style.width = width + 'px';
  }

  createEdge(connectionPointElement) {
    const connectionPointId = connectionPointElement.getAttribute('id');
    const connectionPointRect = connectionPointElement.getBoundingClientRect();
    
    const demoEdgeTo = this.getConectionPointCoords(connectionPointId, connectionPointRect);
    
    if (this.state.demoEdgeFrom.x === demoEdgeTo.x) return;

    this.props.onEdgeAdd(this.state.demoEdgeFrom, demoEdgeTo);
  }

  showDemoEdge(connectionPointId, connectionPointRect) {
    const demoEdgeFrom = this.getConectionPointCoords(connectionPointId, connectionPointRect);
    this.setState({
      demoEdgeFrom: demoEdgeFrom,
      demoEdgeTo: demoEdgeFrom,
      isEdgeCreating: true
    });
  }

  updateDemoEdge(mouseX, mouseY) {
    const demoEdgeTo = {
      x: mouseX - this.canvasElement.current.offsetLeft + this.canvasScroll.current.scrollLeft,
      y: mouseY - this.canvasElement.current.offsetTop
    };
    this.setState({ demoEdgeTo: demoEdgeTo });
  }

  rerenderConnectedEdges(nodeElement) {
    const nodeId = nodeElement.dataset.id;
    const connectedEdges = this.props.edges.filter(edge => 
      edge.from.connectionPointId.split('_')[0] === nodeId || edge.to.connectionPointId.split('_')[0] === nodeId);
      
    const updatedEdges = this.updateConnectedEdges(nodeId, connectedEdges);
    this.props.onEdgeChange(updatedEdges);
  }

  updateConnectedEdges(nodeId, connectedEdges) {
    const updatedEdges = connectedEdges.map(edge => {
      const edgeToUpdate = Object.assign({}, edge);
      if (edge.from.connectionPointId.split('_')[0] === nodeId) {
        edgeToUpdate.from = this.getUpdatedConnectedSide(edge.from)
      } else {
        edgeToUpdate.to = this.getUpdatedConnectedSide(edge.to);
      }
      return [edgeToUpdate.id, edgeToUpdate];
    });
    
    return new Map(updatedEdges);
  }

  getUpdatedConnectedSide(edgeSide) {
    const connectionPoint = document.getElementById(edgeSide.connectionPointId);
    return this.getConectionPointCoords(edgeSide.connectionPointId, connectionPoint.getBoundingClientRect());
  }

  getConectionPointCoords(connectionPointId, connectionPointRect) {
    return {
      connectionPointId: connectionPointId,
      x: (Math.floor(connectionPointRect.x - this.canvasElement.current.offsetLeft) + connectionPointRect.width / 2) + window.scrollX + this.canvasScroll.current.scrollLeft,
      y: (Math.floor(connectionPointRect.y - this.canvasElement.current.offsetTop) + connectionPointRect.height / 2) + window.scrollY
    }
  }
 
  setOffsetInsideNode(pageX, pageY, node) {
    const draggedNodeId = node.dataset.id;
    const draggedNode = this.props.nodes.find(node => node.id === draggedNodeId);
    draggedNode.internalOffset = {
      x: (pageX - this.canvasElement.current.offsetLeft) - draggedNode.position.x,
      y: (pageY - this.canvasElement.current.offsetTop) - draggedNode.position.y
    };
  }

  getNewNodePosition(nodeId, pageX, pageY) { 
    const draggedNode = this.props.nodes.find(node => node.id === nodeId);
    
    let newPositionX = pageX - this.canvasElement.current.offsetLeft - draggedNode.internalOffset.x;
    let newPositionY = pageY - this.canvasElement.current.offsetTop - draggedNode.internalOffset.y;

    newPositionX = newPositionX < 0 ? 0 : newPositionX;
    newPositionY = newPositionY < 0 ? 0 : newPositionY;

    return { x: newPositionX, y: newPositionY };
  }
  
  deleteConnectedEdges(node) {
    const nodeId = node.dataset.id;
    const connectedEdges = this.props.edges.filter(edge => 
      edge.from.connectionPointId.split('_')[0] === nodeId || edge.to.connectionPointId.split('_')[0] === nodeId);
    
    if (connectedEdges.length === 0) return;
    
    const connectedEdgeIds = connectedEdges.map(edge => edge.id);
    this.props.onEdgeDelete(connectedEdgeIds);
    this.setState({ lastDeletedNode: null });
  }

  getCursorPosition(mouseX, mouseY, targetElement) {
    return {
      x: mouseX - targetElement.offsetLeft + this.canvasScroll.current.scrollLeft,
      y: mouseY - targetElement.offsetTop
    }
  }

  setLastTouchedNode(node) {
    this.setState({ lastChangedNode: node });
  }
  
  closeNodesContextMenu() {
    this.props.nodes.map(node => node.isContextMenuOpen = false);
  }

  openNodeContextMenu(nodeId) {
    const node = this.props.nodes.find(node => node.id === nodeId);
    node.isContextMenuOpen = true;
  }

  openContextMenu(cursorPosition) {
    this.setState({
      isContextMenuOpen: true,
      contextMenuPositionX: cursorPosition.x,
      contextMenuPositionY: cursorPosition.y
    });
  }

  closeEdgeContextMenu() {
    this.setState({
      isEdgeMenuOpen: false
    });
  }

  openEdgeContextMenu(edgeId, x, y) {
    const menuPosition = {
      x: x - this.canvasElement.current.offsetLeft + this.canvasScroll.current.scrollLeft,
      y: y - this.canvasElement.current.offsetTop
    };

    this.setState({
      edgeMenuPosition: menuPosition,
      isEdgeMenuOpen: true,
      edgeId: edgeId
    });
  }

  closeCanvasContextMenu() {
    this.setState({ isContextMenuOpen: false });
  }

  render() {
    const maxWidth = window.innerWidth - 30;

    return (
      <div ref={this.canvasWrapper} style={{width: zoneSize * 3, margin: '0 auto', maxWidth: maxWidth}}>
        <Caption title={this.props.title} description={this.props.description}/>
        <div ref={this.canvasScroll} className='canvas-scroll' style={{maxWidth: maxWidth, overflow: 'auto'}}>
          <div 
            className='canvas' 
            style={{height: zoneSize * 3}}
            data-allow-context-menu="true"
            ref={this.canvasElement}
            onContextMenu={this.handleContextMenu}
            onClick={this.handleClick}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onMouseMove={this.handleMouseMove}
            >  
            <ContextMenu 
              isOpen={this.state.isContextMenuOpen} 
              positionX={this.state.contextMenuPositionX} 
              positionY={this.state.contextMenuPositionY} 
              handleClickCreateNode={this.handleClickCreateNode}
            />
            <EdgeContextMenu
              edgeId={this.state.edgeId}
              isOpen={this.state.isEdgeMenuOpen}
              positionX={this.state.edgeMenuPosition.x}
              positionY={this.state.edgeMenuPosition.y}
              onDelete={this.handleDeleteEdge}
            />
            {this.props.nodes.map((node) => (
              <Node 
                key={node.id}
                id={node.id}
                title={node.data.title}
                color={node.data.color}
                position={node.position}
                isContextMenuOpen={node.isContextMenuOpen}
                handleDragStart={this.handleDragStart}
                handleDrag={this.handleDrag}
                handleDragEnd={this.handleDragEnd}
                handleDeleteNode={this.handleDeleteNode}
                handleUpdateTitle={this.handleUpdateTitle.bind(this)}
                onColorChange={this.handleChangeColor}
                setLastTouchedNode={this.setLastTouchedNode}
              />
            ))}
            {this.props.edges.map((edge) => (
              <Edge 
                key={edge.id}
                id={edge.id}
                isShown={true}
                width={1}
                type={'rectangular'}

                from={edge.from}
                to={edge.to}
              />
            ))}
            <Edge 
              className='demo-edge' 
              isShown={this.state.isEdgeCreating}
              type={'rectangular'}
              width={1}
              isDashed={true}
              from={this.state.demoEdgeFrom} 
              to={this.state.demoEdgeTo}
            />
          </div>
        </div>
      </div>
    );
  }
}
