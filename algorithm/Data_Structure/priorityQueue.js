/**
 * Created by mingzhang on 9/30/18.
 */
'use strict';

class PriorityQueue {
  constructor (v) {
    this.queue = [];
    if (typeof v !== 'undefined') {
      this.queue.push(v);
    }
  }
  enQueue(v) {
    let c = 0;
    for (let i = 0, j = this.queue.length; i < j; i++) {
      if (this.queue[i] >= v) {
        break;
      }
    }
    c = i > 0 ? i - 1 : c;
    this.queue.splice(c, 0, v);
  }
  deQueue() {
    return this.queue.pop();
  }
}


if (typeof module !== 'undefined') {
  if (module.parent) {
    // serve as module
  } else {
    // run as executable
  }
} else if (typeof window !== 'undefined') {
// run in browser

}