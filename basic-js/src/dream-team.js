const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create name of dream team based on the names of its members
 *  
 * @param {Array} members names of the members 
 * @return {String | Boolean} name of the team or false
 * in case of incorrect members
 *
 * @example
 * 
 * createDreamTeam(['Matt', 'Ann', 'Dmitry', 'Max']) => 'ADMM'
 * createDreamTeam(['Olivia', 1111, 'Lily', 'Oscar', true, null]) => 'LOO'
 *
 */
function createDreamTeam(members) {
  try {
    const resArr = members.filter((element) => typeof element === 'string');
    let result = [];
    if (resArr.length > 0) {
      resArr.forEach((element) => {result.push(element.trim()[0].toUpperCase())});
      return result.sort().join('');
    }
    return false;
  } catch (err) {
    return false;
  }
}

module.exports = {
  createDreamTeam
};
