import { isSameTree, isSameTreeIterative } from '../src/sameTree';
import { describe, it, expect } from 'vitest';
import { TreeNode } from '../lib/TreeNode';

describe('isSameTree', () => {
  it('should return true for two empty trees', () => {
    const p: TreeNode<number> | null = null;
    const q: TreeNode<number> | null = null;
    expect(isSameTree(p, q)).toBe(true);
    expect(isSameTreeIterative(p, q)).toBe(true);
  });

  it('should return false when one tree is empty and the other is not', () => {
    const p: TreeNode<number> | null = null;
    const q = new TreeNode(1);
    expect(isSameTree(p, q)).toBe(false);
    expect(isSameTreeIterative(p, q)).toBe(false);

    const p2 = new TreeNode(1);
    const q2: TreeNode<number> | null = null;
    expect(isSameTree(p2, q2)).toBe(false);
    expect(isSameTreeIterative(p2, q2)).toBe(false);
  });

  it('should return true for identical single-node trees', () => {
    const p = new TreeNode(1);
    const q = new TreeNode(1);
    expect(isSameTree(p, q)).toBe(true);
    expect(isSameTreeIterative(p, q)).toBe(true);
  });

  it('should return false for single-node trees with different values', () => {
    const p = new TreeNode(1);
    const q = new TreeNode(2);
    expect(isSameTree(p, q)).toBe(false);
    expect(isSameTreeIterative(p, q)).toBe(false);
  });

  it('should return true for identical trees with multiple nodes', () => {
    // Tree 1:
    //     1
    //    / \
    //   2   3
    const p = new TreeNode(1);
    p.setLeft(new TreeNode(2));
    p.setRight(new TreeNode(3));

    // Tree 2:
    //     1
    //    / \
    //   2   3
    const q = new TreeNode(1);
    q.setLeft(new TreeNode(2));
    q.setRight(new TreeNode(3));

    expect(isSameTree(p, q)).toBe(true);
    expect(isSameTreeIterative(p, q)).toBe(true);
  });

  it('should return false for trees with different structures', () => {
    // Tree 1:
    //     1
    //    / 
    //   2   
    const p = new TreeNode(1);
    p.setLeft(new TreeNode(2));

    // Tree 2:
    //     1
    //      \
    //       2
    const q = new TreeNode(1);
    q.setRight(new TreeNode(2));

    expect(isSameTree(p, q)).toBe(false);
    expect(isSameTreeIterative(p, q)).toBe(false);
  });

  it('should return false for trees with different values at same position', () => {
    // Tree 1:
    //     1
    //    / \
    //   2   3
    const p = new TreeNode(1);
    p.setLeft(new TreeNode(2));
    p.setRight(new TreeNode(3));

    // Tree 2:
    //     1
    //    / \
    //   2   4
    const q = new TreeNode(1);
    q.setLeft(new TreeNode(2));
    q.setRight(new TreeNode(4));

    expect(isSameTree(p, q)).toBe(false);
    expect(isSameTreeIterative(p, q)).toBe(false);
  });

  it('should return false for trees with different depths', () => {
    // Tree 1:
    //     1
    //    / 
    //   2   
    //  /
    // 3
    const p = new TreeNode(1);
    p.setLeft(new TreeNode(2));
    p.left?.setLeft(new TreeNode(3));

    // Tree 2:
    //     1
    //    / \
    //   2   3
    const q = new TreeNode(1);
    q.setLeft(new TreeNode(2));
    q.setRight(new TreeNode(3));

    expect(isSameTree(p, q)).toBe(false);
    expect(isSameTreeIterative(p, q)).toBe(false);
  });

  it('should return true for more complex identical trees', () => {
    // Tree 1:
    //        4
    //       / \
    //      2   7
    //     / \ / \
    //    1  3 6  9
    const p = new TreeNode(4);
    p.setLeft(new TreeNode(2));
    p.setRight(new TreeNode(7));
    p.left?.setLeft(new TreeNode(1));
    p.left?.setRight(new TreeNode(3));
    p.right?.setLeft(new TreeNode(6));
    p.right?.setRight(new TreeNode(9));

    // Tree 2:
    //        4
    //       / \
    //      2   7
    //     / \ / \
    //    1  3 6  9
    const q = new TreeNode(4);
    q.setLeft(new TreeNode(2));
    q.setRight(new TreeNode(7));
    q.left?.setLeft(new TreeNode(1));
    q.left?.setRight(new TreeNode(3));
    q.right?.setLeft(new TreeNode(6));
    q.right?.setRight(new TreeNode(9));

    expect(isSameTree(p, q)).toBe(true);
    expect(isSameTreeIterative(p, q)).toBe(true);
  });

  it('should return false when only one subtree differs', () => {
    // Tree 1:
    //        4
    //       / \
    //      2   7
    //     / \   \
    //    1  3    9
    const p = new TreeNode(4);
    p.setLeft(new TreeNode(2));
    p.setRight(new TreeNode(7));
    p.left?.setLeft(new TreeNode(1));
    p.left?.setRight(new TreeNode(3));
    p.right?.setRight(new TreeNode(9));

    // Tree 2:
    //        4
    //       / \
    //      2   7
    //     / \ / \
    //    1  3 6  9
    const q = new TreeNode(4);
    q.setLeft(new TreeNode(2));
    q.setRight(new TreeNode(7));
    q.left?.setLeft(new TreeNode(1));
    q.left?.setRight(new TreeNode(3));
    q.right?.setLeft(new TreeNode(6));
    q.right?.setRight(new TreeNode(9));

    expect(isSameTree(p, q)).toBe(false);
    expect(isSameTreeIterative(p, q)).toBe(false);
  });
});