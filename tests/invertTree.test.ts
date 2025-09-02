import { invertTree } from '../src/invertTree';
import { TreeNode } from '../lib/TreeNode';
import { describe, it, expect } from 'vitest';

describe('invertTree', () => {
  it('should return null for null input', () => {
    expect(invertTree(null)).toBeNull();
  });

  it('should invert a tree with only root node', () => {
    const root = new TreeNode(1);
    const inverted = invertTree(root);
    expect(inverted!.value).toBe(1);
    expect(inverted!.left).toBeNull();
    expect(inverted!.right).toBeNull();
  });

  it('should invert a tree with left and right children', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);

    const inverted = invertTree(root);

    // Root should remain the same
    expect(inverted!.value).toBe(1);

    // Left and right should be swapped
    expect(inverted!.left!.value).toBe(3);
    expect(inverted!.right!.value).toBe(2);

    // Children of swapped nodes should be null (original leaf nodes)
    expect(inverted!.left!.left).toBeNull();
    expect(inverted!.left!.right).toBeNull();
    expect(inverted!.right!.left).toBeNull();
    expect(inverted!.right!.right).toBeNull();
  });

  it('should invert a more complex tree', () => {
    //     4
    //    / \
    //   2   7
    //  / \ / \
    // 1  3 6  9
    const root = new TreeNode(4);
    root.left = new TreeNode(2);
    root.right = new TreeNode(7);
    root.left.left = new TreeNode(1);
    root.left.right = new TreeNode(3);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(9);

    const inverted = invertTree(root);

    // Root should remain the same
    expect(inverted!.value).toBe(4);

    // Level 1 swap
    expect(inverted!.left!.value).toBe(7);
    expect(inverted!.right!.value).toBe(2);

    // Level 2 swap
    expect(inverted!.left!.left!.value).toBe(9);
    expect(inverted!.left!.right!.value).toBe(6);
    expect(inverted!.right!.left!.value).toBe(3);
    expect(inverted!.right!.right!.value).toBe(1);

    // All children should be null (original leaf nodes)
    expect(inverted!.left!.left!.left).toBeNull();
    expect(inverted!.left!.left!.right).toBeNull();
    expect(inverted!.left!.right!.left).toBeNull();
    expect(inverted!.left!.right!.right).toBeNull();
    expect(inverted!.right!.left!.left).toBeNull();
    expect(inverted!.right!.left!.right).toBeNull();
    expect(inverted!.right!.right!.left).toBeNull();
    expect(inverted!.right!.right!.right).toBeNull();
  });

  it('should invert a tree with only left children', () => {
    //     1
    //    /
    //   2
    //  /
    // 3
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.left.left = new TreeNode(3);

    const inverted = invertTree(root);

    // Root should remain the same
    expect(inverted!.value).toBe(1);

    // Left should become right
    expect(inverted!.left).toBeNull();
    expect(inverted!.right!.value).toBe(2);

    // Left child of original left should become right child of original right
    expect(inverted!.right!.left).toBeNull();
    expect(inverted!.right!.right!.value).toBe(3);
  });

  it('should invert a tree with only right children', () => {
    //     1
    //      \
    //       2
    //        \
    //         3
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    root.right.right = new TreeNode(3);

    const inverted = invertTree(root);

    // Root should remain the same
    expect(inverted!.value).toBe(1);

    // Right should become left
    expect(inverted!.right).toBeNull();
    expect(inverted!.left!.value).toBe(2);

    // Right child of original right should become left child of original left
    expect(inverted!.left!.right).toBeNull();
    expect(inverted!.left!.left!.value).toBe(3);
  });
});
