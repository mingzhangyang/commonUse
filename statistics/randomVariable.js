/**
 * Created by yangm11 on 5/23/2017.
 */
'use strict';

function rvArithmetic(sign, rv1, rv2) {
  let result = [];
  let uniqV = [];
  switch (sign) {
    case '+':
      for (let i = 0; i < rv1.length; i++) {
        for (let j = 0; j < rv2.length; j++) {
          let t = rv1[i].v + rv2[j].v;
          if (uniqV.indexOf(t) === -1) {
            uniqV.push(t);
            result.push({
              v: t,
              p: rv1[i].p * rv2[j].p
            });
            continue;
          }
          let idx = result.findIndex(o => o.v === t);
          result[idx].p += rv1[i].p * rv2[j].p;
        }
      }
      return result;
    case '-':
      for (let i = 0; i < rv1.length; i++) {
        for (let j = 0; j < rv2.length; j++) {
          let t = rv1[i].v - rv2[j].v;
          if (uniqV.indexOf(t) === -1) {
            uniqV.push(t);
            result.push({
              v: t,
              p: rv1[i].p * rv2[j].p
            });
            continue;
          }
          let idx = result.findIndex(o => o.v === t);
          result[idx].p += rv1[i].p * rv2[j].p;
        }
      }
      return result;
    case '*':
      for (let i = 0; i < rv1.length; i++) {
        for (let j = 0; j < rv2.length; j++) {
          let t = rv1[i].v * rv2[j].v;
          if (uniqV.indexOf(t) === -1) {
            uniqV.push(t);
            result.push({
              v: t,
              p: rv1[i].p * rv2[j].p
            });
            continue;
          }
          let idx = result.findIndex(o => o.v === t);
          result[idx].p += rv1[i].p * rv2[j].p;
        }
      }
      return result;
    case '/':
      for (let i = 0; i < rv1.length; i++) {
        for (let j = 0; j < rv2.length; j++) {
          let t = rv1[i].v / rv2[j].v;
          if (uniqV.indexOf(t) === -1) {
            uniqV.push(t);
            result.push({
              v: t,
              p: rv1[i].p * rv2[j].p
            });
            continue;
          }
          let idx = result.findIndex(o => o.v === t);
          result[idx].p += rv1[i].p * rv2[j].p;
        }
      }
      return result;
    case '%':
      for (let i = 0; i < rv1.length; i++) {
        for (let j = 0; j < rv2.length; j++) {
          let t = rv1[i].v % rv2[j].v;
          if (uniqV.indexOf(t) === -1) {
            uniqV.push(t);
            result.push({
              v: t,
              p: rv1[i].p * rv2[j].p
            });
            continue;
          }
          let idx = result.findIndex(o => o.v === t);
          result[idx].p += rv1[i].p * rv2[j].p;
        }
      }
      return result;
    case '//':
      for (let i = 0; i < rv1.length; i++) {
        for (let j = 0; j < rv2.length; j++) {
          let t = Math.floor(rv1[i].v / rv2[j].v);
          if (uniqV.indexOf(t) === -1) {
            uniqV.push(t);
            result.push({
              v: t,
              p: rv1[i].p * rv2[j].p
            });
            continue;
          }
          let idx = result.findIndex(o => o.v === t);
          result[idx].p += rv1[i].p * rv2[j].p;
        }
      }
      return result;
    default:
      throw new Error('sign not recognized.');
  }
}

let rv1 = [{
  v: 0,
  p: 0.125
}, {
  v: 1,
  p: 0.375
}, {
  v: 2,
  p: 0.5
}];

let s = rvArithmetic('+', rv1, rv1);
console.log(s);
console.log(s.reduce((acc, o) => {
  return acc + o.p;
}, 0));