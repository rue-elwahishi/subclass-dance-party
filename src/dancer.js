/**
 * ES6 Solution explained
 *
 * JavaScript’s global object (window in web browsers, global in Node.js)
 * is more a bug than a feature, especially with regard to performance.
 * That’s why it’s not surprising that ES6 introduces a distinction:
 *
 * All properties of the global object are global variables.
 * In global scope, the following declarations create such properties:
 *   - `var` declarations
 *   - Function declarations
 *
 * But there are now also global variables that are not properties of the global object.
 * In global scope, the following declarations create such variables:
 *   - `let` declarations
 *   - `const` declarations
 *   - Class declarations
 *
 * Source: http://www.2ality.com/2015/02/es6-scoping.html
 *
 * In this sprint, we use the `window` object to dynamically select the
 * constructor function to be instantiated. Because of the rule above,
 * we have to use an anonymous class expression with the `var` keyword
 */

// var Dancer = class {
//   constructor(top, left, timeBetweenSteps) {
//     this.$node = $('<span class="dancer"></span>');
//     this._timeBetweenSteps = timeBetweenSteps;
//     this.step();
//     this.setPosition(top,left);
//   }

//   step() {
//     // Arrow function acknowledges lexical `this`
//     setTimeout(() => this.step(), this._timeBetweenSteps)
//   }

//   setPosition(top, left) {
//     var styleSettings = {
//       top: top,
//       left: left
//     };
//     this.$node.css(styleSettings);
//   }
// }

// ES5 Solution
var Dancer = function(top, left, timeBetweenSteps) {
  this.$node = $('<span class="dancer"></span>');
  this._timeBetweenSteps = timeBetweenSteps;
  this.step();
  this.setPosition(top, left);
};

Dancer.prototype.step = function() {
  // There are two implementations below: one that requires an extra
  // clock tick in the test, and one that does not. In blinkyDanceSpec.js,
  // notice there are two back-to-back invocations of:
  //
  //   clock.tick(timeBetweenSteps);
  //   clock.tick(timeBetweenSteps);
  //
  // Depending on which approach you take, this extra clock tick may
  // be necessary.

  // v1: requires an extra clock tick
  // setTimeout(this.step.bind(this), this._timeBetweenSteps);

  // v2: does not require extra clock tick
  var context = this;
  setTimeout(function() {
    context.step();
  }, this._timeBetweenSteps);
};

Dancer.prototype.setPosition = function(top, left) {
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};
