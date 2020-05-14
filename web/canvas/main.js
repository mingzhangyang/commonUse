/**
 * Created by yangm11 on 9/17/2019.
 */
'use strict';

import {data, prk, arch, nbr} from "./data.js";
import {drawBar, drawMatrix, drawAxes} from "./draw.js";

const colors = ['#f66', 'orange', 'dodgerblue', 'purple'];

function bar() {
  let canvas = document.getElementById('canvas');

  drawAxes(canvas, 80, 4);

  let ctx = canvas.getContext('2d');


  ctx.translate(100, 100);
  ctx.scale(.5, 1);
  ctx.globalAlpha = .6;

  let es = ["PRK09404", "11484076", "NBR006631"];

  let i = 0;
  let t = 100;
  let h = 60;
  let d = 160;
  for (let e of es) {
    ctx.fillStyle = colors[i];
    drawBar(ctx, t + d * i, h, data[e], .1);
    i++;
  }

  ctx.fillStyle = 'black';
  ctx.font = "28px serif";
  ctx.scale(2, 1);
  ctx.fillRect(0, 624, 4, 6);
  ctx.fillText("0", -5, 660);
  ctx.fillRect(250, 624, 4, 6);
  ctx.fillText("5000", 220, 660);
  ctx.fillRect(500, 624, 4, 6);
  ctx.fillText("10000", 470, 660);
  ctx.fillRect(750, 624, 4, 6);
  ctx.fillText("15000", 720, 660);
  ctx.fillRect(1000, 624, 4, 6);
  ctx.fillText("20000", 970, 660);
}

function matrix() {
  drawMatrix(ctx, 2, 200, 100, prk, colors[0], true);

  ctx.translate(300, 0);
  drawMatrix(ctx, 2, 200, 100, arch, colors[1], true);

  ctx.translate(300, 0);
  drawMatrix(ctx, 2, 200, 100, nbr, colors[2], true);

  ctx.translate(300, 0);
  drawMatrix(ctx, 2, 200, 100, prk, colors[0], false);
  drawMatrix(ctx, 2, 200, 100, arch, colors[1], false);
  drawMatrix(ctx, 2, 200, 100, nbr, colors[2], false);
}

// test code or run as executable
function main() {
  let canvas = document.getElementById('canvas');

  let ctx = canvas.getContext('2d');
  ctx.globalAlpha = .5;

  ctx.translate(100, 100);

  ctx.fillStyle = "purple";
  ctx.fillRect(0, 280, 1000, 40);

  ctx.fillStyle = "#f66";
  ctx.strokeRect(200, 20, 120, 40);
  ctx.font = "24px serif";
  ctx.fillText("PRK09404.1", 200, 10);

  ctx.globalAlpha = .05;
  ctx.strokeStyle = "#f66";
  ctx.scale(.05, 1);
  ctx.beginPath();
  for (let i = 0; i < prk.length; i++) {
    if (prk[i]) {

    }
  }
  ctx.stroke();
}

window.onload = main;


