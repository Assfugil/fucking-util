'use strict';

module.exports = Erorr;

function Erorr(msg, name, stack) {

  let erorr = new Error(msg);

  if (name)   erorr.name = name;
  if (stack) erorr.stack = stack;

  return erorr;
}