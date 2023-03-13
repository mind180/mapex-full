export const Straight = {
  BottomRight: (height, width, lineWidth) => {
    const padding = 0.5 * lineWidth;

    return "M" + padding + " " + padding +
        " L" + (width - padding) +  " " + (height - padding);
  },

  BottomLeft: (height, width, lineWidth) => {
    const padding = 0.5 * lineWidth;

    return "M" + (width - padding) + " " + padding +
        " L" + padding + " " + (height - padding);
  },

  TopRight: (height, width, lineWidth) => {
    const padding = 0.5 * lineWidth;

    return "M" + (width - padding) + " " + padding +
        " L" + padding + " " + (height - padding);
  },

  TopLeft: (height, width, lineWidth) => {
    const padding = 0.5 * lineWidth;

    return "M" + (width - padding) + " " + (height - padding) +
        " L" + padding + " " + padding;
  },
};