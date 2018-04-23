
const List = {};

const Type = require('./type');

function PageController(args) {

  this.initedArgs = {};

  this.init(args);
}

PageController.prototype.init = function(args) {

  let _a = Type.objectForce(args) ? args : this.initedArgs;

  this.initedArgs = _a;

  let { page, hasMore, pageSize, loading, lastPageSize } = _a;

  this.page = +page || 1;
  this.hasMore = !!hasMore || false;
  this.pageSize = +pageSize || 10;
  this.loading = !!loading || false;
  this.lastPageSize = +lastPageSize || 10;

  return this;
};

PageController.prototype.initByList = function(list) {

  let _l = Type.array(list) ? list : [];

  let size = _l.length;

  this.setPageSize(size).setByList(_l);

  return this;
};

PageController.prototype.setPage = function(page) {

  this.page = page;

  return this;
};

PageController.prototype.pagePlus = function(page) {

  this.setPage(this.page + (+page || 1));

  return this;
};

PageController.prototype.setPageSize = function(pageSize) {

  this.pageSize = +pageSize || 10;

  return this;
};

PageController.prototype.setLastPageSize = function(lastPageSize) {
  this.lastPageSize = lastPageSize;

  this.setHasMore(lastPageSize === this.pageSize);

  return this;
};

PageController.prototype.setLoading = function(bool=true) {

  this.loading = !!bool;

  return this;
};

PageController.prototype.setHasMore = function(bool=true) {

  this.hasMore = !!bool;

  return this;
};

PageController.prototype.setByList = function(list) {

  let _l = Type.array(list) ? list : [];

  let size = _l.length;

  this.setLastPageSize(size)
  .setLoading(false);

  size && this.pagePlus();

  return this;
};

PageController.prototype.isEmpty = function() {

  let isEmpty = !this.loading && this.page === 1 && this.lastPageSize === 0;

  return isEmpty;
};

List.PageController = PageController;

module.exports = List;