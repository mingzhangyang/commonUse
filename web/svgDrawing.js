/**
 * Created by yangm11 on 4/17/2017.
 */
'use strict';

var drawing = (function drawing() {

  function drawArc(params) {
    params = params || {};
    var center = params.center || [100, 100];
    var r = params.radius || 100;
    var angle = params.angle ? params.angle / 180 * Math.PI : Math.PI/2;
    var startAngle = params.startAngle ? params.startAngle / 180 * Math.PI : 0;
    var lineWidth = params.lineWidth || '2px';
    var lineColor = params.lineColor || '#000';
    var id = params.id || '';
    var className = params.className || '';

    var x1 = center[0] + r * Math.sin(startAngle);
    var y1 = center[1] - r * Math.cos(startAngle);
    var rot = 0;
    var laf = angle > Math.PI ? 1 : 0;
    var sf = 1;
    var x2 = center[0] + r * Math.sin(angle + startAngle);
    var y2 = center[1] - r * Math.cos(angle + startAngle);

    return {
      points: [[x1, y1], [x2, y2]],
      template: `<g><path class="${className}" id="${id}" d="M ${x1} ${y1} A ${r} ${r}, ${rot}, ${laf}, ${sf}, ${x2} ${y2}" fill="transparent" stroke="${lineColor}" stroke-width="${lineWidth}"></path></g>`
    };
  }

// console.log(drawArc({
//   center: [180, 180],
//   radius: 150,
//   angle: 200,
//   startAngle: -120
// }));

  function drawSector(params) {
    params = params || {};
    var center = params.center || [100, 100];
    var r = params.radius || 100;
    var angle = params.angle ? params.angle / 180 * Math.PI : Math.PI/2;
    var startAngle = params.startAngle ? params.startAngle / 180 * Math.PI : 0;
    var fill = params.fill || 'transparent';
    var lineColor = params.lineColor || '#000';
    var lineWidth = params.lineWidth || '2px';
    var fillOpacity = params.fillOpacity || '1';
    var className = params.className || '';
    var id = params.id || '';

    var x1 = center[0] + r * Math.sin(startAngle);
    var y1 = center[1] - r * Math.cos(startAngle);
    var rot = 0;
    var laf = angle > Math.PI ? 1 : 0;
    var sf = 1;
    var x2 = center[0] + r * Math.sin(angle + startAngle);
    var y2 = center[1] - r * Math.cos(angle + startAngle);

    return {
      points: [center, [x1, y1], [x2, y2]],
      template: `<g><path class="${className}" id="${id}" d="M${x1} ${y1} A ${r} ${r}, ${rot}, ${laf}, ${sf}, ${x2} ${y2} L ${center[0]} ${center[1]} Z" fill="${fill}" stroke="${lineColor}" stroke-width="${lineWidth}" fill-opacity="${fillOpacity}"></path></g>`
    };
  }

// console.log(drawSector({
//   center: [200, 200],
//   radius: 150,
//   startAngle: 30,
//   angle: 240,
//
// }));

  /*
   * function for converting a style object to inline CSS style string.
   * e.g. {fill: 'blue', 'stroke-width': '5px', stroke: '#f66'}  =>
   * 'fill: blue; stroke-width: 5px; stroke: #f66; '
   *
   * To be noted, inline CSS for svg elements is different from normal html
   * elements.
   *
   */

  function styleObjectToString(obj) {
    var props = Object.keys(obj);
    var result = '';
    for (var prop of props) {
      result += (prop + ': ' + obj[prop] + ';');
    }
    return result;
  }

  /*
   * compute the distance between two points with the coordinates of the points
   * the parameters are arrays, e.g [x1, y1]
   */
  function distance(p1, p2) {
    return Math.sqrt((p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1]));
  }

  function drawAnnulus(params) {
    params = params || {};
    var oR = params.outerRadius || (params.innerRadius ? params.innerRadius * 1.2 : 100);
    var iR = params.innerRadius || (params.outerRadius ? params.outerRadius * 0.8 : 80);
    var startAngle = params.startAngle ? params.startAngle / 180 * Math.PI : 0;
    var angle = params.angle ? params.angle / 180 * Math.PI : Math.PI / 3;
    var center = params.center || [100, 100];
    var endAngle = startAngle + angle;
    var fill = params.fill || 'transparent';
    var fillOpacity = params.fillOpacity || '1';
    var lineWidth = params.lineWidth || '2px';
    var lineColor = params.lineColor || '#000';
    var className = params.className || '';
    var id = params.id || '';

    var x1, y1, x2, y2, x3, y3, x4, y4;

    var rot = 0;
    var laf = angle > Math.PI ? 1 : 0;
    var sf = 1;

    x1 = center[0] + oR * Math.sin(startAngle);
    y1 = center[1] - oR * Math.cos(startAngle);
    x2 = center[0] + oR * Math.sin(endAngle);
    y2 = center[1] - oR * Math.cos(endAngle);

    x3 = center[0] + iR * Math.sin(startAngle);
    y3 = center[1] - iR * Math.cos(startAngle);
    x4 = center[0] + iR * Math.sin(endAngle);
    y4 = center[1] - iR * Math.cos(endAngle);

    return `<g class="${className}" id="${id}"><path d="M ${x1} ${y1} A ${oR} ${oR}, ${rot}, ${laf}, ${sf}, ${x2} ${y2} L ${x4} ${y4} A ${iR} ${iR}, ${rot}, ${laf}, ${sf ? 0 : 1}, ${x3} ${y3} L ${x1} ${y1} Z" fill="${fill}" fill-opacity="${fillOpacity}" stroke="${lineColor}" stroke-width="${lineWidth}"></path></g>`;

  }

// console.log(drawAnnulus({
//   center: [300, 300],
//   outerRadius: 250,
//   innerRadius: 120,
//   startAngle: -30,
//   angle: 120,
//   style: {
//     fill: 'blue',
//     'stroke-width': '50px',
//     'stroke': '#f66',
//   }
// }));

  /*
   * To draw a line segment
   * x, y is the coordinates of the center
   * r is the radius of the radius of inner circle
   * len is the length of the bar spanning inner and outer circle
   * ang is the angle from vertical bar
   * extra is the tail of the bar, specified by h and v distance
   */
  function drawBar(params) {
    params = params || {};
    var x = params.x || 100;
    var y = params.y || 100;
    var r = params.r || 50;
    var ang = params.angle || 0;
    var len = params.len || 20;
    var lineWidth = params.lineWidth || '2px';
    var lineColor = params.lineColor || '#000';

    ang = ang / 180 * Math.PI;

    var x1 = x + r * Math.sin(ang);
    var y1 = y - r * Math.cos(ang);

    var x2 = x + (r + len) * Math.sin(ang);
    var y2 = y - (r + len) * Math.cos(ang);

    return {
      start: [x1, y1],
      end: [x2, y2],
      template: `<path d="M${x1} ${y1} L ${x2} ${y2}" stroke="${lineColor}" stroke-width="${lineWidth}"></path>`
    };
  }

// console.log(drawBar(300, 300, 150, 30, 10, {h: 20, v: 0}));
//
// var path = '';
// for (var i = 0; i < 24; i++) {
//   path += drawBar(300, 300, 150, 15 * i, 30, {h: 20, v: 0});
// }
//
// console.log(path);

  /*
   * draw arrows on a circle
   * startAngle and endAngle should be radian not degree.
   */
  function drawAngle(params) {
    params = params || {};
    var x = params.center[0] || 100;
    var y = params.center[1] || 100;
    var r = params.radius || 80;
    var len = params.size || 20;
    var startAngle = params.startAngle ? params.startAngle / 180 * Math.PI : 0;
    var endAngle = params.endAngle ? params.endAngle / 180 * Math.PI : startAngle + Math.PI / 18;
    var close = params.close || false;
    var lineWidth = params.lineWidth || '2px';
    var lineColor = params.lineColor || '#000';
    var fill = params.fill || 'transparent';
    var fillOpacity = params.fillOpacity || '1';


    startAngle = startAngle / 180 * Math.PI;
    endAngle = endAngle ? endAngle / 180 * Math.PI : (startAngle + 15) / 180 * Math.PI;

    var x1 = x + (r - len) * Math.sin(startAngle);
    var y1 = y - (r - len) * Math.cos(startAngle);

    var x2 = x + (r + len) * Math.sin(startAngle);
    var y2 = y - (r + len) * Math.cos(startAngle);

    var x3 = x + r * Math.sin(endAngle);
    var y3 = y - r * Math.cos(endAngle);

    if (close) {
      return `<path d="M ${x1} ${y1} L ${x3} ${y3} L ${x2} ${y2} Z" fill="${fill}" fill-opacity="${fillOpacity}" stroke="${lineWidth}" stroke-width="${lineColor}"></path>`;
    } else {
      return `<path d="M ${x1} ${y1} L ${x3} ${y3} L ${x2} ${y2}" fill="${fill}" fill-opacity="${fillOpacity}" stroke="${lineWidth}" stroke-width="${lineColor}"></path>`;
    }
  }

// var path = '';
// for (var i = 0; i < 24; i++) {
//   path += drawAngle();
// }
//
// console.log(path);

  function drawAnnulusWithArrow(params) {
    params = params || {};
    var center = params.center || [100, 100];
    var startAngle = params.startAngle ? params.startAngle / 180 * Math.PI : 0;
    var angle = params.angle ? params.angle / 180 * Math.PI : Math.PI / 3;
    var iR = params.innerRadius || (params.outerRadius ? params.outerRadius * 0.8 : 80);
    var oR = params.outerRadius || (params.innerRadius ? params.innerRadius * 1.2 : 100);
    var forward = (params.forward === undefined) ?  true : params.forward;
    var endAngle;
    var d = (oR - iR) * 0.5;
    var id = params.id || '';
    var className = params.className || '';
    var lineWidth = params.lineWidth || '2px';
    var lineColor = params.lineColor || '#000';
    var fill = params.fill || 'transparent';
    var fillOpacity = params.fillOpacity || '1';

    if (forward) {
      endAngle = startAngle + angle - Math.PI / 18;
    } else {
      endAngle = startAngle + angle;
      startAngle += Math.PI / 18;
    }

    var x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, x7, y7;

    var rot = 0;
    var laf = angle > Math.PI ? 1 : 0;
    var sf = 1;

    x1 = center[0] + oR * Math.sin(startAngle);
    y1 = center[1] - oR * Math.cos(startAngle);
    x2 = center[0] + oR * Math.sin(endAngle);
    y2 = center[1] - oR * Math.cos(endAngle);

    x3 = center[0] + iR * Math.sin(startAngle);
    y3 = center[1] - iR * Math.cos(startAngle);
    x4 = center[0] + iR * Math.sin(endAngle);
    y4 = center[1] - iR * Math.cos(endAngle);

    if (forward) {
      x5 = center[0] + (oR + d) * Math.sin(endAngle);
      y5 = center[1] - (oR + d) * Math.cos(endAngle);

      x6 = center[0] + ((oR + iR) / 2) * Math.sin(startAngle + angle);
      y6 = center[1] - ((oR + iR) / 2) * Math.cos(startAngle + angle);

      x7 = center[0] + (iR - d) * Math.sin(endAngle);
      y7 = center[1] - (iR - d) * Math.cos(endAngle);

      return `<g id="${id}" class="${className}" stroke="${lineColor}" stroke-width="${lineWidth}" fill="${fill}" fill-opacity="${fillOpacity}"><path d="M${x1} ${y1} A ${oR} ${oR}, ${rot}, ${laf}, ${sf}, ${x2} ${y2} L ${x5} ${y5} L ${x6} ${y6} L ${x7} ${y7} L ${x4} ${y4} A ${iR} ${iR}, ${rot}, ${laf}, ${sf ? 0 : 1}, ${x3} ${y3} Z"></path></g>`;

    } else {
      x5 = center[0] + (oR + d) * Math.sin(startAngle);
      y5 = center[1] - (oR + d) * Math.cos(startAngle);

      x6 = center[0] + ((oR + iR) / 2) * Math.sin(startAngle - Math.PI / 18);
      y6 = center[1] - ((oR + iR) / 2) * Math.cos(startAngle - Math.PI / 18);

      x7 = center[0] + (iR - d) * Math.sin(startAngle);
      y7 = center[1] - (iR - d) * Math.cos(startAngle);

      return `<g id="${id}" class="${className}" stroke="${lineColor}" stroke-width="${lineWidth}" fill="${fill}" fill-opacity="${fillOpacity}"><path d="M${x7} ${y7} L ${x6} ${y6} L ${x5} ${y5} L ${x1} ${y1} A ${oR} ${oR}, ${rot}, ${laf}, ${sf}, ${x2} ${y2} L ${x4} ${y4} A ${iR} ${iR}, ${rot}, ${laf}, ${sf ? 0 : 1}, ${x3} ${y3} Z"></path></g>`;
    }
  }

// console.log(drawAnnulusWithArrow({
//   center: [180, 180],
//   forward: 1
// }));

  function drawArcWithArrow (params) {
    params = params || {};
    var center = params.center || [100, 100];
    var r = params.radius || 100;
    var startAngle = params.startAngle ? params.startAngle / 180 * Math.PI : 0;
    var angle = params.angle ? params.angle / 180 * Math.PI : Math.PI / 3;
    var len = params.size || r * 0.1;
    var forward = (params.forward === undefined) ? true : params.forward;
    var close = params.close || false;
    var id = params.id || '';
    var lineWidth = params.lineWideth || '2px';
    var lineColor = params.lineColor || '#000';

    var rot = 0;
    var laf = angle > Math.PI ? 1 : 0;
    var sf = 1;

    var x1, y1, x2, y2, x3, y3, x4, y4;

    x1 = center[0] + r * Math.sin(startAngle);
    y1 = center[1] - r * Math.cos(startAngle);
    x2 = center[0] + r * Math.sin(startAngle + angle);
    y2 = center[1] - r * Math.cos(startAngle + angle);

    if (forward) {
      x3 = center[0] + (r + len) * Math.sin(startAngle + angle - Math.PI/18);
      y3 = center[1] - (r + len) * Math.cos(startAngle + angle - Math.PI/18);
      x4 = center[0] + (r - len) * Math.sin(startAngle + angle - Math.PI/18);
      y4 = center[1] - (r - len) * Math.cos(startAngle + angle - Math.PI/18);

      if (!close) {
        return `<g id="${id}" stroke="${lineColor}" stroke-width="${lineWidth}"><path d="M${x1} ${y1} A ${r} ${r}, ${rot}, ${laf}, ${sf}, ${x2} ${y2}"></path><path d="M${x3} ${y3} L ${x2} ${y2} L ${x4} ${y4}"></path></g>`;
      } else {
        return `<g id="${id}" stroke="${lineColor}" stroke-width="${lineWidth}"><path d="M${x1} ${y1} A ${r} ${r}, ${rot}, ${laf}, ${sf}, ${x2} ${y2}" fill="transparent"></path><path d="M${x3} ${y3} L ${x2} ${y2} L ${x4} ${y4} Z"></path></g>`;
      }
    } else {
      x3 = center[0] + (r + len) * Math.sin(startAngle + Math.PI/18);
      y3 = center[1] - (r + len) * Math.cos(startAngle + Math.PI/18);
      x4 = center[0] + (r - len) * Math.sin(startAngle + Math.PI/18);
      y4 = center[1] - (r - len) * Math.cos(startAngle + Math.PI/18);

      if (!close) {
        return `<g id="${id}" stroke="${lineColor}" stroke-width="${lineWidth}"><path d="M${x1} ${y1} A ${r} ${r}, ${rot}, ${laf}, ${sf}, ${x2} ${y2}"></path><path d="M${x3} ${y3} L ${x1} ${y1} L ${x4} ${y4}"></path></g>`;
      } else {
        return `<g id="${id}" stroke="${lineColor}" stroke-width="${lineWidth}"><path d="M${x1} ${y1} A ${r} ${r}, ${rot}, ${laf}, ${sf}, ${x2} ${y2}" fill="transparent;"></path><path d="M${x3} ${y3} L ${x1} ${y1} L ${x4} ${y4} Z"></path></g>`;
      }
    }
  }

// console.log(drawArcWithArrow({
//   center: [180, 180],
//   close: 1,
//   forward: 0,
// }));

  function drawArrow(params) {
    params = params || {};
    var start = params.start || [10, 10];
    var end = params.end || [50, 10];
    var angle = params.angle ? param.angle / 180 * Math.PI : Math.PI / 4;
    var len = params.len || 5;
    var close = params.close || false;
    var className = params.className || '';
    var id = params.id || '';
    var lineWidth = params.lineWidth || '2px';
    var lineColor = params.lineColor || '#000';

    var d = Math.sqrt((start[0] - end[0])*(start[0] - end[0]) + (start[1] - end[1])*(start[1] - end[1]));
    var alpha = Math.asin((start[0] - end[0]) / d);

    var x1 = end[0] + len * Math.sin(alpha - angle);
    var y1 = end[1] - len * Math.cos(alpha - angle);
    var x2 = end[0] + len * Math.sin(alpha + angle);
    var y2 = end[1] - len * Math.cos(alpha + angle);

    if (close) {
      return `<g class="${className}" id="${id}" stroke="${lineColor}" stroke-width="${lineWidth}"><path d="M${x1} ${y1} L ${end[0]} ${end[1]} L ${x2} ${y2} Z"></path><path d="M${start[0]} ${start[1]} L ${end[0]} ${end[1]}"></path></g>`;
    }
    return `<g class="${className}" id="${id}" stroke="${lineColor}" stroke-width="${lineWidth}"><path d="M${x1} ${y1} L ${end[0]} ${end[1]} L ${x2} ${y2}"></path><path d="M${start[0]} ${start[1]} L ${end[0]} ${end[1]}"></path></g>`;
  }

// console.log(drawArrow({
//   start: [500, 50],
//   end: [600, 150],
//   close: true
// }));


  function drawAxis(params) {
    params = params || {};
    var start = params.start || [10, 10];
    var end = params.end || [50, 10];
    if (start[0] !== end[0] && start[1] !== end[1]) {
      console.log('Only horizontal or vertical axis are allowed.');
      return -1;
    }

    var bone = params.bone === undefined ? true : params.bone;
    // the axis-bone will not be shown only if it is explicitly set to be false
    var leftPadding = params.leftPadding || 0;
    var rightPadding = params.rightPadding || 0;
    var arrow = params.arrow || false;
    var tickLabels = params.tickLabels || [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // an array required, an empty string can be used in the array to indicate 'no label here'

    if (!Array.isArray(tickLabels)) {
      console.log('An array of tick labels is required.');
      return -1;
    }

    var tickPosition = params.tickPosition ? params.tickPosition : 'outer'; // 'outer' or 'inner'
    var tickLen = params.tickLen || 6;
    // set tickLen to be 0 to show no ticks on the axis
    var innerTicks = params.innerTicks || 0; // the number of inner ticks
    var labelRotation = params.labelRotation || 0;
    var labelFontSize = params.labelFontSize || '16px';
    var title = params.title || '';
    var titleFontSize = params.titleFontSize || '20px';
    var id = params.id || '';
    var className = params.className || '';
    var tickColor = params.tickColor || '#000';
    var tickWeight = params.tickWeight || '2px';
    var boneColor = params.boneColor || '#000';
    var boneWeight = params.boneWeight || '2px';

    var tickCoors = [];

    var boneCode = '';
    if (bone) {
      if (arrow) {
        boneCode = drawArrow({
          start: start,
          end: end,
          className: 'axis-bone',
          lineWidth: boneWeight,
          lineColor: boneColor
        });
      } else {
        boneCode = `<g class="axis-bone" stroke="${boneColor}" stroke-width="${boneWeight}"><path d="M${start[0]} ${start[1]} L ${end[0]} ${end[1]}"></path></g>`;
      }
    }

    var tickCode = '<g class="axis-ticks">';

    var h = (start[1] === end[1]); // h: horizontal
    var d, _d; // d: distance between two neighbouring ticks; _d: distance between two neighbouring inner ticks

    var tx1, ty1, tx2, ty2, lx, ly;
    var i = 0;

    if (h) {
      if (start[0] > end[0]) {
        leftPadding = 0 - leftPadding;
        rightPadding = 0 - rightPadding;
      }

      if (tickLabels.length > 1) {
        d = (end[0] - start[0] - leftPadding - rightPadding) / (tickLabels.length - 1);
        _d = innerTicks ? d / (innerTicks + 1) : 0;
      } else if (tickLabels.length === 1) {
        d = 0;
        _d = 0;
      } else {
        console.log('The tick labels array is empty!');
        return -1;
      }


      for (i; i < tickLabels.length; i++) {
        tx1 = start[0] + leftPadding + i * d;
        ty1 = start[1];
        tx2 = tx1;
        ty2 = (tickPosition === 'outer') ? ty1 + tickLen : ty1 - tickLen;
        lx = tx1;
        ly = (tickPosition === 'outer') ? ty2 + 16 : ty1 + 16;

        tickCoors.push([tx1, ty1]);

        tickCode += `<path d="M${tx1} ${ty1} L ${tx2} ${ty2}" stroke="${tickColor}" stroke-width="${tickWeight}"></path><text class="axis-h-labels" x="${lx}" y="${ly}" transform="rotate(${labelRotation} ${lx} ${ly})" text-anchor="middle" font-size="${labelFontSize}">${tickLabels[i]}</text>`;

        if (innerTicks && i < tickLabels.length - 1) {
          for (var j = 1; j < innerTicks + 1; j++) {
            tickCode += `<path d="M${tx1 + _d * j} ${ty1} L ${tx1 + _d * j} ${(tickPosition === 'outer') ? ty1 + tickLen/2 : ty1 - tickLen/2}"></path>`;
          }
        }
      }

      tickCode += `<text class="axis-h-title" x="${(end[0] - start[0]) / 2 + start[0]}" y="${start[1] + 45}" text-anchor="middle" font-size="${titleFontSize}">${title}</text>`;

    } else {
      if (start[1] > end[1]) {
        leftPadding = 0 - leftPadding;
        rightPadding = 0 - rightPadding;
      }

      if (tickLabels.length > 1) {
        d = (end[1] - start[1] - leftPadding - rightPadding) / (tickLabels.length - 1);
        _d = innerTicks ? d / (innerTicks + 1) : 0;
      } else if (tickLabels.length === 1) {
        d = 0;
        _d = 0;
      } else {
        console.log('The tick labels array is empty!');
        return -1;
      }

      for (i; i < tickLabels.length; i++) {
        tx1 = start[0];
        ty1 = start[1] + leftPadding + i * d;
        tx2 = (tickPosition === 'outer') ? tx1 - tickLen : tx1 + tickLen;
        ty2 = ty1;
        lx = (tickPosition === 'outer') ? tx2 - 12 : tx1 - 12;
        ly = ty1;

        tickCoors.push([tx1, ty1]);

        tickCode += `<path d="M${tx1} ${ty1} L ${tx2} ${ty2}" stroke="${tickColor}" stroke-width="${tickWeight}"></path><text class="axis-v-labels" x="${lx}" y="${ly}" transform="rotate(${labelRotation} ${lx} ${ly})" text-anchor="end" alignment-baseline="middle" font-size="${labelFontSize}">${tickLabels[i]}</text>`;

        if (innerTicks && i < tickLabels.length - 1) {
          for (var k = 1; k < innerTicks + 1; k++) {
            tickCode += `<path d="M${(tickPosition === 'outer') ? tx1 - tickLen/2 : tx1 + tickLen/2} ${ty1 + _d * k} L ${tx1} ${ty1 + _d * k}"></path>`;
          }
        }
      }

      tickCode += `<text class="axis-v-title" x="${start[0] - 45}" y="${(end[1] - start[1]) / 2 + start[1]}" text-anchor="middle" font-size="${titleFontSize}" transform="rotate(${-90} ${start[0] - 45} ${(end[1] - start[1]) / 2 + start[1]})">${title}</text>`;

    }

    tickCode += '</g>';

    return {
      tickCoors: tickCoors,
      template: `<g class="${className}" id="${id}">` + boneCode + tickCode + '</g>'
    };
  }


// console.log(drawAxis({
//   start: [60, 600],
//   end: [600, 600],
//   // arrow: true,
//   tickLabels: [2000, 2005, 2010, 2015],
//   title: 'Years',
//   bone: false,
//   innerTicks: 4,
//   className: 'myAxis',
//   id: 'axis-001',
//   leftPadding: 10,
//   rightPadding: 10
// }));



  function drawChartArea(params) {
    params = params || {};
    var corner = params.corner || [100, 100];
    var width = params.width;
    var height = params.height;
    var fill = params.fill || 'transparent';
    var gridLineColor = params.gridLineColor || '#fff';
    var leftBorder = params.leftBorder || false;
    var rightBorder = params.rightBorder || false;
    var bottomBorder = params.bottomBorder || false;
    var topBorder = params.topBorder || false;

    var showMajorGridLine = params.showMajorGridLine || false;
    var showMinorGridLine = params.showMinorGridLine || false;

    var hMajorLines = params.hMajorLines || 0; // equals v-axis tick labels
    if (hMajorLines && hMajorLines < 2) {
      console.log('hMajorLines has to be at least 2.');
      return -1;
    }

    var vMajorLines = params.vMajorLines || 0; // equals h-axis ticks labels
    if (vMajorLines && vMajorLines < 2) {
      console.log('vMajorLines has to be at least 2.');
      return -1;
    }

    if (hMajorLines !== 0 || vMajorLines !== 0) {
      showMajorGridLine = true;
    }

    var leftPadding = params.leftPadding || 0;
    var rightPadding = params.rightPadding || 0;
    var topPadding = params.topPadding || 0;
    var bottomPadding = params.bottomPadding || 0;

    var majorGridLineWidth = params.majorGridLineWidth || '2px';
    var minorGridLineWidth = params.minorGridLineWidth || '1px';
    var borderLineWidth = params.borderLineWidth || '2px';
    var borderColor = params.borderColor || '#000';
    var borders = params.borders || false;
    // set params.borders to true, all borders will be shown
    var className = params.className || '';
    var id = params.id || '';
    var figureTitle = params.figureTitle || '';

    var code = `<g class="figure-area ${className}" id="${id}" transform="translate(${corner[0]} ${corner[1]})">`;

    code += `<rect width="${width}" height="${height}" fill="${fill}"></rect>`;

    var dh; // distance between horizontal grid lines
    var dv; // distance between vertical grid lines

    if (showMajorGridLine) {
      dh = hMajorLines ? (height - topPadding - bottomPadding) / (hMajorLines - 1) : 0;
      dv = vMajorLines ? (width - leftPadding - rightPadding) / (vMajorLines - 1) : 0;
    }

    var tx, ty;
    if (dh) {
      for (var i = 0; i < hMajorLines; i++) {
        ty = leftPadding + dh * i;
        if (showMinorGridLine && i < hMajorLines - 1) {
          code += `<path class="minor-h-grid-line" d="M0 ${ty + dh * 0.5} L ${width} ${ty + dh * 0.5}" stroke="${gridLineColor}" stroke-width="${minorGridLineWidth}"></path>`;
        }

        if (ty !== 0 && ty !== height) {
          code += `<path class="major-h-grid-line" d="M0 ${ty} L ${width} ${ty}" stroke="${gridLineColor}" stroke-width="${majorGridLineWidth}"></path>`;
        }
      }
    }

    if (dv) {
      for (var j = 0; j < vMajorLines; j++) {
        tx = topPadding + dv * j;
        if (showMinorGridLine && j < vMajorLines - 1) {
          code += `<path class="minor-v-grid-line" d="M${tx + dv * 0.5} 0 L ${tx + dv * 0.5} ${height}" stroke="${gridLineColor}" stroke-width="${minorGridLineWidth}"></path>`;
        }

        if (tx !== 0 && tx !== width) {
          code += `<path class="major-v-grid-line" d="M${tx} 0 L ${tx} ${height}" stroke="${gridLineColor}" stroke-width="${majorGridLineWidth}"></path>`;
        }
      }
    }

    if (borders) {
      rightBorder = true;
      topBorder = true;
      leftBorder = true;
      bottomBorder = true;
    }

    code += `<path class="figure-area-left-border" d="M0 0 L 0 ${height}" stroke="${borderColor}" stroke-width="${borderLineWidth}" stroke-opacity="${leftBorder ? 1 : 0}"></path>`;
    code += `<path class="figure-area-top-border" d="M0 0 L ${width} 0" stroke="${borderColor}" stroke-width="${borderLineWidth}" stroke-opacity="${topBorder ? 1 : 0}"></path>`;
    code += `<path class="figure-area-right-border" d="M${width} 0 L ${width} ${height}" stroke="${borderColor}" stroke-width="${borderLineWidth}" stroke-opacity="${rightBorder ? 1 : 0}"></path>`;
    code += `<path class="figure-area-bottom-border" d="M${width} ${height} L 0 ${height}" stroke="${borderColor}" stroke-width="${borderLineWidth}" stroke-opacity="${bottomBorder ? 1 : 0}"></path>`;

    code += `<text x="${width/2}" y="-30" text-anchor="middle" font-size="24px"> ${figureTitle}</text></g>`;

    return code;

  }

// console.log(drawChartArea({
//   corner: [100, 100],
//   // fill: '#fff',
//   gridLineColor: 'grey',
//   width: 500,
//   height: 400,
//   showMajorGridLine: true,
//   showMinorGridLine: 1,
//   vMajorLines: 3,
//   hMajorLines: 3,
//   leftPadding: 20,
//   rightPadding: 20,
//   topPadding: 20,
//   bottomPadding: 20,
//   // leftBorder: true
//   // borders: true
//   figureTitle: 'This is a test'
// }));


  function LinearScale() {
    this.from = [0, 1];
    this.to = [0, 1];
    this.outRangeTolerance = false;
    this.convert = function (x) {
      if (x < this.from[0]) {
        if (this.outRangeTolerance) {
          return this.to[0];
        } else {
          console.log('Out of range!');
          return;
        }
      }
      if (x > this.from[1]) {
        if (this.outRangeTolerance) {
          return this.to[1];
        } else {
          console.log('Out of range!');
          return;
        }
      }
      return (x - this.from[0]) / (this.from[1] - this.from[0]) * (this.to[1] - this.to[0]) + this.to[0];
    }
  }

// var s = new LinearScale();
// s.from = [10, 100];
// s.to = [1, 10];
// console.log(s.convert(78));
// console.log(s.convert(178));
// console.log(s.convert(-78));
// console.log(s);


  function setFigure(config) {
    config = config || {};
    var width = config.width || 500;
    var height = config.height || 500;

    var margins = config.margins || [80, 80, 80, 80]; // top, right, bottom, left
    var vSpacing = config.vSpacing || 8; // space between v-axis and chart area
    var hSpacing = config.hSpacing || 8; // h-axis and chart area

    var figureTitle = config.figureTitle || '';
    var showGridLines = config.showGridLines || false;
    var background = config.background || 'transparent';

    var hAxisTitle = config.hAxisTitle || '';
    var vAxisTitle = config.vAxisTitle || '';

    return {
      chartArea: {
        corner: [margins[3], margins[0]],
        width: width - margins[3] - margins[1],
        height: height - margins[0] - margins[2],
        figureTitle: figureTitle,
        showMajorGridLine: showGridLines,
        fill: background
      },
      'h-Axis': {
        start: [margins[3], height - margins[2] + hSpacing],
        end: [width - margins[1], height - margins[2] + hSpacing],
        title: hAxisTitle
      },
      'v-Axis': {
        start: [margins[3] - vSpacing, height - margins[2]],
        end: [margins[3] - vSpacing, margins[0]],
        title: vAxisTitle
      },
      xRange: [margins[3], width - margins[1]],
      yRange: [height - margins[2], margins[0]]
    };
  }

// console.log(setFigure());

  /*******************************************************************************
   *
   *  data formats required:
   *
   *  bar chart / line chart / scatter chart
   *  [{label: 'A', value: 1}, {label: 'B', value: 2}, {label: 'C', value: 3}]
   *
   *  multi-bar chart
   *  [{label: 'X', value: [1, 2, 3, 4]}, {label: 'Y', value: [5, 6, 7, 8]}]
   *
   *  line chart / scatter chart
   *  [1, 2, 3, 4, 5, 6, 7, 8 ...]
   *
   *  pair-value data
   *  [{x: 1, y: 2}, {x: 3, y: 4}, {x: 5, y: 6} ...]
   *
   *  hist chart
   *  [{band: [0, 1], value: 10}, {band: [1, 2], value: 13}, ...]
   *
   ******************************************************************************/

  function prepData(arr) {
    if (typeof arr[0] === 'number') {
      return {
        min: arr.reduce(function (acc, val) {
          return acc < val ? acc : val;
        }, +Infinity),
        max: arr.reduce(function (acc, val) {
          return acc > val ? acc : val;
        }, -Infinity),
        values: arr,
        labels: arr.map(function (v, i) {return i + '';})
      }
    }

    return {
      min: arr.reduce(function (acc, val) {
        return acc < val.value ? acc : val.value;
      }, +Infinity),
      max: arr.reduce(function (acc, val) {
        return acc > val.value ? acc : val.value;
      }, -Infinity),
      values: arr.map(function (val) {return val.value}),
      labels: arr.map(function (val) {return val.label})
    }
  }

// console.log(prepData([2, 4, 6, 8, 10]));
// console.log(prepData([{
//   label: 'A',
//   value: 23
// }, {
//   label: 'B',
//   value: 43
// }, {
//   label: 'C',
//   value: 50
// }, {
//   label: 'D',
//   value: 49
// }, {
//   label: 'E',
//   value: 67
// }]));

  function getLargerNum(x) {
    var i;
    var t;
    if (x > 0) {
      if (x < 1) {
        for (i = 0; i < 10; i++) {
          t = x * Math.pow(10, i);
          if (t >= 1 && t < 10) {
            return Math.ceil(t) / Math.pow(10, i);
          }
        }
      } else if (x > 10) {
        for (i = 0; i < 10; i++) {
          t = x / Math.pow(10, i);
          if (t >= 1 && t < 10) {
            return Math.ceil(t) * Math.pow(10, i);
          }
        }
      } else {
        return Math.ceil(x);
      }
    } else if (x < 0) {
      if ((-x) < 1) {
        for (i = 0; i < 10; i++) {
          t = (-x) * Math.pow(10, i);
          if (t >= 1 && t < 10) {
            return -(Math.floor(t) / Math.pow(10, i));
          }
        }
      } else if ((-x) > 10) {
        for (i = 0; i < 10; i++) {
          t = (-x) / Math.pow(10, i);
          if (t >= 1 && t < 10) {
            return -(Math.floor(t) * Math.pow(10, i));
          }
        }
      } else {
        return -(Math.floor(-x));
      }
    } else {
      return 0;
    }
  }

// console.log(nearestNum(-0.021));

  function getSmallerNum(x) {
    var i;
    var t;
    if (x > 0) {
      if (x < 1) {
        for (i = 0; i < 10; i++) {
          t = x * Math.pow(10, i);
          if (t >= 1 && t < 10) {
            return Math.floor(t) / Math.pow(10, i);
          }
        }
      } else if (x > 10) {
        for (i = 0; i < 10; i++) {
          t = x / Math.pow(10, i);
          if (t >= 1 && t < 10) {
            return Math.floor(t) * Math.pow(10, i);
          }
        }
      } else {
        return Math.floor(x);
      }
    } else if (x < 0) {
      if ((-x) < 1) {
        for (i = 0; i < 10; i++) {
          t = (-x) * Math.pow(10, i);
          if (t >= 1 && t < 10) {
            return -(Math.ceil(t) / Math.pow(10, i));
          }
        }
      } else if ((-x) > 10) {
        for (i = 0; i < 10; i++) {
          t = (-x) / Math.pow(10, i);
          if (t >= 1 && t < 10) {
            return -(Math.ceil(t) * Math.pow(10, i));
          }
        }
      } else {
        return -(Math.ceil(-x));
      }
    } else {
      return 0;
    }
  }

// console.log(getSmallerNum(0.24));

  function dataToCoordinates(data, dataRange, coorRange) {
    var scale = new LinearScale();

    scale.from = dataRange;
    scale.to = coorRange;

    return data.map(function (v) {
      return scale.convert(v);
    });
  }

  function drawLabeValuePairs(arr, xRange, yRange, options) {
    options = options || {};
    var lineColor = options.lineColor || '#000';
    var lineWidth = options.lineWidth || '2px';
    var pointFill = options.pointFill || '#00';
    var pointSize = options.pointSize || '3px';
    var pointBorder = options.pointBorder || '#000';
    var pointBorderWeight = pointBorderWeight || '2px';
    var fillOpacity = options.fillOpacity || 1;

    var data = prepData(arr);
    var vMin = getSmallerNum(data.min);
    var vMax = getLargerNum(data.max);
    var d = (vMax - vMin) / 5;

    var ValueYCoors = dataToCoordinates(data.values, [vMin, vMax], yRange);
    var LabelXCoors = data.labels.map(function (v, i) {
      return xRange[0] + i * (xRange[1] - xRange[0]) / (data.labels.length - 1);
    });

    // console.log(LabelXCoors, ValueYCoors);

    var points = '';
    for (var j = 0; j < ValueYCoors.length; j++) {
      points += `<circle class="data-circles" cx="${LabelXCoors[j]}" cy="${ValueYCoors[j]}" r="${pointSize}" fill="${pointFill}" fill-opacity="${fillOpacity}" stroke="${pointBorder}" stroke-width="${pointBorderWeight}"></circle>`;
    }

    var line = '<path d="M';
    for (var k = 0; k < ValueYCoors.length; k++) {
      line += ` ${LabelXCoors[k]} ${ValueYCoors[k]} L`;
    }
    line = line.slice(0, -2) + `" stroke="${lineColor}" stroke-width="${lineWidth}" fill="transparent"></path>`;

    return {
      hAxisTickLabels: data.labels,
      vAxisTickLabels: [0, 1, 2, 3, 4, 5].map(function (val) {
        return (vMin + d * val) + '';
      }),
      points: points,
      line: line
    }
  }


  function drawXLableYValueLineChart(arr, options) {
    options = options || {};

    var settings = setFigure({showGridLines: true});
    var c = settings['chartArea'];
    var hA = settings['h-Axis'];
    var vA = settings['v-Axis'];
    var xRange = settings.xRange;
    var yRange = settings.yRange;

    // console.log(xRange, yRange);

    var data = drawLabeValuePairs(arr, xRange, yRange);

    hA.tickLabels = data.hAxisTickLabels;
    vA.tickLabels = data.vAxisTickLabels;

    if (options.showGridLines) {
      c.hMajorLines = hA.tickLabels.length;
      c.vMajorLines = vA.tickLabels.length;
    }

    if (options.verticalGridLine) {
      c.vMajorLines = vA.tickLabels.length;
    }

    if (options.horizontalGridLines) {
      c.hMajorLines = hA.tickLabels.length;
    }

    var hAxis = drawAxis(hA) ;
    var vAxis = drawAxis(vA);
    var area = drawChartArea(c);

    return '<g>' + hAxis + vAxis + area + data.points + data.line + '</g>';

  }

  // console.log(drawXLableYValueLineChart([{
  //   label: 'A',
  //   value: 23
  // }, {
  //   label: 'B',
  //   value: 43
  // }, {
  //   label: 'C',
  //   value: 50
  // }, {
  //   label: 'D',
  //   value: 49
  // }, {
  //   label: 'E',
  //   value: 67
  // }], {horizontalGridLines: true}));


  return {
    axis: drawAxis,
    arrow: drawArrow,
    arc: drawArc,
    arcWithArrow: drawArcWithArrow,
    sector: drawSector,
    annulus: drawAnnulus,
    annulusWithArrow: drawAnnulusWithArrow,
    barOnCircle: drawBar,
    angleAlongCircle: drawAngle
  }
})();