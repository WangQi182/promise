const { isFunc } = require('./helper');

const notPromise = (self, promise) => {
  if (!(self instanceof promise)) {
    throw new Error(`${self} is not a promise`);
  }
};

const resolverIsnotFucntion = (resolver) => {
  if (!isFunc(resolver)) {
    throw new Error(`Promise resolver ${resolver} is not a function`)
  }
};

const promiseResolveByItself = (value, self) => {
  if (value === self) {
    throw new TypeError('A promise cannot be resolved with itself.');
  }
}

const unhandledRejection = (err) => {
  if (console && isFunc(console)) {
    console.error('in Promise: ' + err);
  }
};

module.exports = {
  notPromise,
  unhandledRejection,
  resolverIsnotFucntion,
  promiseResolveByItself
}


