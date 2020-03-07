module.exports = function(Instance) {
  Instance.prototype.then = require('./src/then');
  Instance.prototype.catch = require('./src/catch');
  Instance.prototype.finally = require('./src/finally');
};