/**
 * Created by yangm11 on 9/19/2019.
 */
'use strict';

export function drawBar(ctx, y, h, arr, ratio) {
  for (let d of arr) {
    ctx.fillRect(d[0] * ratio, y,(d[1] - d[0]) * ratio, h);
    // console.log('1');
  }
}

export function drawMatrix(ctx, n, rows, cols, arr, color, bg) {
  for (let i = 0; i < arr.length; i++) {
    let c = i % cols;
    let r = (i - c) / cols;
    if (arr[i]) {
      ctx.fillStyle = color;
      ctx.fillRect(c * n, r * n, n, n);
    } else {
      if (bg) {
        ctx.fillStyle = "rgb(240, 240, 240)";
        ctx.fillRect(c * n, r * n, n, n);
      }
    }
  }
}

export function drawAxes(canvas, padding, width) {
  let rect = canvas.getBoundingClientRect();
  let ctx = canvas.getContext('2d');
  if (padding === undefined) {
    padding = 100;
  }
  if (width === undefined) {
    width = 4;
  }
  ctx.save();
  ctx.fillStyle = "black";
  ctx.globalAlpha = .8;

  let w = rect.width - 2 * padding;
  let h = rect.height - 2 * padding;
  ctx.fillRect(padding, padding, width, h);
  ctx.fillRect(padding, rect.height - padding, w, width);
  ctx.restore();

  return {
    width: w,
    height: h
  };
}