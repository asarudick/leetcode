export class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }

  getLeft(): TreeNode<T> | null {
    return this.left;
  }

  setLeft(left: TreeNode<T> | null): void {
    this.left = left;
  }

  getRight(): TreeNode<T> | null {
    return this.right;
  }

  setRight(right: TreeNode<T> | null): void {
    this.right = right;
  }
}