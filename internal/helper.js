
const toString = Object.prototype.toString;

const noop = function() {};
const slice = Array.prototype.slice;
const isFunc = (it) => typeof it === 'function';
const isArray = (it) => toString.call(it) === '[object Array]';
const isPainObj = (it) => typeof it === 'object';
const immediateFunc = (func) => setTimeout(func, 0);

class Handler {
  constructor(onFulfilled, onRejected, promise) {
    this.onFulfilled = isFunc(onFulfilled) ? onFulfilled : null;
    this.onRejected = isFunc(onRejected) ? onRejected : null;
    this.promise = promise;
  }
}

module.exports = {
  noop,
  slice,
  isFunc,
  Handler,
  isArray,
  isPainObj,
  immediateFunc
}