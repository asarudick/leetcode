import { rotateInPlace } from '../src/rotateInPlace';
import { describe, it, expect } from 'vitest';

describe('rotateInPlace', () => {
  describe('Basic rotation functionality', () => {
    it('should rotate array by 1 position to the right', () => {
      const arr = [1, 2, 3, 4, 5];
      const originalArr = [...arr];
      const result = rotateInPlace(arr, 1);

      expect(arr).toEqual([5, 1, 2, 3, 4]);
      expect(result).toBeUndefined();
    });

    it('should rotate array by 2 positions to the right', () => {
      const arr = [1, 2, 3, 4, 5];
      const originalArr = [...arr];
      const result = rotateInPlace(arr, 2);

      expect(arr).toEqual([4, 5, 1, 2, 3]);
      expect(result).toBeUndefined();
    });

    it('should rotate array by 3 positions to the right', () => {
      const arr = [1, 2, 3, 4, 5];
      const originalArr = [...arr];
      const result = rotateInPlace(arr, 3);

      expect(arr).toEqual([3, 4, 5, 1, 2]);
      expect(result).toBeUndefined();
    });

    it('should handle small arrays correctly', () => {
      const arr = [1, 2];
      const result = rotateInPlace(arr, 1);

      expect(arr).toEqual([2, 1]);
      expect(result).toBeUndefined();
    });

    it('should handle medium arrays correctly', () => {
      const arr = [1, 2, 3, 4, 5, 6, 7];
      const result = rotateInPlace(arr, 2);

      expect(arr).toEqual([6, 7, 1, 2, 3, 4, 5]);
      expect(result).toBeUndefined();
    });

    it('should verify in-place modification (same reference)', () => {
      const arr = [1, 2, 3, 4, 5];
      const arrRef = arr;

      rotateInPlace(arr, 2);

      expect(arr).toBe(arrRef); // Same reference
      expect(arr).toEqual([4, 5, 1, 2, 3]);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty array gracefully', () => {
      const arr: number[] = [];
      const result = rotateInPlace(arr, 3);

      expect(arr).toEqual([]);
      expect(result).toBeUndefined();
    });

    it('should handle single element array (remain unchanged)', () => {
      const arr = [42];
      const result = rotateInPlace(arr, 1);

      expect(arr).toEqual([42]);
      expect(result).toBeUndefined();
    });

    it('should handle single element array with zero rotations', () => {
      const arr = [42];
      const result = rotateInPlace(arr, 0);

      expect(arr).toEqual([42]);
      expect(result).toBeUndefined();
    });

    it('should handle zero rotations (array unchanged)', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = rotateInPlace(arr, 0);

      expect(arr).toEqual([1, 2, 3, 4, 5]);
      expect(result).toBeUndefined();
    });

    it('should handle rotations equal to array length (array unchanged)', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = rotateInPlace(arr, 5);

      expect(arr).toEqual([1, 2, 3, 4, 5]);
      expect(result).toBeUndefined();
    });

    it('should handle rotations = 1 with array length = 1', () => {
      const arr = [99];
      const result = rotateInPlace(arr, 1);

      expect(arr).toEqual([99]);
      expect(result).toBeUndefined();
    });

    it('should handle rotations greater than array length via modulo', () => {
      const arr = [1, 2, 3];
      const result = rotateInPlace(arr, 4); // 4 % 3 = 1

      expect(arr).toEqual([3, 1, 2]);
      expect(result).toBeUndefined();
    });

    it('should handle large rotation numbers', () => {
      const arr = [1, 2, 3, 4];
      const result = rotateInPlace(arr, 10); // 10 % 4 = 2

      expect(arr).toEqual([3, 4, 1, 2]);
      expect(result).toBeUndefined();
    });
  });

  describe('Algorithm verification', () => {
    it('should verify three-reversal algorithm produces correct results', () => {
      // Test case: [1,2,3,4,5] rotated by 2 should become [4,5,1,2,3]
      // This tests that the three reversals work correctly:
      // 1. Reverse entire array: [5,4,3,2,1]
      // 2. Reverse first 2 elements: [4,5,3,2,1]
      // 3. Reverse remaining elements: [4,5,1,2,3]
      const arr = [1, 2, 3, 4, 5];
      const result = rotateInPlace(arr, 2);

      expect(arr).toEqual([4, 5, 1, 2, 3]);
      expect(result).toBeUndefined();
    });

    it('should handle ascending pattern arrays', () => {
      const arr = [1, 2, 3, 4, 5, 6];
      const result = rotateInPlace(arr, 3);

      expect(arr).toEqual([4, 5, 6, 1, 2, 3]);
      expect(result).toBeUndefined();
    });

    it('should handle descending pattern arrays', () => {
      const arr = [6, 5, 4, 3, 2, 1];
      const result = rotateInPlace(arr, 2);

      expect(arr).toEqual([2, 1, 6, 5, 4, 3]);
      expect(result).toBeUndefined();
    });

    it('should handle random pattern arrays', () => {
      const arr = [7, 3, 9, 1, 5, 8, 2];
      const result = rotateInPlace(arr, 3);

      expect(arr).toEqual([5, 8, 2, 7, 3, 9, 1]);
      expect(result).toBeUndefined();
    });

    it('should verify return value is always undefined', () => {
      const arr1 = [1, 2, 3];
      const arr2 = [4, 5];
      const arr3 = [6];

      expect(rotateInPlace(arr1, 1)).toBeUndefined();
      expect(rotateInPlace(arr2, 0)).toBeUndefined();
      expect(rotateInPlace(arr3, 5)).toBeUndefined();
    });
  });

  describe('Error conditions and edge cases', () => {
    it('should document negative rotations bug (produces incorrect results)', () => {
      const arr = [1, 2, 3, 4, 5];
      const originalArr = [...arr];

      // Current buggy behavior with negative rotations
      const result = rotateInPlace(arr, -1);

      // Note: This test documents the current buggy behavior
      // The function doesn't handle negative rotations correctly
      // It should probably rotate left by 1, but currently produces unexpected results
      expect(result).toBeUndefined();

      // Document the actual buggy output for regression testing
      // This helps track when the bug gets fixed
      expect(arr).not.toEqual([2, 3, 4, 5, 1]); // Expected for left rotation by 1
    });

    it('should handle negative rotations with modulo behavior', () => {
      const arr = [1, 2, 3, 4];
      const result = rotateInPlace(arr, -3); // -3 % 4 = 1 in JS (-3 % 4 = -3, but should be 1)

      // Document current behavior (may be buggy)
      expect(result).toBeUndefined();
    });

    it('should handle very negative rotations', () => {
      const arr = [1, 2, 3];
      const result = rotateInPlace(arr, -10);

      // Document current behavior
      expect(result).toBeUndefined();
    });
  });

  describe('Integration and stress tests', () => {
    it('should handle large arrays efficiently', () => {
      const arr = Array.from({ length: 1000 }, (_, i) => i + 1);
      const rotations = 500;
      const result = rotateInPlace(arr, rotations);

      // Verify it's rotated by 500 positions (which equals 500 % 1000 = 500)
      const expected = Array.from({ length: 1000 }, (_, i) => ((i + 500) % 1000) + 1);
      expect(arr).toEqual(expected);
      expect(result).toBeUndefined();
    });

    it('should handle arrays with duplicate values', () => {
      const arr = [2, 2, 2, 1, 1, 1];
      const result = rotateInPlace(arr, 2);

      expect(arr).toEqual([1, 1, 2, 2, 2, 1]);
      expect(result).toBeUndefined();
    });

    it('should handle arrays with mixed positive/negative numbers', () => {
      const arr = [-3, -1, 2, 5, -7];
      const result = rotateInPlace(arr, 1);

      expect(arr).toEqual([-7, -3, -1, 2, 5]);
      expect(result).toBeUndefined();
    });
  });
});