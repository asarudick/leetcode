import { maxBinaryTreeDepth, maxBinaryTreeDepthIterative } from '../src/maxBinaryTreeDepth';
import { TreeNode } from '../lib/TreeNode';
import { describe, it, expect } from 'vitest';

describe('maxBinaryTreeDepth', () => {
  it('should return 0 for an empty tree', () => {
    expect(maxBinaryTreeDepth(null)).toBe(0);
    expect(maxBinaryTreeDepthIterative(null)).toBe(0);
  });

  it('should return 1 for a tree with only a root node', () => {
    const root = new TreeNode(1);
    expect(maxBinaryTreeDepth(root)).toBe(1);
    expect(maxBinaryTreeDepthIterative(root)).toBe(1);
  });

  it('should return the correct depth for a left-skewed tree', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.left.left = new TreeNode(3);
    root.left.left.left = new TreeNode(4);
    
    expect(maxBinaryTreeDepth(root)).toBe(4);
    expect(maxBinaryTreeDepthIterative(root)).toBe(4);
  });

  it('should return the correct depth for a right-skewed tree', () => {
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    root.right.right = new TreeNode(3);
    root.right.right.right = new TreeNode(4);
    
    expect(maxBinaryTreeDepth(root)).toBe(4);
    expect(maxBinaryTreeDepthIterative(root)).toBe(4);
  });

  it('should return the correct depth for a balanced tree', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);
    
    expect(maxBinaryTreeDepth(root)).toBe(3);
    expect(maxBinaryTreeDepthIterative(root)).toBe(3);
  });

  it('should return the correct depth for a more complex unbalanced tree', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.left.left = new TreeNode(5);
    root.right.right = new TreeNode(6);
    root.right.right.right = new TreeNode(7);
    root.right.right.right.right = new TreeNode(8);
    
    expect(maxBinaryTreeDepth(root)).toBe(5);
    expect(maxBinaryTreeDepthIterative(root)).toBe(5);
  });
});
