const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  #root = null
  #min = null
  #max = null

  root = () => this.#root
  #getDir(value, { data, left, right }) {
    return value > data ? right : left
  }
  #isLeaf = ({ left, right }) => !(left || right)

  getNode(value = undefined, node = this.#root, prev = null, beforeNull = false) {
    if (!node || value === undefined) return { node, prev }

    const { data } = node
    const dir = this.#getDir(value, node)


    if (value === data || (beforeNull && !dir))
      return { node, prev }

    return this.getNode(value, dir, node, beforeNull)
  }


  add(data) {
    if (!this.#root) {
      this.#root = new Node(data)

      // Set range
      this.#max = data
      this.#min = data
    }
    else {
      const { node, prev } = this.getNode(data)
      let newNode = new Node(data)
      if (!node) {
        if (data > prev.data)
          prev.right = newNode
        else prev.left = newNode
      }

      // Set range
      if (data > this.#max)
        this.#max = data
      else if (data < this.#min || this.#min === null)
        this.#min = data
    }
  }

  has(data) {
    return !!this.getNode(data)["node"]
  }

  find(data) {
    return this.getNode(data)["node"]
  }

  remove(data) {
    let { node, prev } = this.getNode(data)
    if (node) {
      if(this.#isLeaf(node)){
        prev[prevDir ? "right" : "left"] = null
      } else{
        const prevDir = prev.data < node.data
        let { node: nextNode, prev: nextPrev } = this.getNode(data, node.left || node.right, node, true)
        console.log(nextNode)
        //node.data = nextNode.data
        prev[prevDir ? "right" : "left"] = nextNode
        console.log(this.#root)
      }



    }
  }

  min = () => this.#min

  max = () => this.#max
}

const BST = new BinarySearchTree()
BST.add(7)
BST.add(3)
BST.add(4)
BST.add(5)
BST.add(6)
BST.add(9)
BST.add(8)
BST.add(12)
BST.remove(3)

let output = BST.getNode(6)

console.log(output)

module.exports = {
  BinarySearchTree
};