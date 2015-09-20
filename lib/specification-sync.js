"use strict";

/**
 * Specification base class
 * @class
 */
var Specification = {
  and: function(spec) {
    return new AndSpecification(this, spec);
  },
  or: function(spec) {
    return new OrSpecification(this, spec);
  },
  not: function(spec) {
    return new NotSpecification(spec);
  }
}


/**
 * And specification class
 * @class
 * @param {Specification} left  Specification
 * @param {Specification} right Specification
 */
function AndSpecification(left, right) {
  this.leftSpec = left;
  this.rightSpec = right;
}
AndSpecification.prototype = Object.create(Specification);
AndSpecification.prototype.isSatisfiedBy = function(obj) {
  var leftSat = false, rightSat = false;
  if (this.leftSpec && this.leftSpec.isSatisfiedBy) {
    leftSat = this.leftSpec.isSatisfiedBy(obj);
  }
  if (this.rightSpec && this.rightSpec.isSatisfiedBy) {
    rightSat = this.rightSpec.isSatisfiedBy(obj);
  }
  return leftSat && rightSat;
};


/**
 * Or specification class
 * @class
 * @param {Specification} left  Specification
 * @param {Specification} right Specification
 */
function OrSpecification(left, right) {
  this.leftSpec = left;
  this.rightSpec = right;
}
OrSpecification.prototype = Object.create(Specification);
OrSpecification.prototype.isSatisfiedBy = function(obj) {
  var leftSat = false, rightSat = false;
  if (this.leftSpec && this.leftSpec.isSatisfiedBy) {
    leftSat = this.leftSpec.isSatisfiedBy(obj);
  }
  if (this.rightSpec && this.rightSpec.isSatisfiedBy) {
    rightSat = this.rightSpec.isSatisfiedBy(obj);
  }
  return leftSat || rightSat;
};


/**
 * Not specification
 * @class
 * @param {Specification} spec  Specification
 */
function NotSpecification(spec) {
  this.spec = spec;
}
NotSpecification.prototype = Object.create(Specification);
NotSpecification.prototype.isSatisfiedBy = function(obj) {
  if (!this.spec || !this.spec.isSatisfiedBy) {
    return false;
  }
  return !this.spec.isSatisfiedBy(obj);
};


module.exports = Specification;
