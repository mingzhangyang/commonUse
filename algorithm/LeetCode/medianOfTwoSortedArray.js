/**
 * Created by yangm11 on 8/23/2017.
 */
'use strict';

/*
 There are two sorted arrays nums1 and nums2 of size m and n respectively.

 Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

 Example 1:
 nums1 = [1, 3]
 nums2 = [2]

 The median is 2.0
 Example 2:
 nums1 = [1, 2]
 nums2 = [3, 4]

 The median is (2 + 3)/2 = 2.5
 */

function median(nums1, nums2) {
  let res = [];
  let len = nums1.length + nums2.length;
  let target = len % 2 === 0 ? len / 2 + 1: (len + 1) / 2;

  let i = 0, j = 0;
  while (i < nums1.length) {
    while (nums1[i] > nums2[j] && j < nums2.length) {
      res.push(nums2[j]);
      j++;
      if (res.length === target) {
        if (len % 2 === 0) {
          return (res[target - 2] + res[target - 1]) * 0.5;
        } else {
          return res[target - 1];
        }
      }
    }
    res.push(nums1[i]);
    i++;
    if (res.length === target) {
      if (len % 2 === 0) {
        return (res[target - 2] + res[target - 1]) * 0.5;
      } else {
        return res[target - 1];
      }
    }
  }
  if (j < nums2.length) {
    while (j < nums2.length) {
      res.push(nums2[j]);
      j++;
      if (res.length === target) {
        if (len % 2 === 0) {
          return (res[target - 2] + res[target - 1]) * 0.5;
        } else {
          return res[target - 1];
        }
      }
    }
  }
}

let a = [1, 2];
let b = [1, 1];
console.log(median(a, b));