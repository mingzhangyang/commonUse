/**
 * Created by yangm11 on 9/6/2018.
 */
'use strict';

class TreeNode {
  constructor(parentNode=null, previousSibling=null) {
    if (!(parentNode instanceof TreeNode)) {
      if (parentNode !== null) {
        throw new TypeError('an instance of TreeNode or null expected');
      }
    }
    if (!(previousSibling instanceof TreeNode)) {
      if (previousSibling !== null) {
        throw new TypeError('an instance of TreeNode or null expected');
      }
    }
    this.parentNode = parentNode;
    this.previousSibling = previousSibling;
    this.firstChild = null;
    this.nextSibling = null;
    this.depth = undefined;

    Object.defineProperties(this, {
      firstChild: {
        enumerable: false
      },
      nextSibling: {
        enumerable: false
      },
      parentNode: {
        enumerable: false
      },
      previousSibling: {
        enumerable: false
      }
    })
  }
  setProperty(prop, value) {
    this[prop] = value;
    return this;
  }
  search(prop, value) {
    let res = [];
    function recur(node, prop, value) {
      if (!node) {
        return;
      }
      if (node[prop] === value) {
        res.push(node);
      }
      if (node.nextSibling) {
        recur(node.nextSibling, prop, value);
      }
      recur(node.firstChild, prop, value);
    }
    recur(this.firstChild, prop, value);
    return res;
  }
  appendChildNode(node) {
    if (node.constructor !== TreeNode) {
      throw TypeError('an instance of TreeNode expected');
    }
    node.parentNode = this;
    let c0 = this.firstChild;
    if (c0) {
      let c1 = c0.nextSibling;
      while (c1) {
        c0 = c1;
        c1 = c0.nextSibling;
      }
      c0.nextSibling = node;
      node.previousSibling = c0;
    } else {
      this.firstChild = node;
    }
    if (typeof this.depth === 'number') {
      node.depth = this.depth + 1;
    }
    return node;
  }
}

class Tree extends TreeNode {
  constructor () {
    super(null, null);
    this.depth = 0;
  }
  insertNodeAfter(nodeToBeInserted, targetNode) {
    if (nodeToBeInserted.constructor !== TreeNode) {
      throw TypeError('an instance of TreeNode expected');
    }
    if (targetNode.constructor !== TreeNode) {
      throw TypeError('an instance of TreeNode expected');
    }
    let p = targetNode.parentNode;
    if (!p) {
      throw new Error('can\'t insert sibling node after root node');
    }
    while (p) {
      p = p.parentNode;
    }
    if (p !== this) {
      throw new Error('target node is not a sub child of the tree');
    }
    nodeToBeInserted.parentNode = targetNode.parentNode;
    let n = targetNode.nextSibling;
    targetNode.nextSibling = nodeToBeInserted;
    if (n) {
      nodeToBeInserted.nextSibling = n;
    }
  }

}

if (typeof module !== 'undefined' && module.parent) {
  // Node environment, required as module
  module.exports = {
    Tree: Tree,
    TreeNode: TreeNode
  };
} else if (typeof window === 'object') {
  // Browser environment
} else {
  // Node environment, run directly
  // test code go here
  let t = new Tree();
  console.log(t);
  let n = new TreeNode();
  n.setProperty('value', 10);
  t.appendChildNode(n);
  t.appendChildNode((new TreeNode()).setProperty('value', 20))
      .appendChildNode((new TreeNode()).setProperty('value', 40));
  t.appendChildNode((new TreeNode()).setProperty('value', 30));
  t.appendChildNode((new TreeNode()).setProperty('value', 40));
  t.appendChildNode((new TreeNode()).setProperty('value', 20));
  t.appendChildNode((new TreeNode()).setProperty('value', 10))
      .appendChildNode((new TreeNode()).setProperty('value', 40));
  t.appendChildNode((new TreeNode()).setProperty('value', 20));
  t.appendChildNode((new TreeNode()).setProperty('value', 30));
  // console.log(t);
  console.log(t.search('value', 40));
  console.log(t.firstChild);
}