const { noop, Handler } = require('../../../internal/helper');
const { handle } = require('../../../internal/internal');

module.exports = function(onFullfilled, onRejected) {
  const prom = new this.constructor(noop);
  handle(this, new Handler(onFullfilled, onRejected, prom))
  return prom;
};