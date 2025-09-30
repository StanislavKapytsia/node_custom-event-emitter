'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(eventName, callback) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }

  once(eventName, callback) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    const wrapper = (...args) => {
      this.off(eventName, wrapper);

      return callback(...args);
    };

    this.listeners[eventName].push(wrapper);
  }
  off(eventName, callback) {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter(
        (call) => call !== callback,
      );
    }
  }
  emit(eventName, ...args) {
    if (!this.listeners[eventName]) {
      return;
    }

    for (const event of this.listeners[eventName]) {
      event(...args);
    }
  }
  prependListener(eventName, callback) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].unshift(callback);
  }
  prependOnceListener(eventName, callback) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    const wrapper = (...args) => {
      this.off(eventName, wrapper);

      return callback(...args);
    };

    this.listeners[eventName].unshift(wrapper);
  }
  removeAllListeners(eventName) {
    if (eventName && this.listeners[eventName]) {
      delete this.listeners[eventName];
    } else {
      this.listeners = {};
    }
  }
  listenerCount(eventName) {
    if (this.listeners[eventName]) {
      return this.listeners[eventName].length;
    } else {
      return 0;
    }
  }
}

module.exports = MyEventEmitter;
