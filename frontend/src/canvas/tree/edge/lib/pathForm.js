import { HorizontalCurve, VerticalCurve } from './line-types/curve';
import { HorizontalRectangular, VerticalRectangular } from './line-types/rectangular';
import { Straight } from './line-types/straight';

export const pathForm = {
  curve: {
    horizontal: HorizontalCurve,
    vertical: VerticalCurve
  },
  rectangular: {
    horizontal: HorizontalRectangular,
    vertical: VerticalRectangular
  },
  straight: {
    horizontal: Straight,
    vertical: Straight
  }
};