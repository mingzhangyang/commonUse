/**
 * Created by yangm11 on 7/20/2018.
 */
'use strict';

class Stack {
  constructor(size) {
    if (typeof size !== 'number') {
      throw 'must be a positive int'
    }
    if (size < 0) {
      throw 'must be a positive int'
    }
    if (size % 1 !== 0) {
      throw 'must be a positive int'
    }
    this.internal = new Array(size);
    this.length = 0;
    this.size = size;
  }
  push(i) {
    this.internal[this.length] = i;
    this.length++;
    if (this.length === this.size) {
      this._increase();
    }
  }
  pop() {
    if (this.length === 0) {
      return;
    }
    this.length--;
    return this.internal[this.length]
  }
  _increase() {
    let tmp = new Array(this.size * 2);
    for (let i = 0; i < this.size; i++) {
      tmp[i] = this.internal[i];
    }
    this.internal = tmp;
    this.size *= 2;
  }
}

class Queue {
  constructor(size) {
    if (typeof size !== 'number') {
      throw 'must be a positive int'
    }
    if (size < 0) {
      throw 'must be a positive int'
    }
    if (size % 1 !== 0) {
      throw 'must be a positive int'
    }
    this.internal = new Array(size);
    this.cur = 0;
    this.tail = 0;
    this.size = size;
  }
  enQueue(i) {
    if (this.tail === this.size) {
      if (this.cur > 0) {
        this._slide();
      } else if (this.cur === 0) {
        this._increase();
      }
    }
    this.internal[this.tail] = i;
    this.tail++;
  }
  deQueue() {
    if (this.cur === this.tail) {
      return
    }
    let v = this.internal[this.cur];
    this.cur++;
    return v;
  }
  _slide() {
    let t = new Array(this.tail - this.cur);
    for (let i = 0; i < t.length; i++) {
      t[i] = this.internal[this.cur + i];
    }
    for (let i = 0; i < t.length; i++) {
      this.internal[i] = t[i];
    }
    this.cur = 0;
    this.tail = t.length;
  }
  _increase() {
    let t = new Array(this.size * 2);
    this.size *= 2;
    for (let i = 0; i < this.tail; i++) {
      t[i] = this.internal[i];
    }
    this.internal = t;
  }
}

class QueueByTwoStacks {
  constructor() {
    this.inStack = new Stack(2);
    this.outStack = new Stack(2);
  }
  enQueue(i) {
    this.inStack.push(i);
  }
  deQueue() {
    this.outStack.pop();
  }
  _arrange() {
    
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

  // let q = new Queue(2);
  // console.log(q);
  // q.enQueue(1);
  // console.log(q);
  // q.enQueue(2);
  // console.log(q);
  // q.enQueue(3);
  // console.log(q);
  // q.enQueue(4);
  // console.log(q);
  // q.enQueue(5);
  // console.log(q);
  // console.log(q.deQueue());
  // console.log(q);
  // console.log(q.deQueue());
  // console.log(q);
  // console.log(q.deQueue());
  // console.log(q);
  // console.log(q.deQueue());
  // console.log(q);
  // console.log(q.deQueue());
  // console.log(q);
  // q.enQueue(6);
  // console.log(q);
  // q.enQueue(7);
  // console.log(q);
  // q.enQueue(8);
  // console.log(q);
  // q.enQueue(9);
  // console.log(q);
  // q.enQueue(10);
  // console.log(q);
  // q.enQueue(11);
  // console.log(q);
  // q.enQueue(12);
  // console.log(q);
  // q.enQueue(13);
  // console.log(q);
}