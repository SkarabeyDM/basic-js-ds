class Node {
  constructor(data, parent = null) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.parent = parent;
  }
}

module.exports = {
  Node
};