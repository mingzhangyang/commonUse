/**
 * Created by yangm11 on 4/17/2017.
 */
'use strict';

function comp1(options) {
  options = options || {};
  // let repeat = options.repeat || 1;
  let className = options.className || 'my-component-1';
  let labelList = options.labelList || ['Label'];
  let idList = options.idList || [];
  let template = '';
  for (let i = 0; i < labelList.length; i++) {
    if (idList.length) {
      template += `<div class="${className}">
    <div>
        <lable for="input">${labelList[i]}</lable>
    </div>
    <input type="text" id="${idList[i]}" placeholder="">
</div>`;
    } else {
      template += `<div class="${className}">
    <div>
        <lable for="input">${labelList[i]}</lable>
    </div>
    <input type="text" placeholder="">
</div>`
    }
  }
  return template;
}

// console.log(comp1());

function table(json) {
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

console.log(inputTable(['A', 'B', 'C', 'D'], 6));