import { zoneSize } from './common.js';

export function increaseCanvasHeight(canvasElement, draggingNode, pageY) {
  const canvasHeight = parseInt(getComputedStyle(canvasElement).getPropertyValue('height'));
  const draggingNodeOffsetTop = pageY - canvasElement.offsetTop;

  const mostDownNodePoint = draggingNodeOffsetTop + draggingNode.offsetHeight;
  if (mostDownNodePoint > canvasHeight) {
    return canvasHeight + zoneSize;
  }

  return canvasHeight;
}

export function increaseCanvasWidth(canvasElement, canvasScroll, draggingNode, pageX) {
  const canvasWidth = parseInt(getComputedStyle(canvasElement).getPropertyValue('width'));
  const nodeOffsetLeft = pageX - canvasElement.offsetLeft + canvasScroll.scrollLeft;
  const mostRighterNodePoint = nodeOffsetLeft + canvasScroll.scrollLeft + draggingNode.offsetWidth;
  
  if (mostRighterNodePoint > canvasWidth) {
    return canvasWidth + zoneSize;
  }

  return canvasWidth;
}
