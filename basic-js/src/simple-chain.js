const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 * 
 */
const chainMaker = {
  arr: [],
  getLength() {
    return (this.arr.match(/~~/g) || []).length + 1;
  },
  addLink(value) {
    this.arr.push(`( ${value} )`);
    return this;
  },
  removeLink(position) {
    if (position <= 0 | position >= this.arr.length | !Number.isInteger(position)) {
      this.arr.splice(0, this.arr.length);
      throw new Error('You can\'t remove incorrect link!');
    }
    try {
      this.arr.splice(position - 1, 1);
      return this;
    } catch(err) {
      throw new Error('You can\'t remove incorrect link!');
    }
  },
  reverseChain() {
    this.arr.reverse();
    return this;
  },
  finishChain() {
    const result = this.arr.join(`~~`);
    this.arr.splice(0, this.arr.length);
    return result;
  }
};

module.exports = {
  chainMaker
};
