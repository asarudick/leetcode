import { TreeNode } from "../lib/TreeNode";

export function isSameTree(p: TreeNode<number> | null, q: TreeNode<number> | null): boolean {
  if (!p && !q) {
    return true;
  }

  if (!p || !q) {
    return false;
  }

  if (p?.value !== q?.value) {
    return false;
  }

  if (!(q.left && isSameTree(p.left, q.left)) || !(q.right && isSameTree(p.right, q.right))) {
    return false;
  }

  return true;
}

export function isSubsetTree(root: TreeNode<number> | null, subRoot: TreeNode<number> | null): boolean {
  if (!subRoot && !root) return true;
  if (!subRoot || !root) return false;
  function recurse(root: TreeNode<number> | null, subRoot: TreeNode<number> | null): boolean {
    if (!subRoot) return true;
    if (!root) return false;

    if (root.value === subRoot.value) {
      return recurse(root.left, subRoot.left) && recurse(root.right, subRoot.right);
    }

    return recurse(root.left, subRoot) || recurse(root.right, subRoot);
  }

  return recurse(root, subRoot);
}
