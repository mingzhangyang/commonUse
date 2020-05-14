'use strict';

import {Circle, draw} from "./draw.js";
import {calcD, Point} from './utils.js';

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

  // console.log(calcD(150, 90, .12));
  // console.log(calcD(150, 90, .27));
  // console.log(calcD(150, 90, .32));
  // console.log(calcD(150, 90, .42));
  // console.log(calcD(150, 90, .56));
  // console.log(calcD(150, 90, .68));
  // console.log(calcD(150, 90, .75));
  // console.log(calcD(150, 90, .81));
  // console.log(calcD(150, 90, .99));

  console.log(Point.angle(new Point(1, 1,), new Point(2, 2)));
  console.log(Point.angle(new Point(1, 1,), new Point(2, 1)));
  console.log(Point.angle(new Point(1, 1,), new Point(1, 2)));
  console.log(Point.angle(new Point(1, 1,), new Point(2, 3)));
  console.log(Point.angle(new Point(1, 1,), new Point(2, 0)));
  console.log(Point.angle(new Point(1, 1,), new Point(0, 2)));
  console.log(Point.angle(new Point(1, 1,), new Point(0, 0)));

};

main();