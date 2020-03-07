const { isArray, slice } = require('../../../internal/helper');
module.exports = function(ary) {
  const prom = this;
  return new prom((resolve, reject) => {
    if (!isArray(ary)) {
      return reject(new TypeError('Promise.race accpte an array'));
    }
    const promList = slice.call(ary);
    promList.forEach(item => {
      Promise.resolve(item).then(resolve, reject);
    });
  });
}