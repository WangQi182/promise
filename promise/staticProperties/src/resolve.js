const { isPainObj } = require('../../../internal/helper');

module.exports = function(value) {
  const prom = this;
  if (value && isPainObj(value) && prom === value.constructor) {
    return value;
  }
  return new prom((resolve, reject) => {
    resolve(value);
  });
};