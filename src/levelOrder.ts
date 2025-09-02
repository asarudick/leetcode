import { TreeNode } from "../lib/TreeNode";

export function levelOrder(root: TreeNode<number> | null): number[][] {
  if (!root) {
    return [];
  }
  
  let level = [root];
  const result: TreeNode<number>[][] = [];

  while (level.length) {
    result.push([...level]);

    const next: Array<TreeNode<number>> = [];

    while (level.length) {
      const node = level.shift()!;
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }

    level = next;
  }

  return result.map(t => t.map(n => n.value));
}
