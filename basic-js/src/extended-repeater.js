const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *  
 * @param {String} str string to repeat
 * @param {Object} options options object 
 * @return {String} repeating string
 * 
 *
 * @example
 * 
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  let result = typeof str === 'string' ? str : String(str);
  let additionResult = '';
  if (Object.hasOwn(options, 'addition')) {
    const additionString = typeof options.addition === 'string' ? options.addition : String(options.addition);
    additionResult = additionString;
    for (let i = 1; i < (Object.hasOwn(options, 'additionRepeatTimes') ? options.additionRepeatTimes : 1); i++) {
      additionResult = additionResult.concat(options.additionRepeatTimes > 1 ? (Object.hasOwn(options, 'additionSeparator') ? options.additionSeparator : '|') : '', additionString);
    }
  }
  result = result.concat('', additionResult);
  const temp = result;
  for (let i = 1; i < (Object.hasOwn(options, 'repeatTimes') ? options.repeatTimes : 1); i++) {
    result = result.concat(Object.hasOwn(options, 'separator') ? options.separator : '+', temp);
  }
  return result;
}

module.exports = {
  repeater
};
