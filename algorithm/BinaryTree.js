/**
 * Created by yangm11 on 8/30/2017.
 */
'use strict';

class BinaryTree {
  constructor(list) {
    list = list || [null];
    let entry = BinaryTree.createNode(list[0]);
    for (let i = 1; i < list.length; i++) {
      BinaryTree.insert(list[i], entry);
    }
    this._entry = entry;
  }

  toSortedList(node) {
    node = node || this._entry;
    if (node.left === null && node.right === null) {
      return BinaryTree.nodeToList(node);
    }
    if (node.left === null && node.right !== null) {
      return BinaryTree.nodeToList(node).concat(this.toSortedList(node.right));
    }
    if (node.left !== null && node.right === null) {
      return this.toSortedList(node.left).concat(BinaryTree.nodeToList(node));
    }
    if (node.left !== null && node.right !== null) {
      return this.toSortedList(node.left).concat(BinaryTree.nodeToList(node), this.toSortedList(node.right));
    }
  }

  static nodeToList(node) {
    let res = [];
    for (let i = 0; i < node.copies; i++) {
      res.push(node.value);
    }
    return res;
  }

  static createNode(v) {
    return {
      value: v,
      copies: 1,
      left: null,
      right: null
    }
  }

  static insert(v, node) {
    if (v > node.value) {
      if (node.right === null) {
        let t = BinaryTree.createNode(v);
        node.right = t;
        return t;
      } else {
        BinaryTree.insert(v, node.right);
      }
    }
    if (v < node.value) {
      if (node.left === null) {
        let t = BinaryTree.createNode(v);
        node.left = t;
        return t;
      } else {
        BinaryTree.insert(v, node.left);
      }
    }
    if (v === node.value) {
      node.copies += 1;
    }
  }
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = BinaryTree;
} else if (typeof window !== 'undefined') {
  //
} else {
  let s = [10, 2, 7, 9, 3, 1, 13, 17, 3, 5, 6, 9, 8, 11, 27];

  let t = new BinaryTree(s);
  console.dir(t._entry, {depth: null});
  console.log(t.toSortedList());
}