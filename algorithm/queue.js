/**
 * Created by yangm11 on 9/6/2018.
 */
'use strict';

class Queue {
  constructor(size) {
    switch (typeof size) {
      case 'undefined':
        this.size = 16;
        break;
      case 'number':
        if (size <= 0) {
          throw new RangeError('a natural number expected');
        }
        if (size % 1 !== 0) {
          throw new RangeError('an integer expected');
        }
        this.size = size;
        break;
      default:
        throw new Error('invalid argument');
    }
    this.internal = new Array(this.size);
    this.cur = 0;
    this.tail = 0;
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
    return this.internal[this.cur++];
    // let v = this.internal[this.cur];
    // this.cur++;
    // return v;
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

if (typeof module !== 'undefined' && module.parent) {
  // Node environment, required as module
  module.exports = Queue;
} else if (typeof window === 'object') {
  // Browser environment
} else {
  // Node environment, run directly
  // test code go here

  let q = new Queue();
  console.log(q);
  q.enQueue(0);
  q.enQueue(1);
  q.enQueue(2);
  q.enQueue(3);
  q.enQueue(4);
  console.log(q);
  console.log(q.deQueue());
  console.log(q.deQueue());
  console.log(q.deQueue());
  console.log(q.deQueue());
  console.log(q.deQueue());
  console.log(q.deQueue());
}