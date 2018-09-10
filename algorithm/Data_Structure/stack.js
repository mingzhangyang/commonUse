/**
 * Created by yangm11 on 9/6/2018.
 */
'use strict';

class Stack {
  constructor(n) {
    switch (typeof n) {
      case 'undefined':
        this.size = 16;
        break;
      case 'number':
        if (n < 0) {
          throw new RangeError('A natural number expected.');
        }
        if (n % 1 !== 0) {
          throw new RangeError('Integer expected.');
        }
        this.size = n;
        break;
      default:
        throw new Error('Invalid argument.');
    }
    this.internal = new Array(this.size);
    this.length = 0;
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

if (typeof module !== 'undefined' && module.parent) {
  // Node environment, required as module
  module.exports = Stack;
} else if (typeof window === 'object') {
  // Browser environment
} else {
  // Node environment, run directly
  // test code go here

  let s = new Stack(4);
  console.log(s);
  s.push(0);
  s.push(1);
  s.push(2);
  s.push(3);
  s.push(4);
  s.push(5);
  s.push(6);
  console.log(s);
  console.log(s.pop());
  console.log(s.pop());
  console.log(s.pop());
  console.log(s.pop());
  console.log(s.pop());
  console.log(s.pop());
}