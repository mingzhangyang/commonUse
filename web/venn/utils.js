function d2Alpha(d, R, r) {
  return Math.acos((d * d + r * r - R * R) / (2 * d * r));
}

function d2Theta(d, R, r) {
  return Math.acos((d * d + R * R - r * r) / (2 * d * R));
}

function d2Area(d, R, r) {
  if (d > (R + r)) {
    return 0;
  }
  if (d < (R - r)) {
    return Math.PI * r * r;
  }
  let alpha = d2Alpha(d, R, r);
  let theta = d2Theta(d, R, r);
  let a = alpha * r * r - r * r * Math.sin(alpha) * Math.cos(alpha);
  let b = theta * R * R - R * R *  Math.sin(theta) * Math.cos(theta);
  return a + b;
}

/**
 * Calculate d given R, r and the expected percentage of the area of the intersection to the area of the smaller circle
 * @param R
 * @param r
 * @param percentage
 */
export function calcD(R, r, percentage) {
  if (percentage < 0 || percentage > 1) {
    console.error("percentage is invalid.");
    return NaN;
  }
  if (percentage < .005) {
    return R + r;
  }
  if (percentage > .995) {
    return R - r;
  }
  let start = R + r;
  let dd = r / 500; // 2 * r / 1000
  let aa = Math.PI * r * r;
  for (let i = 1; i < 1000; i++) {
    let d = start - dd * i;
    let a = d2Area(d, R, r);
    let ratio = a / aa;
    if (percentage - ratio < .005) {
      console.log(`expected: ${percentage}, got: ${ratio}`);
      return d;
    }
  }
}

export class Point {
  constructor(x, y) {
    // this is a private class, all the inputs can be trusted.
    if (x === undefined && y === undefined) {
      x = 0;
      y = 0;
    }
    this.x = x;
    this.y = y;
  }
  static distance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  }
  static angle(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x);
  }
  toSVGCoor(origin) {
    return [origin.x + this.x, origin.y - this.y];
  }
  toString() {
    return `Point {x: ${this.x}, y: ${this.y}}`;
  }
  getCoors() {
    return [this.x, this.y];
  }
}