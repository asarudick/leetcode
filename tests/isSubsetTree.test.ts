import { isSubsetTree } from '../src/isSubsetTree';
import { describe, it, expect } from 'vitest';
import { TreeNode } from '../lib/TreeNode';

function buildTree(arr: (number | null)[]): TreeNode<number> | null {
  if (arr.length === 0 || arr[0] === null) return null;

  const root = new TreeNode(arr[0]!);
  const queue: TreeNode<number>[] = [root];
  let i = 1;

  while (queue.length > 0 && i < arr.length) {
    const current = queue.shift()!;

    if (arr[i] !== null) {
      current.left = new TreeNode(arr[i]!);
      queue.push(current.left);
    }
    i++;

    if (i < arr.length && arr[i] !== null) {
      current.right = new TreeNode(arr[i]!);
      queue.push(current.right);
    }
    i++;
  }

  return root;
}

describe('isSubsetTree', () => {
  it('should return true if subRoot is identical to a subtree of root', () => {
    const root = buildTree([3, 4, 5, 1, 2]);
    const subRoot = buildTree([4, 1, 2]);
    expect(isSubsetTree(root, subRoot)).toBe(true);
  });

  it('should return false if subRoot is not a subtree of root', () => {
    const root = buildTree([3, 4, 5, 1, 2]);
    const subRoot = buildTree([4, 1, 3]);
    expect(isSubsetTree(root, subRoot)).toBe(false);
  });

  it('should return true if subRoot is the same as root', () => {
    const root = buildTree([1, 2, 3]);
    const subRoot = buildTree([1, 2, 3]);
    expect(isSubsetTree(root, subRoot)).toBe(true);
  });

  it('should return false if subRoot is null', () => {
    const root = buildTree([1, 2, 3]);
    expect(isSubsetTree(root, null)).toBe(false);
  });

  it('should return false if root is null and subRoot is not', () => {
    const root = null;
    const subRoot = buildTree([1, 2]);
    expect(isSubsetTree(root, subRoot)).toBe(false);
  });

  it('should return true if subRoot is a single node present in root', () => {
    const root = buildTree([1, 2, 3, 4, 5]);
    const subRoot = buildTree([2]);
    expect(isSubsetTree(root, subRoot)).toBe(true);
  });

  it('should return false if subRoot is a single node not present in root', () => {
    const root = buildTree([1, 2, 3]);
    const subRoot = buildTree([4]);
    expect(isSubsetTree(root, subRoot)).toBe(false);
  });

  it('should return true for nested subtree', () => {
    const root = buildTree([3, 4, 5, 1, 2, null, null, null, null, 0]);
    const subRoot = buildTree([2, 0]);
    expect(isSubsetTree(root, subRoot)).toBe(true);
  });

  it('should return false for structure mismatch with same values', () => {
    const root = buildTree([1, 2, 3]);
    const subRoot = buildTree([1, null, 2]);
    expect(isSubsetTree(root, subRoot)).toBe(false);
  });

  it('should return true for empty trees (both null)', () => {
    expect(isSubsetTree(null, null)).toBe(true);
  });
});