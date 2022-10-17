const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Given a singly linked list of integers l and an integer k,
 * remove all elements from list l that have a value equal to k.
 *
 * @param {List} l
 * @param {Number} k
 * @return {List}
 *
 * @example
 * For l = [3, 1, 2, 3, 4, 5] and k = 3,
 * the output should be [1, 2, 4, 5]
 *
 * Singly - linked lists are already defined using interface
 * class ListNode {
 *   constructor(x) {
 *     this.value = x;
 *     this.next = null;
 *   }
 * }
 */
const removeKFromList = ({ value, next }, k) =>
  next === null ?
    value === k ? null : { value, next }
    :
    value === k ? removeKFromList(next, k) : { value, next: removeKFromList(next, k) };

// const list = {
//   next: {
//     next: {
//       next: {
//         next: null,
//         value: 1
//       },
//       value: 2
//     },
//     value: 2
//   },
//   value: 1
// }
// console.log(removeKFromList(list, 1))
module.exports = {
  removeKFromList
};
