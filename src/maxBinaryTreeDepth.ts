import { TreeNode } from '../lib/TreeNode';

export function maxBinaryTreeDepth(root: TreeNode<number> | null): number {
  function recurse(root: TreeNode<number> | null): number {
    if (root === null) {
      return 0;
    }

    const leftDepth = recurse(root.left);
    const rightDepth = recurse(root.right);

    return 1 + Math.max(leftDepth, rightDepth);
  }

  return recurse(root);
}


export function maxBinaryTreeDepthIterative(root: TreeNode<number> | null): number {
  if (!root) {
    return 0;
  }
  let maxSoFar = 0;
  const stack: [{node: TreeNode<number>, depth: number}] = [{node: root, depth: 1}];

  while (stack.length) {
    const {node, depth} = stack.pop()!;
    maxSoFar = Math.max(maxSoFar, depth);
    if (node.left) stack.push({ node: node.left, depth: depth + 1 });
    if (node.right) stack.push({ node: node.right, depth: depth + 1 });
  }

  return maxSoFar;
}