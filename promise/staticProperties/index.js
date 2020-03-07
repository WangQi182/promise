module.exports = function(Instance) {
  Instance.all = require('./src/all').bind(Instance);
  Instance.race = require('./src/race').bind(Instance);
  Instance.reject = require('./src/reject').bind(Instance);
  Instance.resolve = require('./src/resolve').bind(Instance);
  Instance.allSettled = require('./src/allSettled').bind(Instance);
};