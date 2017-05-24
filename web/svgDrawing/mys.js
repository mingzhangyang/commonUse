/**
 * Created by yangm11 on 5/24/2017.
 */
'use strict';

let mys = (function () {
  function linearScale(opts) {
    opts = opts || {};
    let that = {};
    that.from = opts.from || [0, 1];
    that.to = opts.to || [0, 1];
    that.outRangeTolerance = false;
    that.convert = function (x) {
      if (x < that.from[0]) {
        if (that.outRangeTolerance) {
          return that.to[0];
        } else {
          console.log('Out of range!');
          return;
        }
      }
      if (x > that.from[1]) {
        if (that.outRangeTolerance) {
          return that.to[1];
        } else {
          console.log('Out of range!');
          return;
        }
      }
      return (x - that.from[0]) / (that.from[1] - that.from[0]) * (that.to[1] - that.to[0]) + that.to[0];
    };

    return that;
  }

  function colorScale(options) {
    options = options || {};
    let that = {};
    that.min = options.min;
    that.max = options.max;

    if (typeof that.min === 'undefined') {
      throw new Error('min value not defined!');
    }
    if (typeof that.max === 'undefined') {
      throw new Error('max value not defined!');
    }

    that.start = options.start || [255, 255, 255];
    that.end = options.end || [0, 0, 255];

    let min = that.min;
    let max = that.max;
    let start = that.start;
    let end = that.end;

    that.rF = function (val) {
      return Math.round(start[0] + (val - min) * (end[0] - start[0]) / (max - min));
    };

    that.gF = function (val) {
      return Math.round(start[1] + (val - min) * (end[1] - start[1]) / (max - min));
    };

    that.bF = function (val) {
      return Math.round(start[2] + (val - min) * (end[2] - start[2]) / (max - min));
    };

    that.convert = function (val) {
      if (val < that.min || val > that.max) {
        throw new Error('value out of range!');
      }

      return `rgb(${that.rF(val)},${that.gF(val)},${that.bF(val)})`;
    };

    return that;
  }

  return {
    linScale: linearScale,
    colorScale: colorScale
  }
})();

if (typeof module !== 'undefined' && module.parent) {
  module.exports = mys;
} else if (typeof window === 'object') {
  console.log('mys running in the browser!');
}