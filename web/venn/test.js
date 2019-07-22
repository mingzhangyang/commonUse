'use strict';

import {Circle} from "./circle.js";
import {draw} from "./draw.js";
import {d2Alpha, d2Theta, d2Area} from './utils.js';

const main = () => {
  let c1 = new Circle({
    center: [150, 150],
    radius: 150,
    otherProps: {
      fill: "dodgerblue",
      opacity: .8
    }
  });
  let c2 = new Circle({
    center: [220, 150],
    radius: 90,
    otherProps: {
      fill: "#f66",
      opacity: .5
    }
  });
  draw('svg', [c1, c2]);

  let a = Math.PI / 12;
  // for (let i  = 0; i < 25; i++) {
  //   console.log(i * 15, alpha2area(i * a, 8, 4) / (16 * Math.PI));
  // }
  // for (let i  = 0; i < 25; i++) {
  //   console.log(i * 15, alpha2d(i * a, 8, 4));
  // }

  // for (let i = 0; i < 17; i++) {
  //   console.log(12 - i * .5, alpha2area(d2Alpha(8, 4, 12 - i * .5), 8, 4) / (Math.PI * 4 * 4));
  // }

  // console.log(d2Alpha(8, 4, 12));
  // console.log(d2Alpha(8, 4, 4));

  let t = 0;
  for (let i = 250; i > 0; i--) {
    let d = i;
    let alpha = d2Alpha(d, 150, 90);
    let theta = d2Theta(d, 150, 90);
    let a = d2Area(d, 150, 90);
    
    console.log(`d: ${d}, alpha: ${alpha}, theta: ${theta}, Percentage: ${a / (Math.PI * 90 * 90)}`);
  }

  console.log(d2Alpha(60, 150, 90) / Math.PI * 180);
  console.log(d2Theta(60, 150, 90) / Math.PI * 180);
  console.log(d2Area(60, 150, 90) / (Math.PI * 90 * 90));

};

main();