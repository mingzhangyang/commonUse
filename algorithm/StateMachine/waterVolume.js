/**
 * Created by mingzhang on 8/23/17.
 */
'use strict';

function wv(arr) {
  let res = 0;
  let state = {
    left: 0,
    right: 0,
    content: []
  };
  let i = 0;
  while (i < arr.length) {
    let cur = arr[i];
    if (state.left === 0 && state.right === 0 && state.content.length === 0) {
      state.left = cur;
      i++;
      continue;
    }
    if (state.left > 0 && state.right === 0 && state.content.length === 0) {
      if (cur < state.left) {
        state.content.push(cur);
      } else {
        state.left = cur;
      }
      i++;
      continue;
    }
    if (state.left > 0 && state.right === 0 && state.content.length > 0) {
      if (cur >= state.left) {
        state.right = cur;
      } else {
        state.content.push(cur);
      }
      i++;
      continue;
    }
    if (state.left > 0 && state.right > 0 && state.content.length > 0) {
      for (let i = 0; i < state.content.length; i++) {
        res += (state.left - state.content[i]);
      }
      if (cur >= state.right) {
        state.left = cur;
        state.content = [];
        state.right = 0;
      } else {
        state.content = [cur];
        state.right = 0;
      }
      i++;
      continue;
    }
    console.log('missing something ...');
  }
  if (state.right === 0 && state.content.length === 0) {
    return res;
  }
  if (state.left > 0 && state.content.length > 0) {
    let max = 0;
    for (let i = 0; i < state.content.length; i++) {
      if (state.content[i] > max) {
        max = state.content[i];
      }
    }
    if (max === 0) {
      return res;
    } else {


      // ....
    }

  }
}