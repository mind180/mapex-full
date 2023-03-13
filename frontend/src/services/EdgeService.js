/**
 * Returns: new edge object with from and to related positions
 * 
 * @param  {Object} from 
 * @param  {Object} to
 * @return {Object} return new edge object
 */
export function createEdge(from, to) {
  const temporaryRandomId = Math.floor(Math.random() * 10000 + 1000).toString();

  const newEdge = {
    id: temporaryRandomId,
    from: from,
    to: to
  }
  
  return newEdge;
}

/**
 * Delete edges from edges array which match ids
 * 
 * @param  {Array}  edges   all edges
 * @param  {Array}  edgeIds edge ids to be deleted
 * @return {Array}  not deleted edges
 */
export function deleteEdges(edges, edgeIds) {
  const notDeletedEdges = edges.filter(edge => 
    edgeIds.indexOf(edge.id) === -1);
    
  return notDeletedEdges;
}

/**
 * 
 * @param {Array} edges 
 * @param {Map} mapUpdatedEdges [id, Edge]
 */
export function setUpdatedEdges(edges, mapUpdatedEdges) {  
  edges.forEach(edge => {
    const updatedEdge = mapUpdatedEdges.get(edge.id);
    
    if (updatedEdge) {
      edge.from = updatedEdge.from;
      edge.to = updatedEdge.to;
    }
  });
}
