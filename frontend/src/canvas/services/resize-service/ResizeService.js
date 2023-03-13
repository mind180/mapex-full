import { initCanvasHeight, initCanvasWidth } from './lib/initSize.js';
import { decreaseCanvasHeight, decreaseCanvasWidth } from './lib/decreaseSize.js';
import { increaseCanvasHeight, increaseCanvasWidth } from './lib/increaseSize.js';
export { zoneSize } from './lib/common.js';

/**
 * initialize canvas size for first time
 * 
 * @param {HTMLElement} canvasElement 
 * @param {Array} nodes 
 * 
 * @returns object {height, width} with new canvas size
 */
export function initCanvasSize(canvasElement, nodes) {
  const height = initCanvasHeight(canvasElement, nodes);
  const width = initCanvasWidth(canvasElement, nodes);

  return {height, width};  
}

/**
 * Find most righter and most down nodes and remove empty zones
 * 
 * @param {HTMLElement} canvasElement 
 * @param {Array} nodes
 * 
 * @returns object {height, width} with new canvas size
 */
export function decreaseCanvas(canvasElement, nodes) {
  const height = decreaseCanvasHeight(canvasElement, nodes);
  const width = decreaseCanvasWidth(canvasElement, nodes);

  return {height, width};
}

/**
 * if node out of current canvas size, add new zones
 *   
 * @param {HTMLElement} canvasElement 
 * @param {HTMLElement} canvasScroll 
 * @param {HTMLElement} draggingNode 
 * @param {number} pageX 
 * @param {number} pageY 
 * 
 * @returns object {height, widht} with new canvas size
 */
export function increaseCanvas(canvasElement, canvasScroll, draggingNode, pageX, pageY) {
  const height = increaseCanvasHeight(canvasElement, draggingNode, pageY);
  const width = increaseCanvasWidth(canvasElement, canvasScroll, draggingNode, pageX);

  return {height, width};
}
