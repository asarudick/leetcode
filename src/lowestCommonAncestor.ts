import { TreeNode } from "../lib/TreeNode";

export function lowestCommonAncestor(root: TreeNode<number> | null, p: TreeNode<number> | null, q: TreeNode<number> | null): TreeNode<number> | null {
  function recurse(root: TreeNode<number> | null, p: TreeNode<number> | null, q: TreeNode<number> | null): TreeNode<number> | null {
    if (!root) {
      return null;
    }

    if (!q || !p) {
      return null;
    }

    // If either split occurs, this is the lowest common ancestor.
    if (root.value >= q.value && root.value <= p.value) {
      return root;
    }

    if (root.value <= q.value && root.value >= p.value) {
      return root;
    }

    if (root.value > q.value && root.value > p.value) {
      return recurse(root.left, p, q);
    }

    if (root.value < q.value && root.value < p.value) {
      return recurse(root.right, p, q);
    }

    return null;
  }

  return recurse(root, p, q);
}
