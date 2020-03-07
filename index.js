const initProperties = require('./promise');
const { handleExclutor } = require('./internal/internal');
const { notPromise, resolverIsnotFucntion } = require('./internal/error');

const Promise = function(exclutor) {
  notPromise(this, Promise);
  resolverIsnotFucntion(exclutor);
  this.state = 0;
  this.value = undefined;
  this.deferreds = [];
  this.handled = false;
  handleExclutor(exclutor, this);
}

initProperties(Promise);

module.exports = Promise;