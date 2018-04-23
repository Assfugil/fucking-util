'use strict';
const util = {
  get Category()  { return require('./category') },
  get Color()     { return require('./color') },
  get Date()      { return require('./date') },
  get Decimal()   { return require('./decimal') },
  get Erorr()     { return require('./erorr') },
  get Events()    { return require('./events/index') },
  get Extend()    { return require('./extend') },
  get List()      { return require('./list') },
  get RndStr()    { return require('./rndStr') },
  get Signature() { return require('./signature') },
  get Str()       { return require('./str') },
  get Type()      { return require('./type') },
  get Unit()      { return require('./unit') },
  get Additional()  { return additional }
};

module.exports = util;

const additional = {};

util.addition = function(name, obj) {

  additional[name] = obj;
};

util.additionMap = function(map) {

  util.Extend(additional, map);
};
