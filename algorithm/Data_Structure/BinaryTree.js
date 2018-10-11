/**
 * Created by yangm11 on 8/30/2017.
 */
'use strict';

// a complicated implementation, not recommended.
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

// a better implementation
class Node {
  constructor(v) {
    if (!v) {
      throw 'a value expected';
    }
    this.value = v;
    this.left = null;
    this.right = null;
  }
  insert(v) {
    if (this.value > v) {
      if (this.left) {
        this.left.insert(v);
      } else {
        this.left = new Node(v);
      }
    } else {
      if (this.right) {
        this.right.insert(v);
      } else {
        this.right = new Node(v);
      }
    }
  }
  toArray() {
    if (!this.left && !this.right) {
      return [this.value];
    }
    if (this.left && !this.right) {
      return [...this.left.toArray(), this.value];
    }
    if (!this.left && this.right) {
      return [this.value, ...this.right.toArray()];
    }
    if (this.left && this.right) {
      return [...this.left.toArray(), this.value, ...this.right.toArray()];
    }
  }
  revert() {
    if (!this.left && !this.right) {
      return;
    }
    if (this.left && !this.right) {
      this.left.revert();
      this.right = this.left;
      this.left = null;
      return;
    }
    if (!this.left && this.right) {
      this.right.revert();
      this.left = this.right;
      this.right = null;
      return;
    }
    if (this.left && this.right) {
      this.left.revert();
      this.right.revert();
      [this.left, this.right] = [this.right, this.left];
    }
  }
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = BinaryTree;
} else if (typeof window !== 'undefined') {
  //
} else {
  let s = [10, 2, 7, 9, 3, 1, 13, 17, 3, 5, 6, 9, 8, 11, 27];

  // let t = new BinaryTree(s);
  // console.dir(t._entry, {depth: null});
  // console.log(t.toSortedList());
  //
  // s = 'EFGDCBAABCDEFGH';
  // t = new BinaryTree(s);
  // console.dir(t._entry, {depth: null});

  let n = new Node(10);
  for (let v of s) {
    n.insert(v);
  }
  console.log(n.toArray());
  n.revert();
  console.log(n.toArray());

  // console.log(n);
  // n.insert(3);
  // // n.insert(12);
  // console.log(n);
  //
  // n.revert();
  // console.log(n);
}