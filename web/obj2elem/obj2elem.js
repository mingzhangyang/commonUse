/**
 * Created by yangm11 on 8/11/2017.
 */
'use strict';

function obj2elems(obj, parentNode, tagName = 'div') {
  parentNode = parentNode || document.body;
  let div = document.createElement('div');
  if (parentNode.grouped) {
    div.classList.add('border-left-show');
  }
  let subParent = parentNode.appendChild(div);
  let keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    let cur = obj[keys[i]];
    let child = document.createElement('div');
    child.textContent = (keys[i] + ': ');
    subParent.append(child);
    switch (typeof cur) {
      case 'object':
        if (Array.isArray(cur)) {
          array2elems(cur, child, tagName);
        } else {
          obj2elems(cur, child, tagName);
        }
        break;
      default:
        value2element(cur, child, 'input');
    }
  }
}

function array2elems(array, parentNode, tagName = 'div') {
  parentNode = parentNode || document.body;
  let div = document.createElement('div');
  let subParent = parentNode.appendChild(div);
  for (let i = 0; i < array.length; i++) {
    let cur = array[i];
    switch (typeof cur) {
      case 'object':
        if (Array.isArray(cur)) {
          array2elems(cur, subParent, tagName);
        } else {
          subParent.grouped = true;
          obj2elems(cur, subParent, tagName);
        }
        break;
      default:
        let child = document.createElement('div');
        subParent.append(child);
        value2element(cur, child, 'input');
    }
  }
}

function value2element(v, parentNode, tagName = 'input') {
  parentNode = parentNode || document.body;
  // parentNode.classList.add('border-left-show');
  let child = document.createElement(tagName);
  child.placeholder = v;
  parentNode.appendChild(child);
}