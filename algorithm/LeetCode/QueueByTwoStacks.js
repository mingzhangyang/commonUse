/**
 * Created by yangm11 on 7/20/2018.
 */
'use strict';

const Stack = require('../stack');
// const Queue = require('../queue');


class QueueByTwoStacks {
  constructor() {
    this.inStack = new Stack(2);
    this.outStack = new Stack(2);
  }
  enQueue(i) {
    let v = this.outStack.pop();
    if (v === undefined) {
      this.inStack.push(i);
      return;
    }
    while (v !== undefined) {
      this.inStack.push(v);
      v = this.outStack.pop();
    }
    this.inStack.push(i);
  }
  deQueue() {
    let v = this.inStack.pop();
    if (v === undefined) {
      return this.outStack.pop();
    }
    while (v !== undefined) {
      this.outStack.push(v);
      v = this.inStack.pop();
    }
    return this.outStack.pop();
  }
}

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
  // let s = new Stack(2);
  // console.log(s);
  // s.push(1);
  // console.log(s);
  // s.push(2);
  // console.log(s);
  // s.push(3);
  // console.log(s);
  // s.push(4);
  // console.log(s);
  // s.push(5);
  // console.log(s);
  // console.log(s.pop());

  let q = new QueueByTwoStacks();
  // console.log(q);
  q.enQueue(1);
  // console.log(q);
  q.enQueue(2);
  // console.log(q);
  q.enQueue(3);
  // console.log(q);
  q.enQueue(4);
  // console.log(q);
  q.enQueue(5);
  // console.log(q);
  console.log(q.deQueue());
  // console.log(q);
  console.log(q.deQueue());
  // console.log(q);
  console.log(q.deQueue());
  // console.log(q);
  console.log(q.deQueue());
  // console.log(q);
  // console.log(q.deQueue());
  // console.log(q);
  q.enQueue(6);
  // console.log(q);
  q.enQueue(7);
  // console.log(q);
  q.enQueue(8);
  // console.log(q);
  console.log(q.deQueue());
  console.log(q.deQueue());
  console.log(q.deQueue());
  console.log(q.deQueue());
  console.log(q.deQueue());
}