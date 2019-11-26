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

// var BlinkyDancer = class extends Dancer {
//   step () {
//     super.step();
//     this.$node.toggle();
//   }
// };

// ES5 Solution
var BlinkyDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
};

BlinkyDancer.prototype = Object.create(Dancer.prototype);
BlinkyDancer.prototype.constructor = BlinkyDancer;

BlinkyDancer.prototype.step = function() {
  Dancer.prototype.step.call(this);
  this.$node.toggle();
};
