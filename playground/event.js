'use strict'

class EventEmitter {
  constructor(name) {
    this.eventName = name;
    this.targets = [];
    
  }

  emit(msg) {
    for (let i = 0; i < this.targets.length; i++) {
      this.targets[i]._events[this.eventName] = msg;
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
    if (eventEmitter.targets.indexOf(this) === -1) {
      eventEmitter.targets.push(this);
    }
    let that = this;
    Object.defineProperty(this._events, eventName, {
      configurable: true,
      set: (v) => {
        setTimeout(() => {
          handler.call(that);
        }, 0);
      }
    });
    return eventEmitter;
  }
}
