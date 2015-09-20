/* eslint-disable no-unused-expressions */
"use strict";

var expect = require("chai").expect;
var SpecificationSync = require("../index").SpecificationSync;


// Define a true SpecificationSync
function TrueSpecificationSync() {}
TrueSpecificationSync.prototype = Object.create(SpecificationSync);
TrueSpecificationSync.prototype.isSatisfiedBy = function(obj) {
  return true;
};

// Define a false SpecificationSync
function FalseSpecificationSync() {}
FalseSpecificationSync.prototype = Object.create(SpecificationSync);
FalseSpecificationSync.prototype.isSatisfiedBy = function(obj) {
  return false;
};

// Define a greater than SpecificationSync
function GreaterThanSpecificationSync(num) {
  this.num = num;
}
GreaterThanSpecificationSync.prototype = Object.create(SpecificationSync);
GreaterThanSpecificationSync.prototype.isSatisfiedBy = function(n) {
  return (n > this.num);
};

// Define a less than SpecificationSync
function LessThanSpecificationSync(num) {
  this.num = num;
}
LessThanSpecificationSync.prototype = Object.create(SpecificationSync);
LessThanSpecificationSync.prototype.isSatisfiedBy = function(n) {
  return (n < this.num);
};

describe("Specification synchronous pattern", function() {

  it("false SpecificationSync must satisfies to false", function() {
    var satisfies = new FalseSpecificationSync().isSatisfiedBy(null);
    expect(satisfies).to.be.false;
  });

  it("true SpecificationSync must satisfies to true", function() {
    var satisfies = new TrueSpecificationSync().isSatisfiedBy(null);
    expect(satisfies).to.be.true;
  });

  it("false and false must satisfies to false", function() {
    var satisfies = new FalseSpecificationSync()
      .and(new FalseSpecificationSync())
      .isSatisfiedBy(null);
    expect(satisfies).to.be.false;
  });

  it("true and false must satisfies to false", function() {
    var satisfies = new TrueSpecificationSync()
      .and(new FalseSpecificationSync())
      .isSatisfiedBy(null);
    expect(satisfies).to.be.false;
  });

  it("false and true must satisfies to false", function() {
    var satisfies = new FalseSpecificationSync()
      .and(new TrueSpecificationSync())
      .isSatisfiedBy(null);
    expect(satisfies).to.be.false;
  });

  it("true and true must satisfies to true", function() {
    var satisfies = new TrueSpecificationSync()
      .and(new TrueSpecificationSync())
      .isSatisfiedBy(null);
    expect(satisfies).to.be.true;
  });

  it("true or true must satisfies to true", function() {
    var satisfies = new TrueSpecificationSync()
      .or(new TrueSpecificationSync())
      .isSatisfiedBy(null);
    expect(satisfies).to.be.true;
  });

  it("true or false must satisfies to true", function() {
    var satisfies = new TrueSpecificationSync()
      .or(new FalseSpecificationSync())
      .isSatisfiedBy(null);
    expect(satisfies).to.be.true;
  });

  it("false or true must satisfies to true", function() {
    var satisfies = new FalseSpecificationSync()
      .or(new TrueSpecificationSync())
      .isSatisfiedBy(null);
    expect(satisfies).to.be.true;
  });

  it("false or false must satisfies to false", function() {
    var satisfies = new FalseSpecificationSync()
      .or(new FalseSpecificationSync())
      .isSatisfiedBy(null);
    expect(satisfies).to.be.false;
  });

  it("true not false must satisfies to true", function() {
    var satisfies = new TrueSpecificationSync()
      .not(new FalseSpecificationSync())
      .isSatisfiedBy(null);
    expect(satisfies).to.be.true;
  });

  it("true not true must satisfies to true", function() {
    var satisfies = new TrueSpecificationSync()
      .not(new TrueSpecificationSync())
      .isSatisfiedBy(null);
    expect(satisfies).to.be.false;
  });

  it("6 is greater than 2 and greater than 3", function() {
    var satisfies = new GreaterThanSpecificationSync(2)
      .and(new GreaterThanSpecificationSync(3))
      .isSatisfiedBy(6);
    expect(satisfies).to.be.true;
  });

  it("6 is greater than 2 but not than 9", function() {
    var satisfies = new GreaterThanSpecificationSync(2)
      .and(new GreaterThanSpecificationSync(9))
      .isSatisfiedBy(6);
    expect(satisfies).to.be.false;
  });

  it("6 is greater than 1 and 2 and greater than 3", function() {
    var satisfies = new GreaterThanSpecificationSync(1)
      .and(new GreaterThanSpecificationSync(2))
      .and(new GreaterThanSpecificationSync(3))
      .isSatisfiedBy(6);
    expect(satisfies).to.be.true;
  });

});
