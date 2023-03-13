import {zoneSize, minHeight, minWidth} from './common.js';
import {getMostDownNode, getMostRighterNode} from './common.js';

export function initCanvasWidth(canvasElement, nodes) {
  const mostRighterNode = getMostRighterNode(nodes);
  
  const nodeWidth = canvasElement.querySelector(`div[data-id='${mostRighterNode.id}']`).offsetWidth;
  const mostRighterNodePoint = mostRighterNode.position.x + nodeWidth;

  if (mostRighterNodePoint <= minWidth) {
    return minWidth;
  }

  const leftedInLastZone = zoneSize - (mostRighterNodePoint % zoneSize);
  return mostRighterNodePoint + leftedInLastZone;
}

export function initCanvasHeight(canvasElement, nodes) {
  const mostDownNode = getMostDownNode(nodes);
  
  const nodeHeight = canvasElement.querySelector(`div[data-id='${mostDownNode.id}']`).offsetHeight;
  const mostDownNodePoint = mostDownNode.position.y + nodeHeight;

  if (mostDownNodePoint <= minHeight) {
    return minHeight;
  }

  const leftedInLastZone = zoneSize - (mostDownNodePoint % zoneSize);
  return mostDownNodePoint + leftedInLastZone;
}
