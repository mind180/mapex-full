export const HorizontalRectangular = {
  BottomRight: (height, width, lineWidth) => {
    const padding = 0.5 * lineWidth;

    return "M" + padding + " " + padding +
        " L" + (width / 2) +  " " + (padding) +
        " L" + (width / 2) +  " " + (height - padding) +
        " L" + (width - padding) +  " " + (height - padding);
  },

  BottomLeft: (height, width, lineWidth) => {
    const padding = 0.5 * lineWidth;

    return "M" + (width - padding) + " " + padding +
        " L" + (width / 2) +  " " + (padding) +
        " L" + (width / 2) +  " " + (height - padding) +
        " L" + padding + " " + (height - padding);
  },

  TopRight: (height, width, lineWidth) => {
    const padding = 0.5 * lineWidth;

    return "M" + (padding) + " " + (height - padding) +
        " L" + (width / 2) +  " " + (height - padding) +
        " L" + (width / 2) +  " " + (padding) +
        " L" + (width - padding) + " " + (padding);
  },

  TopLeft: (height, width, lineWidth) => {
    const padding = 0.5 * lineWidth;

    return "M" + (width - padding) + " " + (height - padding) +
        " L" + (width / 2) +  " " + (height - padding ) +
        " L" + (width / 2) +  " " + (padding) +
        " L" + padding + " " + padding;
  },
};

export const VerticalRectangular = {
  BottomRight: (height, width, lineWidth) => {
    const padding = 0.5 * lineWidth;

    return "M" + padding + " " + padding +
        " L" + (padding) +  " " + (height / 2) +
        " L" + (width - padding) +  " " + (height / 2) +
        " L" + (width - padding) +  " " + (height - padding);
  },

  BottomLeft: (height, width, lineWidth) => {
    const padding = 0.5 * lineWidth;

    return "M" + (width - padding) + " " + padding +
        " L" + (width - padding) +  " " + (height/ 2) +
        " L" + (padding) +  " " + (height / 2) +
        " L" + padding + " " + (height - padding);
  },

  TopRight: (height, width, lineWidth) => {
    const padding = 0.5 * lineWidth;

    return "M" + (padding) + " " + (height - padding) +
        " L" + (padding) +  " " + (height / 2) +
        " L" + (width - padding) +  " " + (height / 2) +
        " L" + (width - padding) + " " + (padding);
  },

  TopLeft: (height, width, lineWidth) => {
    const padding = 0.5 * lineWidth;

    return "M" + (width - padding) + " " + (height - padding) +
        " L" + (width - padding) +  " " + (height / 2) +
        " L" + (padding) +  " " + (height / 2) +
        " L" + padding + " " + padding;
  },
};