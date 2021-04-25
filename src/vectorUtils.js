/* vector2d = [x, y] */

const vectorLength = (v) => {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
};

const getUnitVector = (v, length) => {
  length = length || vectorLength(v);
  return [v[0] / length, v[1] / length];
};
