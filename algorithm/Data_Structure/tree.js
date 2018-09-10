/**
 * Created by yangm11 on 9/6/2018.
 */
'use strict';

class TreeNode {
  constructor(parentNode=null, nextSibling=null) {
    if (!(parentNode instanceof TreeNode)) {
      if (parentNode !== null) {
        throw new TypeError('an instance of TreeNode or null expected');
      }
    }
    if (!(nextSibling instanceof TreeNode)) {
      if (nextSibling !== null) {
        throw new TypeError('an instance of TreeNode or null expected');
      }
    }
    this.parentNode = parentNode;
    this.nextSibling = nextSibling;
    this.firstChild = null;

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

  /**
   * append a node to the tail of the  child node list of a given parent node
   * @param node
   * @returns {*}
   */
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
    } else {
      this.firstChild = node;
    }
    if (typeof this.depth === 'number') {
      node.depth = this.depth + 1;
    }
    return node;
  }

  // connect two nodes
  addSiblingAfter(node) {
    if (!(node instanceof TreeNode)) {
      throw new TypeError('an instance of TreeNode expected');
    }
    this.nextSibling = node;
    node.parentNode = this.parentNode;
    node.depth = this.depth;
  }
}

class Tree extends TreeNode {
  constructor () {
    super(null, null);
    delete this.addSiblingAfter;
    this.depth = 0;
  }
  insertNodeAfter(nodeToBeInserted, targetNode) {
    if (!(nodeToBeInserted instanceof TreeNode)) {
      throw TypeError('an instance of TreeNode expected');
    }
    if (!(targetNode instanceof TreeNode)) {
      throw TypeError('an instance of TreeNode expected');
    }
    let p = targetNode.parentNode;
    if (!p) {
      throw new Error('can\'t insert sibling node before root node');
    }
    while (p.parentNode) {
      p = p.parentNode;
    }
    if (p !== this) {
      throw new Error('target node is not a sub child of the tree');
    }

    // set the parent node of the node to be inserted
    nodeToBeInserted.parentNode = targetNode.parentNode;

    // set the relationship between the two siblings
    let n = targetNode.nextSibling;
    targetNode.nextSibling = nodeToBeInserted;
    if (n) {
      nodeToBeInserted.nextSibling = n;
    }

    // set the depth
    nodeToBeInserted.depth = targetNode.parentNode.depth + 1;
    return targetNode;
  }
  insertNodeBefore(nodeToBeInserted, targetNode) {
    if (!(nodeToBeInserted instanceof TreeNode)) {
      throw TypeError('an instance of TreeNode expected');
    }
    if (!(targetNode instanceof TreeNode)) {
      throw TypeError('an instance of TreeNode expected');
    }
    let p = targetNode.parentNode;
    if (!p) {
      throw new Error('can\'t insert sibling node before root node');
    }
    while (p.parentNode) {
      p = p.parentNode;
    }
    if (p !== this) {
      throw new Error('target node is not a sub child of the tree');
    }

    // set the parent node of the node to be inserted
    nodeToBeInserted.parentNode = targetNode.parentNode;

    // set the relationship between the two siblings
    let fc = targetNode.parentNode.firstChild;
    if (fc === targetNode) {
      targetNode.parentNode.firstChild = nodeToBeInserted;
      nodeToBeInserted.nextSibling = targetNode;
    } else {
      while (fc.nextSibling !== targetNode) {
        fc = fc.nextSibling;
      }
      fc.nextSibling = nodeToBeInserted;
      nodeToBeInserted.nextSibling = targetNode;
    }

    // set the depth
    nodeToBeInserted.depth = targetNode.parentNode.depth + 1;
    return targetNode;
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
  console.log(t.firstChild.parentNode);
  t.insertNodeBefore((new TreeNode()).setProperty('value', 100), t.firstChild);
  console.log(t.firstChild);
  t.insertNodeAfter((new TreeNode()).setProperty('value', 200), t.firstChild);
  console.log(t.firstChild.nextSibling);
}