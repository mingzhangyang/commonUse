/**
 * Created by yangm11 on 7/24/2019.
 */

'use strict';

import {Point} from './utils.js';

class VennSet {
  constructor(name, count, intersections) {
    this.name = name;
    this.count = count;
  }

  setOrigin(x, y) {
    if (x === undefined && y === undefined) {
      x = 0;
      y = 0;
    }
    this.origin = new Point(x, y);
  }

  setRadius(st) {
    this.radius = 100 * Math.sqrt(this.count / st);
  }
}

