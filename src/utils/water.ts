import constants from './constants';
import colors from './colors';

export function waterToPercent(currentWaterLevel: number, maxWaterLevel = constants.MAX_WATER_HEIGHT) {
  const num = (((maxWaterLevel -currentWaterLevel) / maxWaterLevel) * 100).toFixed(1);
  return num + "%";
};

export function waterTankColor(currentWaterLevel: number) {
  return colors.WATER_COLORS_DEFAULT;
}

function between(x: number, min: number, max: number) {
  return x >= min && x <= max;
}