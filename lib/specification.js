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
AndSpecification.prototype.isSatisfiedBy = function(obj, cb) {
  var self = this;
  if (self.leftSpec && self.leftSpec.isSatisfiedBy) {
    self.leftSpec.isSatisfiedBy(obj, function(err, satisfiesLeft) {
      if (self.rightSpec && self.rightSpec.isSatisfiedBy) {
        self.rightSpec.isSatisfiedBy(obj, function(err, satisfiedRight) {
          return cb(null, satisfiesLeft && satisfiedRight);
        });
      } else {
        return cb(null, false);
      }
    });
  } else {
    return cb(null, false);
  }
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
OrSpecification.prototype.isSatisfiedBy = function(obj, cb) {
  var self = this;
  if (self.leftSpec && self.leftSpec.isSatisfiedBy) {
    self.leftSpec.isSatisfiedBy(obj, function(err, satisfiesLeft) {
      if (self.rightSpec && self.rightSpec.isSatisfiedBy) {
        self.rightSpec.isSatisfiedBy(obj, function(err, satisfiedRight) {
          return cb(null, satisfiesLeft || satisfiedRight);
        });
      } else {
        return cb(null, false);
      }
    });
  } else {
    return cb(null, false);
  }
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
NotSpecification.prototype.isSatisfiedBy = function(obj, cb) {
  if (!this.spec || !this.spec.isSatisfiedBy) {
    return false;
  }
  this.spec.isSatisfiedBy(obj, function(err, satisfies) {
    cb(err, !satisfies);
  });
};


module.exports = Specification;
