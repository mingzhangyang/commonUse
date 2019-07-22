export function d2Alpha(d, R, r) {
  return Math.acos((d * d + r * r - R * R) / (2 * d * r));
}

export function d2Theta(d, R, r) {
  return Math.acos((d * d + R * R - r * r) / (2 * d * R));
}

export function d2Area(d, R, r) {
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
