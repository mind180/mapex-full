export const zoneSize = 300;
export const minWidth = zoneSize * 3;
export const minHeight = zoneSize * 3;

export function getMostDownNode(nodes) {
  return nodes.sort((a, b) => b.position.y - a.position.y)[0];
} 

export function getMostRighterNode(nodes) {
  return nodes.sort((a, b) => b.position.x - a.position.x)[0];
}
