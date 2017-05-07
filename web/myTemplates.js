/**
 * Created by yangm11 on 4/17/2017.
 */
'use strict';

var myt = (function () {
  function comp1(options) {
    options = options || {};
    // let repeat = options.repeat || 1;
    let className = options.className || 'my-component-1';
    let labelList = options.labelList || ['Label'];
    let idList = options.idList || [];
    let template = '';
    for (let i = 0; i < labelList.length; i++) {
      if (idList.length) {
        template += `<div class="${className}"><div><lable for="input">${labelList[i]}</lable></div><input type="text" id="${idList[i]}" placeholder=""></div>`;
      } else {
        template += `<div class="${className}"><div><lable for="input">${labelList[i]}</lable></div><input type="text" placeholder=""></div>`
      }
    }
    return template;
  }

// console.log(comp1());

  function tableFromJSON(json) {
    let headers = [];
    for (let i = 0; i < json.length; i++) {
      let props = Object.keys(json[i]);
      for (let j = 0; j < props.length; j++) {
        if (headers.includes(props[j])) {
          continue;
        }
        headers.push(props[j]);
      }
    }
    let template = '<table><tr>';
    for (let i = 0; i < headers.length; i++) {
      template += `<th>${headers[i]}</th>`
    }
    template += '</tr>';
    let value;
    for (let i = 0; i < json.length; i++) {
      template += '<tr>';
      for (let j = 0; j < headers.length; j++) {
        value = json[i][headers[j]];
        template += `<td>${value ? value : ''}</td>`;
      }
      template += '</tr>';
    }
    template += '</table>';
    return template;
  }

// console.log(table([{
//   A: 3,
//   B: 4,
//   C: 5,
//   D: 6
// }, {
//   A: 12,
//   B: 15,
//   C: 16,
//   D: 17
// }, {
//   A: 32,
//   B: 34,
//   C: 35,
//   D: 36
// }]));

  function inputTable(headers, rows) {
    let template = '<table><tr>';
    for (let i = 0; i < headers.length; i++) {
      template += `<th>${headers[i]}</th>`;
    }
    template += '</tr>';
    for (let i = 0; i < rows; i++) {
      template += '<tr>';
      for (let j = 0; j < headers.length; j++) {
        template += `<td><input type="text" placeholder=""></td>`;
      }
      template += '</tr>';
    }
    template += '</table>';
    return template;
  }

// console.log(inputTable(['A', 'B', 'C', 'D'], 6));

  function tableFromString(str, delimiter) { // a csv string or tsv string
    let template = '<table><tr>';
    let idx = str.indexOf('\n');
    let headerLine = str.slice(0, idx);
    let headers = headerLine.split(delimiter);
    for (let i = 0; i < headers.length; i++) {
      template += `<th>${headers[i]}</th>`;
    }
    template += '</tr>';
    let data = str.slice(idx + 1).split('\n');
    for (let i = 0; i < data.length; i++) {
      template += '<tr>';
      let line = data[i].split(delimiter);
      for (let j = 0; j < line.length; j++) {
        template += `<td>${line[j]}</td>`;
      }
      template += '</tr>';
    }
    return template;
  }

// var ufo = `City,Colors Reported,Shape Reported,State,Time
// Ithaca,,TRIANGLE,NY,6/1/1930 22:00
// Willingboro,,OTHER,NJ,6/30/1930 20:00
// Holyoke,,OVAL,CO,2/15/1931 14:00
// Abilene,,DISK,KS,6/1/1931 13:00
// New York Worlds Fair,,LIGHT,NY,4/18/1933 19:00
// Valley City,,DISK,ND,9/15/1934 15:30
// Crater Lake,,CIRCLE,CA,6/15/1935 0:00
// Alma,,DISK,MI,7/15/1936 0:00
// Eklutna,,CIGAR,AK,10/15/1936 17:00
// Hubbard,,CYLINDER,OR,6/15/1937 0:00
// Fontana,,LIGHT,CA,8/15/1937 21:00
// Waterloo,,FIREBALL,AL,6/1/1939 20:00
// Belton,RED,SPHERE,SC,6/30/1939 20:00
// Keokuk,,OVAL,IA,7/7/1939 2:00
// Ludington,,DISK,MI,6/1/1941 13:00
// Forest Home,,CIRCLE,CA,7/2/1941 11:30
// Los Angeles,,,CA,2/25/1942 0:00
// Hapeville,,,GA,6/1/1942 22:30
// Oneida,,RECTANGLE,TN,7/15/1942 1:00
// Bering Sea,RED,OTHER,AK,4/30/1943 23:00
// Nebraska,,DISK,NE,6/1/1943 15:00
// ,,,LA,8/15/1943 0:00
// ,,LIGHT,LA,8/15/1943 0:00
// Owensboro,,RECTANGLE,KY,10/15/1943 11:00
// Wilderness,,DISK,WV,1/1/1944 10:00
// San Diego,,CIGAR,CA,1/1/1944 12:00
// Wilderness,,DISK,WV,1/1/1944 12:00
// Clovis,,DISK,NM,4/2/1944 11:00
// Los Alamos,,DISK,NM,6/1/1944 12:00
// Ft. Duschene,,DISK,UT,6/30/1944 10:00
// South Kingstown,,SPHERE,RI,7/1/1944 20:00
// North Tampa,,CYLINDER,FL,7/15/1944 13:00
// Ft. Lee,,CIGAR,VA,1/1/1945 12:00
// Salinas AFB,,DISK,CA,6/1/1945 12:00
// Jasper,,FIREBALL,FL,6/1/1945 13:30
// Winston-Salem,,DISK,NC,6/7/1945 7:00
// Portsmouth,RED,FORMATION,VA,7/10/1945 1:30`;
//
// console.log(tableFromString(ufo, ','));



  return {
    comp1: comp1,
    tableFromString: tableFromString,
    tableFromJSON: tableFromJSON,
    inputTable: inputTable
  }

})();