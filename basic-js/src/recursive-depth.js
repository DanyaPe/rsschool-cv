const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class DepthCalculator with method calculateDepth
 * that calculates deoth of nested array
 * 
 * @example
 * 
 * const depthCalc = new DepthCalculator();
 * depthCalc.calculateDepth([1, 2, 3, 4, 5]) => 1
 * depthCalc.calculateDepth([1, 2, 3, [4, 5]]) => 2
 * depthCalc.calculateDepth([[[]]]) => 3
 *
 */
class DepthCalculator {
  calculateDepth(arr) {
    let result = 1;
    let temp = 1;
    arr.forEach(element => {
      if (Array.isArray(element)) temp += this.calculateDepth(element);
      if (temp > result) result = temp;
      temp = 1;
    });
    return result;
  }
}

module.exports = {
  DepthCalculator
};
