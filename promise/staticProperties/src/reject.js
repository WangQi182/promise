module.exports = function reject(value) {
  const prom = this;
  return new prom((resolve, reject) => {
    reject(value);
  });
};