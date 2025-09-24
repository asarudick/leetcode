import { threeSumSortedArray } from '../src/threeSumSortedArray';
import { describe, it, expect } from 'vitest';

describe('threeSumSortedArray', () => {
  describe('Basic functionality with valid inputs', () => {
    it('should find triplets that sum to zero', () => {
      const nums = [-4, -1, -1, 0, 1, 2]; // Sorted
      const expected = [
        [-1, -1, 2],
        [-1, 0, 1]
      ];
      const result = threeSumSortedArray(nums);
      expect(result).toEqual(expect.arrayContaining(expected));
      expect(result.length).toBe(expected.length);
    });

    it('should find multiple triplets in larger array', () => {
      const nums = [-2, -1, 0, 0, 1, 2];
      const expected = [
        [-2, 0, 2],
        [-1, 0, 1]
      ];
      const result = threeSumSortedArray(nums);
      expect(result).toEqual(expect.arrayContaining(expected));
      expect(result.length).toBe(expected.length);
    });

    it('should handle array with all positive numbers that sum to zero', () => {
      const nums = [1, 2, 3, 4, 5, 6];
      const result = threeSumSortedArray(nums);
      expect(result).toEqual([]);
    });
  });

  describe('Edge cases', () => {
    it('should return empty array for null or undefined input', () => {
      expect(threeSumSortedArray(null as any)).toEqual([]);
      expect(threeSumSortedArray(undefined as any)).toEqual([]);
    });

    it('should return empty array for empty array', () => {
      const nums: number[] = [];
      expect(threeSumSortedArray(nums)).toEqual([]);
    });

    it('should return empty array for single element', () => {
      const nums = [5];
      expect(threeSumSortedArray(nums)).toEqual([]);
    });

    it('should return empty array for two elements', () => {
      const nums = [1, 2];
      expect(threeSumSortedArray(nums)).toEqual([]);
    });

    it('should handle array with all zeros', () => {
      const nums = [0, 0, 0, 0];
      const expected = [[0, 0, 0]];
      const result = threeSumSortedArray(nums);
      expect(result).toEqual(expected);
    });

    it('should handle array with all negative numbers', () => {
      const nums = [-3, -2, -1];
      const result = threeSumSortedArray(nums);
      expect(result).toEqual([]);
    });

    it('should handle array with all positive numbers', () => {
      const nums = [1, 2, 3, 4, 5];
      const result = threeSumSortedArray(nums);
      expect(result).toEqual([]);
    });
  });

  describe('Duplicate handling', () => {
    it('should skip duplicate triplets', () => {
      const nums = [-1, -1, 0, 0, 0, 1, 1]; // Sorted
      const expected = [
        [-1, 0, 1],
        [0, 0, 0]
      ];
      const result = threeSumSortedArray(nums);
      expect(result).toEqual(expected);
    });

    it('should handle multiple identical triplets', () => {
      const nums = [-2, 0, 0, 2, 2];
      const expected = [
        [-2, 0, 2]
      ];
      const result = threeSumSortedArray(nums);
      expect(result).toEqual(expected);
    });

    it('should handle consecutive duplicates at beginning', () => {
      const nums = [-1, 0, 0, 0, 1, 1]; // Sorted
      const result = threeSumSortedArray(nums);
      expect(result).toContainEqual([-1, 0, 1]);
    });
  });

  describe('Large inputs', () => {
    it('should handle large arrays efficiently', () => {
      const nums = Array.from({ length: 1000 }, (_, i) => i - 500);
      const result = threeSumSortedArray(nums);
      // Should find triplets like [-500, 0, 500], [-499, -1, 500], etc.
      expect(result.length).toBeGreaterThan(0);
      // Verify all triplets sum to zero
      result.forEach(triplet => {
        expect(triplet[0] + triplet[1] + triplet[2]).toBe(0);
      });
    });

    it('should handle large positive numbers', () => {
      const nums = [1000000, 2000000, 3000000, -1000000, -2000000, -3000000];
      const expected = [
        [-3000000, 1000000, 2000000],
        [-2000000, -1000000, 3000000],
        [-3000000, -2000000, 5000000] // This won't be found since 5000000 is not in array
      ];
      const result = threeSumSortedArray(nums);
      expect(result.length).toBeGreaterThan(0);
      result.forEach(triplet => {
        expect(triplet[0] + triplet[1] + triplet[2]).toBe(0);
      });
    });
  });

  describe('Complex scenarios', () => {
    it('should handle mixed positive and negative numbers', () => {
      const nums = [-4, -2, -1, 0, 1, 2, 3, 4];
      const expected = [
        [-4, 1, 3],
        [-2, -1, 3],
        [-2, 0, 2],
        [-1, 0, 1]
      ];
      const result = threeSumSortedArray(nums);
      expect(result).toEqual(expect.arrayContaining(expected));
    });

    it('should handle array with minimum and maximum values', () => {
      const nums = [Number.MIN_SAFE_INTEGER, -1, 0, 1, Number.MAX_SAFE_INTEGER];
      const result = threeSumSortedArray(nums);
      // Should find [-1, 0, 1] triplet
      expect(result).toContainEqual([-1, 0, 1]);
    });

    it('should handle unsorted input correctly', () => {
      const nums = [3, 1, -1, 0, 2, -2]; // Not sorted
      const result = threeSumSortedArray(nums);
      // Results may vary since input is not sorted, but should still work
      result.forEach(triplet => {
        expect(triplet[0] + triplet[1] + triplet[2]).toBe(0);
      });
    });
  });

  describe('Performance considerations', () => {
    it('should handle moderately large arrays without timeout', () => {
      const nums = Array.from({ length: 300 }, (_, i) => i - 150);
      const startTime = Date.now();
      const result = threeSumSortedArray(nums);
      const endTime = Date.now();
      expect(endTime - startTime).toBeLessThan(5000); // Should complete in under 5 seconds
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle sparse arrays efficiently', () => {
      const nums = [-1000, 0, 0, 0, 1000];
      const result = threeSumSortedArray(nums);
      expect(result).toContainEqual([-1000, 0, 1000]);
    });
  });

  describe('Invalid inputs', () => {
    it('should handle array with non-number values', () => {
      const nums = [1, 2, '3' as any, 4];
      // This may throw or handle gracefully depending on implementation
      expect(() => threeSumSortedArray(nums)).not.toThrow();
    });

    it('should handle very large arrays that might cause memory issues', () => {
      const nums = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 100) - 50);
      expect(() => threeSumSortedArray(nums)).not.toThrow();
    });
  });
});
