const { isFunc, isPainObj, immediateFunc } = require('./helper');
const { unhandledRejection, promiseResolveByItself } = require('./error');

const finale = (self) => {
  if (self.state === 2 && self.deferreds.length === 0) {
    immediateFunc(() => {
      if (!self.handled) {
        unhandledRejection(self.value);
      }
    });
  }
  self.deferreds.forEach(deferred => {
    handle(self, deferred);
  });
  self.deferreds = null;
};

const handle = (self, deferred) => {
  while (self.state === 3) {
    self = self.value;
  }
  if (self.state === 0) {
    self.deferreds.push(deferred);
    return;
  }
  self.handled = true;
  immediateFunc(() => {
    const { state, value } = self;
    const { onFulfilled, onRejected, promise } = deferred;
    const isResolved = state === 1;
    const cb = isResolved ? onFulfilled : onRejected;
    if (cb === null) {
      (isResolved ? resolve : reject)(promise, value);
      return;
    }
    let ret;
    try {
      ret = cb(value);
    } catch (e) {
      reject(promise, e);
      return;
    }
    resolve(promise, ret);
  });
};

const reject = (self, reason) => {
  self.state = 2;
  self.value = reason;
  finale(self);
};

const resolve = (self, value) => {
  try {
    promiseResolveByItself(value, self);
    if (
      value && (
        isFunc(value) || isPainObj(value)
      )
    ) {
      const { then } = value;
      if (value instanceof self.constructor) {
        self.state = 3;
        self.value = value;
        finale(self);
        return;
      } else {
        if (isFunc(then)) {
          handleExclutor(
            then.bind(value),
            self
          );
          return;
        }
      }
    }
    self.state = 1;
    self.value = value;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
};

const handleExclutor = (exclutor, self) => {
  let lock = false;
  const handleResolve = (value) => {
    if (!lock) {
      lock = true;
      resolve(self, value);
    }
  };
  const handleReject = (reason) => {
    if (!lock) {
      lock = true;
      reject(self, reason);
    }
  };
  try {
    exclutor(
      handleResolve,
      handleReject
    );
  } catch (e) {
    handleReject(e);
  }
};

module.exports = {
  handle,
  handleExclutor
};