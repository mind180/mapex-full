export const position = {
  BottomRight: (from, to, lineWidth) => {
    const correction = lineWidth - 1;

    return {
      x: from.x - correction / 2,
      y: from.y - correction / 2,
      width: to.x - from.x + lineWidth,
      height: to.y - from.y + lineWidth
    };
  },

  BottomLeft: (from, to, lineWidth) => {
    const correction = lineWidth - 1;

    return {
      x: to.x - correction / 2,
      y: from.y - correction / 2,
      width: from.x - to.x + lineWidth,
      height: to.y - from.y + lineWidth
    };
  },

  TopRight: (from, to, lineWidth) => {
    const correction = lineWidth - 1;

    return {
      x: from.x - correction / 2,
      y: to.y - correction / 2,
      width: to.x - from.x + lineWidth,
      height: from.y - to.y + lineWidth
    };
  },

  TopLeft: (from, to, lineWidth) => {
    const correction = lineWidth - 1;

    return {
      x: to.x - correction / 2,
      y: to.y - correction / 2,
      width: from.x - to.x + lineWidth,
      height: from.y - to.y + lineWidth
    };
  }
};