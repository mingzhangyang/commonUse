/**
 * Created by yangm11 on 9/26/2017.
 */
'use strict';

function longestSubstr(arr) {
  let st = {
    start: 0,
    maxVal: -1,
    values: [],
    maxLen: 0,
    candidates: []
  };

  while (st.start < arr.length) {
    if (arr[st.start] > st.maxVal) {
      st.maxVal = arr[st.start];
      st.values.push(arr[st.start]);
    } else {
      if (st.values.length > st.maxLen) {
        st.maxLen = st.values.length;
        st.candidates = [st.values.slice()];
      } else if (st.values.length === st.maxLen) {
        st.candidates.push(st.values.slice());
      }
      st.maxVal = arr[st.start];
      st.values = [arr[st.start]];
    }
    st.start += 1;
  }
  if (st.values.length > st.maxLen) {
    st.maxLen = st.values.length;
    st.candidates = [st.values.slice()];
  } else if (st.values.length === st.maxLen) {
    st.candidates.push(st.values.slice());
  }
  return {
    maxLength: st.maxLen,
    candidates: st.candidates
  };
}


if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
  let a = [1, 2, 4, 2, 1, 3, 5, 7, 2, 6, 3, 5, 7, 8, 9, 2, 3, 1, 5, 7, 8, 10, 11];
  console.log(a.length);
  console.log(longestSubstr(a));
}