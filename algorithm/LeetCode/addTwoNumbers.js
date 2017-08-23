/**
 * Created by yangm11 on 8/23/2017.
 */
'use strict';

/*
 You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

 You may assume the two numbers do not contain any leading zero, except the number 0 itself.

 Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
 Output: 7 -> 0 -> 8
 */

class ListNode {
  constructor (v) {
    this.value = v;
    this.next = null;
  }

  toNumber() {
    let res = '';
    let t = this;
    while (1) {
      res = t.value + res;
      t = t.next;
      if (t === null) {
        break;
      }
    }
    return parseInt(res);
  }

  static add(ln1, ln2) {
    let res = new ListNode();
    let t = 0;
    let n1 = ln1;
    let n2 = ln2;
    let tmp = res;
    while (1) {
      let v1 = 0, v2 = 0;
      if (n1 !== null) {
        v1 = n1.value;
        n1 = n1.next;
      }
      if (n2 !== null) {
        v2 = n2.value;
        n2 = n2.next;
      }

      let sum = t + v1 + v2;
      tmp.value = sum > 9 ? (sum - 10) : sum;
      t = sum > 9 ? 1 : 0;

      tmp.next = new ListNode();
      tmp = tmp.next;

      if (n1 === null && n2 === null) {
        if (t) {
          tmp.value = t;
        }
        break;
      }
    }
    return res;
  }
}

function createList(s) {
  let arr = s.split('->');
  arr = arr.map(d => parseInt(d));
  let i = 0;
  let res = new ListNode(arr[i++]);
  let t = res;
  while (i < arr.length) {
    t.next = new ListNode(arr[i++]);
    t = t.next;
  }
  return res;
}

let s1 = '9 -> 9 -> 9';
let s2 = '5 -> 6 -> 4';

let ln1 = createList(s1);
let ln2 = createList(s2);

console.log(ln1.toNumber());
console.log(ln2.toNumber());
console.dir(ListNode.add(ln1, ln2), {depth: null});
console.log(ListNode.add(ln1, ln2).toNumber());



