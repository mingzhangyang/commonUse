/**
 * Created by yangm11 on 4/5/2018.
 */
'use strict';

class CircularList {
  constructor(iterator, entry=0, direction=1, step=1) {
    this.iterator = [...iterator];
    this.entry = entry;
    this.direction = direction;
    this.step = step;
    this.cur = entry;
    this.upBound = this.iterator.length;
    this.started = false;
    this.done = false;
    this.generator = this.createGenerator();
  }
  next() {
    return this.generator.next().value;
  }

  reverse() {
    console.log('reversed');
    this.direction = -this.direction;
  }

  stop() {
    console.log('stopped');
    this.done = true;
  }

  createGenerator() {
    let that = this;
    return (function*() {
      while (!that.done) {
        if (!that.started) {
          that.started = true;
          yield that.iterator[that.cur];
        } else {
          switch (that.direction) {
            case 1:
              that.cur += that.step;
              break;
            case -1:
              that.cur -= that.step;
              break;
            default:
              throw new Error('The direction value should be 1 (for' +
                  ' clockwise) or -1 (for anticlockwise) only.');
          }
          if (that.cur > that.upBound - 1) {
            that.cur -= that.upBound;
          } else if (that.cur < 0) {
            that.cur += that.upBound;
          }
          // console.log(that.cur);
          yield that.iterator[that.cur];
        }
      }
    })();
  }
}

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
  let c = new CircularList('Hello world', 0, 1, 2);
  // console.log(typeof c.generator);
  for (let i = 0; i < 20; i++) {
    console.log(c.next());
  }
  // console.log(c.cur);
  c.reverse();
  // console.log(c.cur);
  console.log(c.next());
  console.log(c.next());
  console.log(c.next());

  c.stop();
  console.log(c.next());
  console.log(c.next());
  console.log(c.next());
}