'use strict'

class EventEmitter {
  constructor(name) {
    this.eventName = name;
    this.target = [];
    
  }

  emit(msg) {
    for (let i = 0; i < this.target.length; i++) {
      this.target[i]._events[this.eventName] += msg;
    }
  }
}

class EventListener {
  constructor() {
    Object.defineProperty(this, '_events', {
      configurable: true,
      enumerable: false,
      value: {},
      writable: false
    });
  }

  on(eventName, eventEmitter, handler) {
    eventEmitter = eventEmitter || new EventEmitter();
    eventEmitter.target.push(this);
    Object.defineProperty(this._events, eventName, {
      configurable: true,
    set: (v) => {
      setTimeout(handler, 0);
      }
    });
  }
}
