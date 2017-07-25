'use strict';

class Commander {
  constructor() {
    Object.defineProperty(this, 'commands', {
      configurable: true,
      enumerable: true,
      value: [],
      writable: false
    });
    Object.defineProperty(this, 'targets', {
      configurable: true,
      enumerable: true,
      value: {},
      writable: false
    });
  }

  get soldiers() {
    return this.targets;
  }

  recruit(command, soldier) {
    if (!(soldier instanceof Soldier)) {
      throw 'A Soldier instance as the second parameter is required ...';
    }
    if (this.commands.indexOf(command) === -1) {
      this.commands.push(command);
    }
    if (typeof this.targets[command] === 'undefined') {
      this.targets[command] = [soldier];
    }
    if (this.targets[command].indexOf(soldier) === -1) {
      this.targets[command].push(soldier);
    }
    if (typeof soldier._commands[command] === 'undefined') {
      console.log('Soldier recruited. Please attach a function to the soldier with this command!');
    }
  }

  order(command) {
    if (typeof this.targets[command] === 'undefined') {
      throw 'Recruit a soldier with the command first...';
    }
    for (let i = 0; i < this.targets[command].length; i++) {
      this.targets[command][i]._commands[command].exec = 1;
    }
  }
}

class Soldier {
  constructor() {
    Object.defineProperty(this, '_commands', {
      configurable: true,
      enumerable: false,
      value: {},
      writable: false
    });
    Object.defineProperty(this, 'commanders', {
      configurable: true,
      enumerable: true,
      value: [],
      writable: false
    });
  }

  on(command, commander, handler) {
    if (!(commander instanceof Commander)) {
      throw 'A Commander instance is required as the second parameter ...';
    }
    if (commander.commands.indexOf(command) === -1) {
      throw 'No such command found for this commander. Please recruit this soldier with this command first ...';
    }
    if (this.commanders.indexOf(commander) === -1) {
      this.commanders.push(commander);
    }
    if (commander.targets[command].indexOf(this) === -1) {
      commander.targets[command].push(this);
    }
    let that = this;
    Object.defineProperty(this._commands, command, {
      configurable: true,
      enumerable: false,
      value: {
        count: 0
      },
      writable: false
    });
    Object.defineProperty(this._commands[command], 'exec', {
      configurable: true,
      enumerable: false,
      set: function (v) {
        this.count += 1;
        setImmediate(() => {
          handler.call(that);
        }, 0);
      }
    });
    return commander;
  }
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = {
    Commander: Commander,
    Soldier: Soldier
  }
}