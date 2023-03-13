/**
 * Returns: new node object with related position
 * 
 * @param  {Object} position  position.x and position.y of node inside canvas
 * @return {Object}           new node object
 */
export function createNode(position) {
  const temporaryRandomId = Math.floor(Math.random() * 10000).toString();
  
  const node = {
    id: temporaryRandomId,
    data: {
      title: 'type_someting',
      color: 'lightgrey'
    },
    position: {
      x: position.x,
      y: position.y
    }
  }

  return node;
}

/**
 * Returns: new node array without deleted node
 * 
 * @param  {Array}  nodes
 * @param  {String} nodeId
 * @return {Array}  new array without deleted node
 */
export function deleteNode(nodes, nodeId) {
  const nodeIndex = nodes.findIndex(node => node.id === nodeId);
  
  const nodeList = nodes.slice(0, nodeIndex);
  nodeList.push(...nodes.slice(nodeIndex + 1, nodes.length));
  
  return nodeList;
}

/**
 * Sets a value of nested key string descriptor inside a Object.
 * It changes the passed object.
 * Ex:
 *    let obj = {a: {b:{c:'initial'}}}
 *    setNestedKey(obj, ['a', 'b', 'c'], 'changed-value')
 *    assert(obj === {a: {b:{c:'changed-value'}}})
 *
 * @param {[Object]} obj   Object to set the nested key
 * @param {[Array]}  path  An array to describe the path(Ex: ['a', 'b', 'c'])
 * @param {[Object]} value Any value
 */
export const setNestedKey = (obj, path, value) => {
  if (path.length === 1) {
    obj[path] = value
    return
  }
  return setNestedKey(obj[path[0]], path.slice(1), value)
}
