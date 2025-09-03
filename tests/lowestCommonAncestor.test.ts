import { lowestCommonAncestor } from '../src/lowestCommonAncestor';
import { describe, it, expect, beforeEach } from 'vitest';
import { TreeNode } from '../lib/TreeNode';

describe('lowestCommonAncestor', () => {
  let root: TreeNode<number> | null;

  beforeEach(() => {
    // Reset the root for each test
    root = null;
  });

  function buildBST(values: number[]): TreeNode<number> | null {
    if (values.length === 0) return null;
    const rootValue = values.shift()!;
    const rootNode = new TreeNode(rootValue);
    const queue: TreeNode<number>[] = [rootNode];
    while (values.length > 0 && queue.length > 0) {
      const current = queue.shift()!;
      if (values.length > 0) {
        const leftValue = values.shift()!;
        if (leftValue !== null) { // Assuming null in array means no node
          current.left = new TreeNode(leftValue);
          queue.push(current.left);
        }
      }
      if (values.length > 0) {
        const rightValue = values.shift()!;
        if (rightValue !== null) { // Assuming null in array means no node
          current.right = new TreeNode(rightValue);
          queue.push(current.right);
        }
      }
    }
    return rootNode;
  }

  it('should return null if root is null', () => {
    const p = new TreeNode(1);
    const q = new TreeNode(2);
    expect(lowestCommonAncestor(null, p, q)).toBeNull();
  });

  it('should return null if p or q is null', () => {
    root = buildBST([2, 1, 3]);
    const p = new TreeNode(1);
    const qNull = null;
    expect(lowestCommonAncestor(root, p, qNull)).toBeNull();
    expect(lowestCommonAncestor(root, qNull, p)).toBeNull();
  });

  it('should return the LCA for a simple BST (p and q are children of root)', () => {
    //      6
    //     / \
    //    2   8
    root = buildBST([6, 2, 8]);
    const p = root!.left; // node with value 2
    const q = root!.right; // node with value 8
    const lca = lowestCommonAncestor(root, p, q);
    expect(lca).toBe(root); // LCA should be node 6
    expect(lca!.value).toBe(6);
  });

  it('should return LCA when p is the ancestor of q', () => {
    //      6
    //     / \
    //    2   8
    //   / \
    //  0   4
    const p = new TreeNode(2);
    const q = new TreeNode(4);
    // Manually build to ensure correct node references
    root = new TreeNode(6);
    root.left = p;
    root.right = new TreeNode(8);
    p.left = new TreeNode(0);
    p.right = q;

    const lca = lowestCommonAncestor(root, p, q);
    expect(lca).toBe(p); // LCA should be node 2
    expect(lca!.value).toBe(2);
  });

  it('should return LCA when q is the ancestor of p', () => {
    //      6
    //     / \
    //    2   8
    //         \
    //          9
    const p = new TreeNode(9);
    const q = new TreeNode(8);
    // Manually build to ensure correct node references
    root = new TreeNode(6);
    root.left = new TreeNode(2);
    root.right = q;
    q.right = p;

    const lca = lowestCommonAncestor(root, p, q);
    expect(lca).toBe(q); // LCA should be node 8
    expect(lca!.value).toBe(8);
  });

  it('should return LCA when p and q are on the same side', () => {
    //      6
    //     / \
    //    2   8
    //   / \   \
    //  0   4   9
    //         /
    //        7
    // Assuming p is 4, q is 0. LCA is 2.
    // Assuming p is 4, q is 7. LCA is 6.
    // Assuming p is 7, q is 9. LCA is 6.

    // Test case 1: p=4, q=0, LCA=2
    root = buildBST([6, 2, 8, 0, 4, null, 9, null, null, null, null, 7, null]);
    const p1 = root!.left!.right; // node with value 4
    const q1 = root!.left!.left; // node with value 0
    let lca1 = lowestCommonAncestor(root, p1, q1);
    expect(lca1!.value).toBe(2);

    // Test case 2: p=4, q=7, LCA=6
    const p2 = root!.left!.right; // node with value 4
    const q2 = root!.right!.right!.left; // node with value 7
    let lca2 = lowestCommonAncestor(root, p2, q2);
    expect(lca2!.value).toBe(6);
    
    // Test case 3: p=7, q=9, LCA=6
    const p3 = root!.right!.right!.left; // node with value 7
    const q3 = root!.right!.right; // node with value 9
    let lca3 = lowestCommonAncestor(root, p3, q3);
    expect(lca3!.value).toBe(8);
  });

  it('should return p if p and q are the same node', () => {
    //      6
    //     / \
    //    2   8
    const p = new TreeNode(2);
    const q = new TreeNode(2); // Same value, but different instance for testing reference
    // To test "descendant of itself", p and q should be the same instance
    const sameNodeInstance = new TreeNode(2);

    root = new TreeNode(6);
    root.left = sameNodeInstance;
    root.right = new TreeNode(8);

    const lca = lowestCommonAncestor(root, sameNodeInstance, sameNodeInstance);
    expect(lca).toBe(sameNodeInstance);
    expect(lca!.value).toBe(2);
  });

  it('should handle a skewed tree (left children only)', () => {
    //      5
    //     /
    //    4
    //   /
    //  3
    // /
    //2
    root = buildBST([5, 4, null, 3, null, null, null, 2]); // Adjusted build for left skew
    // Manual build for left skewed tree for clarity in testing node instances
    root = new TreeNode(5);
    let current = root;
    current.left = new TreeNode(4); // p
    current = current.left;
    current.left = new TreeNode(3);
    current = current.left;
    current.left = new TreeNode(2); // q

    const p = root!.left; // 4
    const q = root!.left!.left!.left; // 2
    const lca = lowestCommonAncestor(root, p, q);
    expect(lca).toBe(p); // LCA should be 4
    expect(lca!.value).toBe(4);
  });

  it('should handle a skewed tree (right children only)', () => {
    // 2
    //  \
    //   3
    //    \
    //     4
    //      \
    //       5
    root = new TreeNode(2);
    let current = root;
    current.right = new TreeNode(3); // p
    current = current.right;
    current.right = new TreeNode(4);
    current = current.right;
    current.right = new TreeNode(5); // q

    const p = root!.right; // 3
    const q = root!.right!.right!.right; // 5
    const lca = lowestCommonAncestor(root, p, q);
    expect(lca).toBe(p); // LCA should be 3
    expect(lca!.value).toBe(3);
  });

  it('should return root if p or q is root and the other is a descendant', () => {
    //      6
    //     / \
    //    2   8
    //   / \   \
    //  0   4   9
    const p = new TreeNode(6); // Root instance
    const q = new TreeNode(2); // Direct child of root

    root = p;
    root.left = q;
    root.right = new TreeNode(8);

    const lca1 = lowestCommonAncestor(root, p, q);
    expect(lca1).toBe(p); // LCA should be root (6)
    expect(lca1!.value).toBe(6);

    const q2 = new TreeNode(9); // Descendant of root
    root.right!.right = q2;
    const lca2 = lowestCommonAncestor(root, p, q2);
    expect(lca2).toBe(p); // LCA should be root (6)
    expect(lca2!.value).toBe(6);
  });
});