/**
 * Created by yangm11 on 8/3/2018.
 */
'use strict';

class Node {
  constructor(v) {
    this.value = v;
    this.next = null;
  }
  chain(node) {
    let t = this.next;
    while (t) {
      t = t.next;
    }
    t.next = node;
  }
}
class LinkedList {
  constructor(arg) {
    // create a linked list from a node
    if (arg.constructor === Node) {
      this.head = arg;
      let i = 1;
      let t = arg;
      while (t.next) {
        i++;
        t = t.next;
      }
      this.length = i;
    }
    // create a linked list from a list of values
    if (Array.isArray(arg)) {
      if (arg.length === 0) {
        throw 'no arguments provided.';
      } else {
        let values = arg;
        this.head = new Node(values[0]);
        let i = 1;
        let t = this.head;
        let p = null;
        while (i < values.length) {
          p = new Node(values[i]);
          t.next = p;
          t = p;
          i++;
        }
        this.length = i;
      }
    }
  }
  toString() {
    let t = this.head;
    let s = `Head {${t.value}}`;
    while (t.next) {
      t = t.next;
      s += ` -> node {${t.value}}`;
    }
    return s;
  }
}

function reverse(li) {
  if (!li) {
    throw 'no arguments provided';
  }
  if (!li.head) {
    throw 'not a linked list';
  }
  let pre = null;
  let cur = li.head;
  let nex = null;
  while (cur) {
    nex = cur.next;
    cur.next = pre;
    pre = cur;
    cur = nex;
  }
  // console.log(pre);
  return new LinkedList(pre);
}

function reverseNode(node) {
  if (!node || !node.next) {
    return node;
  }
  let t = node;
  let m = t.next;
  let p;
  t.next = null;
  while (m) {
    p = m.next;
    m.next = t;
    t = m;
    m = p;
  }
  return t;
}

function reverseNode2(node) {
  if (!node || !node.next) {
    return node;
  }
  let tmp = [node];
  let iter = node.next;
  while (iter) {
    tmp.push(iter);
    iter = iter.next;
  }
  let i = tmp.length - 1;
  while (i > -1) {
    tmp[i].next = tmp[i-1];
    i--;
  }
  tmp[0].next = null;
  return tmp[tmp.length-1];
}

function reverseNode3(node) {
  if (!node || !node.next) {
    return node;
  }
  // got a new idea, probably not as efficient
  let st = [null, node, node.next];
  while (st[2]) {
    st[1].next = st[0];
    [st[0], st[1]] = [st[1], st[2]];
    st[2] = st[2].next ? st[2].next : null;
  }
  return st[1];
}

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
  let li = new LinkedList([0, 1, 2, 3, 4, 5, 6]);
  // console.log(li);
  // console.log(li.toString());
  // console.log(reverse(li).toString());
  console.log(li.head);
  // console.log(reverseNode(li.head));
  // console.log(reverseNode2(li.head));
  console.log(reverseNode3(li.head));
}