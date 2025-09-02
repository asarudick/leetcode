import { TreeNode } from "../lib/TreeNode";

export function levelOrderWithNulls(root: TreeNode<number> | null): (number | null)[] {
  if (!root) {
    return [];
  }

  let level: Array<TreeNode<number> | null> = [root];
  const result: (TreeNode<number> | null)[][] = [];


  while (level.length) {
    result.push([...level]);

    const next: Array<TreeNode<number> | null> = [];
    while (level.length) {
      const node = level.shift();
      if (!node) {
        next.push(null, null);
        continue;
      }
      next.push(node.left);
      next.push(node.right);
    }
    
    if (next.every(n => n === null)) {
      break;
    }

    level = next;
  }

  return result.map(t => t.map(n => n?.value ?? null)).flat();
}

export function serializeTree(root: TreeNode<number> | null): string {
  return JSON.stringify(levelOrderWithNulls(root));
}
