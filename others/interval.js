/**
 * Created by yangm11 on 7/2/2018.
 */
'use strict';

// implement custom setInterval
class MyInterval {
  constructor(cb, interval, limit) {
    if (typeof cb !== 'function') {
      throw 'the first argument is invalid, a function expected'
    }
    if (typeof interval  !== 'number') {
      throw 'the second argument is invalid, a positive integer expected'
    }
    if (typeof limit === 'number' && limit > 0) {
      this.limit = limit;
    }
    if (limit === undefined || limit < 0) {
      this.limit = Infinity;
    }
    this._cb = cb;
    this._interval = interval;
    this.started = false;
    this.finished = false;
    this._cond = true;
    this._counter = 0;
  }
  async start() {
    // console.log('debug');
    while(this._cond && this._counter < this.limit) {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            this._cb();
          } catch(err) {
            reject(err);
          }
          this._counter++;
          resolve('OK');
        }, this._interval);
      });
    }
  }
  stop() {
    this._cond = false;
  }
  cancel() {
    this._cond = false;
    console.log('Cancelling signal invoked...');
  }
}

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
  let foo = function() {
    console.log("just boring...")
  };
  let mi = new MyInterval(foo, 1000, 10);
  mi.start();
  setTimeout(()=> {
    mi.cancel();
  }, 3000);
}