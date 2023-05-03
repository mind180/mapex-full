export const zoneSize = 100;
export const minWidth = zoneSize * 9;
export const minHeight = zoneSize;

export function getMostDownNode(nodes) {
  return nodes.sort((a, b) => b.position.y - a.position.y)[0];
} 

export function getMostRighterNode(nodes) {
  return nodes.sort((a, b) => b.position.x - a.position.x)[0];
}
