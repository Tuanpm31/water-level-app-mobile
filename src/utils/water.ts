import constants from './constants';
import colors from './colors';

export function waterToPercent(currentWaterLevel: number, maxWaterLevel = constants.MAX_WATER_HEIGHT) {
  const num = ((currentWaterLevel / maxWaterLevel) * 100).toFixed(1);
  return num + "%";
};

export function waterTankColor(currentWaterLevel: number) {
  if (between(currentWaterLevel, constants.ALREADY_EMPTY, constants.YEALLOW_MIN_WARNING)) {
    return colors.WARNING_COLOR;
  } else if (between(currentWaterLevel, 0, constants.ALREADY_EMPTY)) {
    return colors.DANGER_COLOR;
  } else if (between(currentWaterLevel, constants.YELLOW_WARNING, constants.RED_WARNING)) {
    return colors.WARNING_COLOR;
  } else if (between(currentWaterLevel, constants.RED_WARNING, constants.ALREADY_FULL)) {
    return colors.DANGER_COLOR;
  } else if (between(currentWaterLevel, constants.ALREADY_FULL, constants.MAX_WATER_HEIGHT)) {
    return colors.DANGER_COLOR
  } else {
    return colors.WATER_COLORS_DEFAULT;
  }
}

function between(x: number, min: number, max: number) {
  return x >= min && x <= max;
}