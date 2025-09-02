import { maxPathSumTree } from '../src/maxPathSumTree';
import { TreeNode } from '../lib/TreeNode';
import { describe, it, expect } from 'vitest';

describe('maxPathSumTree', () => {
  it('should return 0 for null input', () => {
    expect(maxPathSumTree(null)).toBe(0);
  });

  it('should return the value for a single node tree', () => {
    const root = new TreeNode(1);
    expect(maxPathSumTree(root)).toBe(1);
  });

  it('should return the maximum path sum for a tree with positive values', () => {
    //     1
    //    / \
    //   2   3
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    expect(maxPathSumTree(root)).toBe(6); // 1 + 2 + 3
  });

  it('should return the maximum path sum for a tree with negative values', () => {
    //      -10
    //      / \
    //     9  20
    //        / \
    //       15  7
    const root = new TreeNode(-10);
    root.left = new TreeNode(9);
    root.right = new TreeNode(20);
    root.right.left = new TreeNode(15);
    root.right.right = new TreeNode(7);
    expect(maxPathSumTree(root)).toBe(42); // 15 + 20 + 7
  });

  it('should return the maximum path sum when the best path is not through the root', () => {
    //     1
    //    / \
    //   2   3
    //  / \
    // 4   5
    // The path 4 -> 2 -> 5 has a sum of 11
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    expect(maxPathSumTree(root)).toBe(11); // 4 + 2 + 5
  });

  it('should handle trees with all negative values', () => {
    //     -1
    //    /  \
    //   -2  -3
    // The path with the highest sum is just the root node: -1
    const root = new TreeNode(-1);
    root.left = new TreeNode(-2);
    root.right = new TreeNode(-3);
    expect(maxPathSumTree(root)).toBe(-1);
  });

  it('should handle more complex trees with positive and negative values', () => {
    //       10
    //      /  \
    //     2    -10
    //    / \    \
    //   20  1   -25
    //         /  \
    //        3    4
    const root = new TreeNode(10);
    root.left = new TreeNode(2);
    root.right = new TreeNode(-10);
    root.left.left = new TreeNode(20);
    root.left.right = new TreeNode(1);
    root.right.right = new TreeNode(-25);
    root.right.right.left = new TreeNode(3);
    root.right.right.right = new TreeNode(4);
    expect(maxPathSumTree(root)).toBe(32); // 20 + 2 + 10
  });

  it('should handle a tree with only left children', () => {
    //     1
    //    /
    //   2
    //  /
    // 3
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.left.left = new TreeNode(3);
    expect(maxPathSumTree(root)).toBe(6); // 1 + 2 + 3
  });

  it('should handle a tree with only right children', () => {
    //     1
    //      \
    //       2
    //        \
    //         3
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    root.right.right = new TreeNode(3);
    expect(maxPathSumTree(root)).toBe(6); // 1 + 2 + 3
  });
});
