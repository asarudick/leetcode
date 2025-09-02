import { levelOrder } from '../src/levelOrder';
import { describe, it, expect } from 'vitest';
import { TreeNode } from '../lib/TreeNode';

describe('levelOrder', () => {
  it('should return an empty array for null root', () => {
    const result = levelOrder(null);
    expect(result).toEqual([]);
  });

  it('should return level order traversal for a single node tree', () => {
    const root = new TreeNode(1);
    const result = levelOrder(root);
    expect(result).toEqual([[1]]);
  });

  it('should return level order traversal for a tree with multiple levels', () => {
    const root = new TreeNode(3);
    root.left = new TreeNode(9);
    root.right = new TreeNode(20);
    root.right.left = new TreeNode(15);
    root.right.right = new TreeNode(7);

    const result = levelOrder(root);
    expect(result).toEqual([[3], [9, 20], [15, 7]]);
  });

  it('should return level order traversal for a left-skewed tree', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.left.left = new TreeNode(3);
    root.left.left.left = new TreeNode(4);

    const result = levelOrder(root);
    expect(result).toEqual([[1], [2], [3], [4]]);
  });

  it('should return level order traversal for a right-skewed tree', () => {
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    root.right.right = new TreeNode(3);
    root.right.right.right = new TreeNode(4);

    const result = levelOrder(root);
    expect(result).toEqual([[1], [2], [3], [4]]);
  });

  it('should return level order traversal for a tree with only left children after root', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.left.left = new TreeNode(3);
    root.left.right = new TreeNode(4);

    const result = levelOrder(root);
    expect(result).toEqual([[1], [2], [3, 4]]);
  });

  it('should return level order traversal for a tree with only right children after root', () => {
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    root.right.left = new TreeNode(3);
    root.right.right = new TreeNode(4);

    const result = levelOrder(root);
    expect(result).toEqual([[1], [2], [3, 4]]);
  });
});
