const {
  isArray,
  isPainObj,
  isFunc,
  slice
} = require('../../../internal/helper');

module.exports = function all (ary) {
  const prom = this;
  return new prom((resolve, reject) => {
    if (!isArray(ary)) {
      return reject(new TypeError(
        'Promise.all accepts an array'
      ));
    }
    const promiseList = slice.call(ary);
    let length = promiseList.length;
    if (!length) { resolve(promiseList) };
    const handlePromiseFromList = function(index, value) {
      try {
        if (value && (
          isFunc(value) || isPainObj(value)
        )) {
          if (isFunc(value.then)) {
            value.then((val) => {
              handlePromiseFromList(index, val);
            }, reject);
            return;
          }
        }
        promiseList[index] = value;
        if (--length === 0) {
          resolve(promiseList);
        }
      } catch (e) {
        reject(e);
      }
    }
    promiseList.forEach((item, index) => {
      handlePromiseFromList(index, item);
    });
  });
};