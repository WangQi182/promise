module.exports = function (onFulfilled) {
  return this.then(null, onFulfilled);
}