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

  if (!isSameTree(p.left, q.left) || !isSameTree(p.right, q.right)) {
    return false;
  }

  return true;
}

export function isSameTreeIterative(p: TreeNode<number> | null, q: TreeNode<number> | null): boolean {
  const queue: [{ p: TreeNode<number> | null, q: TreeNode<number> | null }] = [{ p, q }];

  while (queue.length) {
    const {p: a, q: b} = queue.shift()!;

    if (!a && !b) {
      continue;
    }

    if (!a || !b) {
      return false;
    }

    if (a.value !== b.value) {
      return false;
    }

    queue.push({ p: a.left, q: b.left });
    queue.push({ p: a.right, q: b.right });
  }

  return true;
}
