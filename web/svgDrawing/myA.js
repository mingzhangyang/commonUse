/**
 * Created by yangm11 on 5/24/2017.
 */
'use strict';

let mya = (function () {
  function drawArrow(params) {
    params = params || {};
    var start = params.start || [10, 10];
    var end = params.end || [50, 10];
    var angle = params.angle ? params.angle / 180 * Math.PI : Math.PI / 4;
    var len = params.len || 5;
    var close = params.close || false;
    var className = params.className || '';
    var id = params.id || '';
    var lineWidth = params.lineWidth || '2px';
    var lineColor = params.lineColor || '#000';

    var d = Math.sqrt((start[0] - end[0])*(start[0] - end[0]) + (start[1] - end[1])*(start[1] - end[1]));
    // take end point as center of a circle
    var alpha = Math.asin((start[0] - end[0]) / d);

    if (start[1] > end[1]) {
      alpha = Math.PI - alpha;
    }

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
//   start: [300, 50],
//   end: [200, 50],
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
    var tickLabels = params.tickLabels || [0, 1, 2, 3, 4, 5]; // an array required, an empty string can be used in the array to indicate 'no label here'

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

    return `<g class="${className}" id="${id}">` + boneCode + tickCode + '</g>';
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


  function drawChartFrame(params) {
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

// console.log(drawChartFrame({
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

  return {
    arrow: drawArrow,
    axis: drawAxis,
    frame: drawChartFrame
  };

})();

if (typeof module !== 'undefined' && module.parent) {
  module.exports = mya;
} else if (typeof window === 'object') {
  console.log('mya running in the browser!');
}
