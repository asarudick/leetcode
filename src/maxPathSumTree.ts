import { TreeNode } from "../lib/TreeNode";

export function maxPathSumTree(root: TreeNode<number> | null): number {
  if (!root) return 0;
  let maxSoFar = -Infinity;

  function recurse(root: TreeNode<number> | null): number {
    if (!root) return 0;

    const left = Math.max(0, recurse(root.left));
    const right = Math.max(0, recurse(root.right));

    const split = root.value + right + left;

    maxSoFar = Math.max(split, maxSoFar);

    return root.value + Math.max(left, right);
  }

  recurse(root);
  return maxSoFar;
}
