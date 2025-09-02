import { TreeNode } from "../lib/TreeNode";

export function invertTree(root: TreeNode<number> | null): TreeNode<number> | null {

  function recurse(root: TreeNode<number> | null): TreeNode<number> | null {
    if (!root) {
      return null;
    }

    const right = recurse(root.left);
    const left = recurse(root.right);

    root.right = right;
    root.left = left;

    return root;
  }

  return recurse(root);
}
