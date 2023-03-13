import { zoneSize, minWidth, minHeight } from './common.js';
import { getMostDownNode, getMostRighterNode } from './common.js';


export function decreaseCanvasHeight(canvasElement, nodes) {
  const canvasHeight = parseInt(getComputedStyle(canvasElement).getPropertyValue('height'));
  if (canvasHeight <= minHeight) return minHeight;

  const mostDownNode = getMostDownNode(nodes);
  const nodeHeight = canvasElement.querySelector(`div[data-id='${mostDownNode.id}']`).offsetHeight;
  
  const canvasHeightUnderNode = canvasHeight - (mostDownNode.position.y + nodeHeight);  
  const leftedInLastZone = canvasHeightUnderNode % zoneSize;
  const decreasedZones = canvasHeightUnderNode - leftedInLastZone;
  
  const mostDownNodePoint = mostDownNode.position.y + nodeHeight;
  if (mostDownNodePoint < canvasHeight - zoneSize) {
    return canvasHeight - decreasedZones;
  }

  return canvasHeight;
}

export function decreaseCanvasWidth(canvasElement, nodes) {
  const canvasWidth = parseInt(getComputedStyle(canvasElement).getPropertyValue('width'));
  if (canvasWidth <= minWidth) return minWidth;
  
  const mostRighterNode = getMostRighterNode(nodes);
  const nodeWidth = canvasElement.querySelector(`div[data-id='${mostRighterNode.id}']`).offsetWidth;
  
  const canvasWidthAfterNode = canvasWidth - (mostRighterNode.position.x + nodeWidth);
  const leftedInLastZone = canvasWidthAfterNode % zoneSize;
  const decreasedZones = canvasWidthAfterNode - leftedInLastZone;

  const mostRighterNodePoint = mostRighterNode.position.x + nodeWidth; 
  if (mostRighterNodePoint < canvasWidth - zoneSize) {
    return canvasWidth - decreasedZones;
  }

  return canvasWidth;
}
