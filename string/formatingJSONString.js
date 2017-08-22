/**
 * Created by yangm11 on 8/17/2017.
 */
'use strict';

function printf(jsonString, space) {
  space = space || '    ';
  let res = '';
  let num = 0;
  let num_1 = 0;
  let nl = '\n';
  let count = 0;

  function getSpace(space, n) {
    let sp = '';
    for (let i = 0; i < n; i++) {
      sp += space;
    }
    return sp;
  }

  for (let i = 0; i < jsonString.length; i++) {
    let cur = jsonString[i];
    switch (cur) {
      case '{':
        if (count % 2 === 0) {
          num += 1;
          res += (cur + nl + getSpace(space, (num + num_1)));
        } else {
          res += cur;
        }

        break;
      case '}':
        if (count % 2 === 0) {
          num -= 1;
          res += (nl + getSpace(space, (num + num_1)) + cur);
        } else {
          res += cur;
        }
        break;
      case ',':
        if (count % 2 === 0) {
          res += (cur + nl + getSpace(space, (num + num_1)));
        } else {
          res += cur;
        }
        break;
      case '"':
        count += 1;
        res += cur;
        break;
      case '[':
        if (count %2 === 0) {
          num_1 += 1;
          res += (cur + nl + getSpace(space, (num + num_1)));
        } else {
          res += cur;
        }
        break;
      case ']':
        if (count % 2 === 0) {
          num_1 -= 1;
          res += (nl + getSpace(space, (num + num_1)) + cur);
        } else {
          res += cur;
        }
        break;
      default:
        res += cur;
    }
  }
  console.log(res);
  return res;
}

let s = {x: 3, y: [1, 2, 3, {a: 0, b: 1, c: [1, 2, 3]}], z: 5};
console.log(s);
printf(JSON.stringify(s));