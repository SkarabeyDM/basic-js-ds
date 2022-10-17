const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {

  #back = null
  #front

  getUnderlyingList = () => this.#front

  enqueue(value) {
    const node = new ListNode(value)
    if (this.#back !== null)
      this.#back.next = node
    else
      this.#front = node

    this.#back = node
  }

  dequeue() {
    const value = this.#front.value
    this.#front = this.#front.next
    return value
  }
}

// const Q = new Queue()
// Q.enqueue(1)
// Q.enqueue(2)
// Q.enqueue(3)
// Q.dequeue()
// Q.enqueue(5)

// console.log(Q.getUnderlyingList())

module.exports = {
  Queue
};
