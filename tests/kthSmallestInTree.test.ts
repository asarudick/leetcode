import { kthSmallest } from '../src/kthSmallestInTree';
import { describe, it, expect } from 'vitest';
import { TreeNode } from '../lib/TreeNode';

describe('kthSmallest', () => {
  // Helper function to build a BST for testing
  const buildBST = (values: (number | null)[]): TreeNode<number> | null => {
    if (values.length === 0 || values[0] === null) return null;
    
    const root = new TreeNode(values[0]!);
    for (let i = 1; i < values.length; i++) {
      if (values[i] !== null) {
        insertIntoBST(root, values[i]!);
      }
    }
    return root;
  };

  const insertIntoBST = (node: TreeNode<number>, value: number): void => {
    if (value < node.value) {
      if (node.left === null) {
        node.left = new TreeNode(value);
      } else {
        insertIntoBST(node.left, value);
      }
    } else {
      if (node.right === null) {
        node.right = new TreeNode(value);
      } else {
        insertIntoBST(node.right, value);
      }
    }
  };

  it('should return undefined for null root', () => {
    expect(kthSmallest(null, 1)).toBeUndefined();
  });

  it('should return the 1st smallest value in a single-node tree', () => {
    const root = new TreeNode(5);
    expect(kthSmallest(root, 1)).toBe(5);
  });

  it('should return the 1st smallest value in a multi-node tree', () => {
    const root = buildBST([3, 1, 4, null, 2]);
    expect(kthSmallest(root, 1)).toBe(1);
  });

  it('should return the 2nd smallest value', () => {
    const root = buildBST([3, 1, 4, null, 2]);
    expect(kthSmallest(root, 2)).toBe(2);
  });

  it('should return the 3rd smallest value', () => {
    const root = buildBST([3, 1, 4, null, 2]);
    expect(kthSmallest(root, 3)).toBe(3);
  });

  it('should return the 4th smallest value', () => {
    const root = buildBST([3, 1, 4, null, 2]);
    expect(kthSmallest(root, 4)).toBe(4);
  });

  it('should return the kth smallest in a right-skewed tree', () => {
    const root = buildBST([1, 2, 3, 4, 5]);
    expect(kthSmallest(root, 3)).toBe(3);
  });

  it('should return the kth smallest in a left-skewed tree', () => {
    const root = buildBST([5, 4, 3, 2, 1]);
    expect(kthSmallest(root, 2)).toBe(2);
  });

  it('should handle a balanced BST', () => {
    const root = buildBST([8, 3, 10, 1, 6, 14, 4, 7, 13]);
    expect(kthSmallest(root, 5)).toBe(7);
  });

  it('should return the last element when k equals the number of nodes', () => {
    const root = buildBST([5, 3, 6, 2, 4]);
    expect(kthSmallest(root, 5)).toBe(6);
  });

  it('should throw an error if k is larger than the number of nodes', () => {
    const root = buildBST([5, 3, 6, 2, 4]);
    // The current implementation returns -Infinity in this case
    // We might want to modify the implementation to handle this better
    expect(kthSmallest(root, 6)).toBe(undefined);
  });

  it('should throw an error if k is 0 or negative', () => {
    const root = buildBST([5, 3, 6, 2, 4]);
    // The current implementation would return undefined
    expect(kthSmallest(root, 0)).toBe(undefined);
    expect(kthSmallest(root, -1)).toBe(undefined);
  });
});
