# Specification pattern for NodeJS

Specification pattern implementation for NodeJS. Suitable for any kind of validations, simplifying, improving reusability and and making code clearer.

Although the [specification pattern](https://en.wikipedia.org/wiki/Specification_pattern) is mainly use in [DDD](https://en.wikipedia.org/wiki/Domain-driven_design) to check business rules, I the idea of combine rules offers great flexibility.

This is a JavaScript implementation of the pattern, both synchronous and asynchronous versions, so you can create your custom validation rules and combine them easily into a new rule.


## How to use ?

First step is to include the required version (synchronous or asynchronous):

```javascript
// Asynchronous version
var specification = require("specification").Specification;

// Synchronous version
var specificationSync = require("specification").SpecificationSync;
```

For each business rule (or validation) you need to check, a specification must be created. Next code creates a specification that checks if a number is greater than the one indicated at the specification:

```javascript
function GreaterThan(num) {
  this.num = num;
}
// Make it a subclass of SpecificationSync base class.
GreaterThan.prototype = Object.create(SpecificationSync);

// Implement the 'isSatisfiedBy' method.
GreaterThan.prototype.isSatisfiedBy = function(n) {
  return (n > this.num);
};
```

Later, to use the previous specification:

```javascript
var greaterThan6 = new GreaterThan(6);

if (greaterThan6.isSatisfiedBy(9)) {
  console.log("9 is greater than 6");
}
```

The base class `SpecificationSync` offers the `and`, `or` and `not` methods we can use to chain specifications and build complex ones. For example:

```javascript
var greaterThan6 = new GreaterThan(6);
var greaterThan8 = new GreaterThan(8);

var greaterThan6And8 = greaterThan6.and(greaterThan8);

if (greaterThan6And8.isSatisfiedBy(9)) {
  console.log("9 is greater than 6 and 8");
}
```


The asynchronous version is suitable if you need to check agains an asynchronous source, like a database, files, etc. The only difference is the way to implement the `isSatisfiedBy()` method, which must be use a callback, for example:

```javascript
function GreaterThan(num) {
  this.num = num;
}
GreaterThan.prototype = Object.create(Specification);
GreaterThan.prototype.isSatisfiedBy = function(n, cb) {
  return cb(null, n > this.num);
};
```

and to use it you can make via the callback:

```javascript
var greaterThan6 = new GreaterThan(6);

greaterThan6.isSatisfiedBy(9, function(err, satisfies) {
  if (satisfies) {
    console.log("9 is greater than 6");
  }
});
```

Chaining specifications works in the same way as the synchronous version, simply remember the only difference is the way to use the `isSatisfiedBy()` method:

```javascript
new GreaterThan(1)
  .and(new GreaterThan(2))
  .and(new GreaterThan(3))
  .isSatisfiedBy(6, function(err, satisfies) {
    if (satisfies) {
      console.log("6 is greater than 1, 2 and 3");
    }
  });
```

---

The MIT License (MIT)

Copyright (c) 2015 Antonio Santiago (@acanimal)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
