const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree
{
  /**@property {Node} */
  #root = null

  add(data)
  {
    const dataNode = new Node(data)
    if (!this.#root) {
      this.#root = dataNode
      return
    }
    const { nearest } = this.getNode(data)
    if (nearest)
      if (data < nearest.data) nearest.left = dataNode
      else if (data > nearest.data) nearest.right = dataNode
    dataNode.parent = nearest
  }

  getNode(data, node = this.#root, callback = (data, node = this.#root) =>
  {
    let dir
    if (!node || data === node.data)
      dir = 0;
    else if (data < node.data)
      dir = -1;
    else if (data > node.data)
      dir = 1;
    return dir
  })
  {
    let next

    while (true) {
      const dir = callback(data, node)
      if (dir === 0) return { target: node, nearest: node, parent: node?.parent || null }


      if (dir === -1) {
        next = node.left
      } else if (dir === 1) {
        next = node.right
      } else
        throw new TypeError("Disparate data")

      if (next) node = next
      else return { target: next, nearest: node, parent: node?.parent || null }
    }
  }

  remove(data)
  {
    const { target } = this.getNode(data)
    if (!target) return null

    const nodeStatus = ({ left, right }) =>
    {
      let status

      if (left && right) status = "full"
      else if (left) status = "left"
      else if (right) status = "right"
      else status = "leaf"

      return status
    };

    const removeNode = (prev, newNode) =>
    {
      const { parent } = prev
      if (newNode) newNode.parent = parent
      if (parent) {
        if (parent.left === prev) parent.left = newNode
        else parent.right = newNode
      }
      else this.#root = newNode
    }

    const { parent } = target
    const status = nodeStatus(target)
    let predecessor = null
    switch (status) {

      case "full":
        predecessor = this.getNode(data, target.right).nearest
        target.data = predecessor.data
        removeNode(predecessor, predecessor.right)
        break;

      case "leaf": removeNode(target, null); break;

      default:
        predecessor = target[status];
        removeNode(target, predecessor);
        break;
    }

    /* this.render() */
  }

  find(data)
  {
    return this.getNode(data).target
  }

  has(data)
  {
    return !!this.find(data)
  }

  root = () => this.#root

  min = () => this.getNode(null, this.#root, (_, node) => node?.left ? -1 : 0).nearest?.data || null

  max = () => this.getNode(null, this.#root, (_, node) => node?.right ? 1 : 0).nearest?.data || null

  /* render()
  {
    const layers = []
    function writeLayer(node, layer = 0)
    {
      if (!node) return

      if (!layers[layer]) layers.push([])
      layers[layer].push(node.data)

      writeLayer(node.left, layer + 1)
      writeLayer(node.right, layer + 1)
    }

    writeLayer(this.#root)

    console.table(layers)
  } */
}


// const tree = new BinarySearchTree()
// tree.add(9);
// tree.add(14);
// tree.add(2);
// tree.add(6);
// tree.add(128);
// tree.add(8);
// tree.add(31);
// tree.add(54);
// tree.add(1);
// tree.render()
// tree.remove(14);
// tree.remove(8);
// tree.remove(9);

//let output = tree.remove(9)//root()


//console.log(tree.max(), tree.min(), tree.has(128) tree.has(8))

module.exports = {
  BinarySearchTree
};