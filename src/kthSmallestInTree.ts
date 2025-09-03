import { TreeNode } from "../lib/TreeNode";

export function kthSmallest(root: TreeNode<number> | null, k: number): number | undefined {

  let count = 0;
  let result;

  function recurse(root: TreeNode<number> | null, k: number) {
    if (!root) {
      return;
    }

    recurse(root.left, k); 
    
    count++;
    console.log({count, k, root})
    if (count === k) {
      result = root.value;
      return;
    }

    recurse(root.right, k);
  }

  recurse(root, k);

  return result;
}
