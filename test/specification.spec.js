/* eslint-disable no-unused-expressions */
"use strict";

var expect = require("chai").expect;
var Specification = require("../lib/specification");


// Define a true specification
function TrueSpecification() {}
TrueSpecification.prototype = Object.create(Specification);
TrueSpecification.prototype.isSatisfiedBy = function(obj, cb) {
  return cb(null, true);
};

// Define a false specification
function FalseSpecification() {}
FalseSpecification.prototype = Object.create(Specification);
FalseSpecification.prototype.isSatisfiedBy = function(obj, cb) {
  return cb(null, false);
};

// Define a greater than specification
function GreaterThanSpecification(num) {
  this.num = num;
}
GreaterThanSpecification.prototype = Object.create(Specification);
GreaterThanSpecification.prototype.isSatisfiedBy = function(n, cb) {
  return cb(null, n > this.num);
};

// Define a less than specification
function LessThanSpecification(num) {
  this.num = num;
}
LessThanSpecification.prototype = Object.create(Specification);
LessThanSpecification.prototype.isSatisfiedBy = function(n, cb) {
  return cb(null, n < this.num);
};

describe("specification patter", function() {

  it("false specification must satisfies to false", function(done) {
    new FalseSpecification().isSatisfiedBy(null, function(err, satisfies) {
      if (err) {
        throw err;
      }
      expect(satisfies).to.be.false;
      done();
    });
  });

  it("true specification must satisfies to true", function(done) {
    new TrueSpecification().isSatisfiedBy(null, function(err, satisfies) {
      if (err) {
        throw err;
      }
      expect(satisfies).to.be.true;
      done();
    });
  });

  it("false and false must satisfies to false", function(done) {
    new FalseSpecification()
      .and(new FalseSpecification())
      .isSatisfiedBy(null, function(err, satisfies) {
        if (err) {
          throw err;
        }
        expect(satisfies).to.be.false;
        done();
      });
  });

  it("true and false must satisfies to false", function(done) {
    new TrueSpecification()
      .and(new FalseSpecification())
      .isSatisfiedBy(null, function(err, satisfies) {
        if (err) {
          throw err;
        }
        expect(satisfies).to.be.false;
        done();
      });
  });

  it("false and true must satisfies to false", function(done) {
    new FalseSpecification()
      .and(new TrueSpecification())
      .isSatisfiedBy(null, function(err, satisfies) {
        if (err) {
          throw err;
        }
        expect(satisfies).to.be.false;
        done();
      });
  });

  it("true and true must satisfies to true", function(done) {
    new TrueSpecification()
      .and(new TrueSpecification())
      .isSatisfiedBy(null, function(err, satisfies) {
        if (err) {
          throw err;
        }
        expect(satisfies).to.be.true;
        done();
      });
  });

  it("true or true must satisfies to true", function(done) {
    new TrueSpecification()
      .or(new TrueSpecification())
      .isSatisfiedBy(null, function(err, satisfies) {
        if (err) {
          throw err;
        }
        expect(satisfies).to.be.true;
        done();
      });
  });

  it("true or false must satisfies to true", function(done) {
    new TrueSpecification()
      .or(new FalseSpecification())
      .isSatisfiedBy(null, function(err, satisfies) {
        if (err) {
          throw err;
        }
        expect(satisfies).to.be.true;
        done();
      });
  });

  it("false or true must satisfies to true", function(done) {
    new FalseSpecification()
      .or(new TrueSpecification())
      .isSatisfiedBy(null, function(err, satisfies) {
        if (err) {
          throw err;
        }
        expect(satisfies).to.be.true;
        done();
      });
  });

  it("false or false must satisfies to false", function(done) {
    new FalseSpecification()
      .or(new FalseSpecification())
      .isSatisfiedBy(null, function(err, satisfies) {
        if (err) {
          throw err;
        }
        expect(satisfies).to.be.false;
        done();
      });
  });

  it("true not false must satisfies to true", function(done) {
    new TrueSpecification()
      .not(new FalseSpecification())
      .isSatisfiedBy(null, function(err, satisfies) {
        if (err) {
          throw err;
        }
        expect(satisfies).to.be.true;
        done();
      });
  });

  it("true not true must satisfies to true", function(done) {
    new TrueSpecification()
      .not(new TrueSpecification())
      .isSatisfiedBy(null, function(err, satisfies) {
        if (err) {
          throw err;
        }
        expect(satisfies).to.be.false;
        done();
      });
  });

  it("6 is greater than 2 and greater than 3", function(done) {
    new GreaterThanSpecification(2)
      .and(new GreaterThanSpecification(3))
      .isSatisfiedBy(6, function(err, satisfies) {
        if (err) {
          throw err;
        }
        expect(satisfies).to.be.true;
        done();
      });
  });

  it("6 is greater than 2 but not than 9", function(done) {
    new GreaterThanSpecification(2)
      .and(new GreaterThanSpecification(9))
      .isSatisfiedBy(6, function(err, satisfies) {
        if (err) {
          throw err;
        }
        expect(satisfies).to.be.false;
        done();
      });
  });

  it("6 is greater than 1 and 2 and greater than 3", function(done) {
    new GreaterThanSpecification(1)
      .and(new GreaterThanSpecification(2))
      .and(new GreaterThanSpecification(3))
      .isSatisfiedBy(6, function(err, satisfies) {
        if (err) {
          throw err;
        }
        expect(satisfies).to.be.true;
        done();
      });
  });

});
