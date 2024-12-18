const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.baseRoot = null;
  }

  root() {
    return this.baseRoot;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.baseRoot) {
      this.baseRoot = newNode;
      return;
    }

    function addElement(node) {
      if (node.data < data) {
        if (!node.right) {
          node.right = newNode;
          return;
        }

        addElement(node.right);
      } else {
        if (!node.left) {
          node.left = newNode;
          return;
        }

        addElement(node.left);
      }
    }

    addElement(this.baseRoot);
  }

  has(data) {
    return searchNode(this.baseRoot);

    function searchNode(node) {
      if (!node) return false;

      if (node.data === data) {
        return true;
      }

      if (node.data < data) {
        return searchNode(node.right);
      } else {
        return searchNode(node.left);
      }
    }
  }

  find(data) {
    return findNode(this.baseRoot);

    function findNode(node) {
      if (!node) return null;

      if (node.data === data) {
        return node;
      }

      if (node.data < data) {
        return findNode(node.right);
      } else {
        return findNode(node.left);
      }
    }
  }

  remove(data) {
    this.baseRoot = removeNode(this.baseRoot, data);

    function removeNode(node, data) {
      if (!node) return null;

      if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else if (node.data > data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.right && node.left) {
          return node.left;
        } else if (!node.left && node.right) {
          return node.right;
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }

        node.data = minFromRight.data;
        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this.baseRoot) {
      return null;
    }

    let minValue = this.baseRoot.data;

    return findMin(this.baseRoot.left);

    function findMin(node) {
      if (!node) {
        return minValue;
      }

      minValue = node.data;
      return findMin(node.left);
    }
  }

  max() {
    if (!this.baseRoot) {
      return null;
    }

    let maxValue = this.baseRoot.data;

    return findMax(this.baseRoot.right);

    function findMax(node) {
      if (!node) {
        return maxValue;
      }

      maxValue = node.data;
      return findMax(node.right);
    }
  }
}

module.exports = {
  BinarySearchTree
};