const { NotImplementedError } = require('../extensions/index.js');

/**
 * Extract season from given date and expose the enemy scout!
 * 
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 * 
 * @example
 * 
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 * 
 */
function getSeason(date) {
  const test = new Date();
  if (!date) return 'Unable to determine the time of year!';
  try {
    if (Object.getOwnPropertyNames(date).length !== Object.getOwnPropertyNames(test).length) throw new Error('Invalid date!');
    const month = date.getMonth();
    if (2 <= month && month <= 4) return 'spring';
    else if (5 <= month && month <= 7) return 'summer';
    else if (8 <= month && month <= 10) return 'autumn';
    else if (11 <= month && month <= 12 || 0 <= month && month <= 1) return 'winter';
  } catch(err) {
    throw new Error('Invalid date!');
  }
}

module.exports = {
  getSeason
};
