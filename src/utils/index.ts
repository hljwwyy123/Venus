export function coordinate2dTo3d(x, y, width, height) {
  let w = width / 2,
      h = height / 2,
      glX = (x - w) / w,
      glY = (h - y) / h;
  return {x: glX, y: glY}
}