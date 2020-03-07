const {
  isArray,
  isPainObj,
  isFunc,
  slice
} = require('../../../internal/helper');

module.exports = function allSettled(ary) {
  const prom = this;
  const fullFilled = (value) => ({ status: 'onfulfilled', value });
  const rejected = (reason) => ({ status: 'onrejected', reason });
  return new prom((resolve, reject) => {
    if (!isArray(ary)) {
      return reject(new TypeError(
        'Promise.allSettled accepts an array'
      ));
    }
    const promiseList = slice.call(ary);
    const interceptor = function (value) {
      if (value &&
        (isFunc(value) || isPainObj(value))
      ) {
        if (isFunc(value.then) && isFunc(value.catch)) {
          return value.then(function (value) {
            return fullFilled(value);
          }).catch(function (reason) {
            return rejected(reason);
          });
        }
      }
      return fullFilled(value);
    };
    prom.all(
      promiseList.map(interceptor)
    ).then(function (value) {
      resolve(value);
    });
  });
};