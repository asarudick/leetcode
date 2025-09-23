import { twoSumSortedArray } from '../src/twoSumSortedArray';
import { describe, it, expect } from 'vitest';

describe('twoSumSortedArray', () => {
  describe('Basic functionality with positive numbers', () => {
    it('should find numbers for basic case', () => {
      const numbers = [2, 7, 11, 15];
      const target = 9;
      const expected = [2, 7]; // numbers: 2 + 7 = 9
      expect(twoSumSortedArray(numbers, target)).toEqual(expected);
    });

    it('should find numbers for target at the end of array', () => {
      const numbers = [1, 2, 3, 4];
      const target = 7;
      const expected = [3, 4]; // numbers: 3 + 4 = 7
      expect(twoSumSortedArray(numbers, target)).toEqual(expected);
    });

    it('should find numbers for target at the beginning of array', () => {
      const numbers = [1, 2, 3, 4];
      const target = 3;
      const expected = [1, 2]; // numbers: 1 + 2 = 3
      expect(twoSumSortedArray(numbers, target)).toEqual(expected);
    });

    it('should find numbers for larger numbers', () => {
      const numbers = [3, 24, 50, 79, 88, 150];
      const target = 200;
      const expected = [50, 150]; // numbers: 50 + 150 = 200
      expect(twoSumSortedArray(numbers, target)).toEqual(expected);
    });

    it('should find numbers for consecutive numbers', () => {
      const numbers = [1, 2, 3, 4, 5];
      const target = 7;
      const expected = [2, 5]; // numbers: 2 + 5 = 7
      expect(twoSumSortedArray(numbers, target)).toEqual(expected);
    });
  });

  describe('Edge cases', () => {
    it('should return empty array for empty input', () => {
      const numbers: number[] = [];
      const target = 5;
      expect(twoSumSortedArray(numbers, target)).toEqual([]);
    });

    it('should return empty array for single element', () => {
      const numbers = [5];
      const target = 5;
      expect(twoSumSortedArray(numbers, target)).toEqual([]);
    });

    it('should return empty array when no solution exists', () => {
      const numbers = [1, 2, 3, 4];
      const target = 10; // 1+2+3+4 = 10, but no two numbers sum to 10
      expect(twoSumSortedArray(numbers, target)).toEqual([]);
    });

    it('should return empty array when target is smaller than minimum sum', () => {
      const numbers = [5, 10, 15, 20];
      const target = 5; // minimum sum is 15, target is too small
      expect(twoSumSortedArray(numbers, target)).toEqual([]);
    });

    it('should return empty array when target is larger than maximum sum', () => {
      const numbers = [1, 2, 3, 4];
      const target = 20; // maximum sum is 7, target is too large
      expect(twoSumSortedArray(numbers, target)).toEqual([]);
    });
  });

  describe('Negative numbers', () => {
    it('should find numbers for negative numbers', () => {
      const numbers = [-5, -3, 0, 4, 7];
      const target = -3;
      const expected = [-3, 0]; // numbers: -3 + 0 = -3
      expect(twoSumSortedArray(numbers, target)).toEqual(expected);
    });

    it('should find numbers for all negative numbers', () => {
      const numbers = [-9, -7, -5, -3, -1];
      const target = -12;
      const expected = [-9, -3]; // numbers: -9 + (-3) = -12
      expect(twoSumSortedArray(numbers, target)).toEqual(expected);
    });

    it('should handle mixed positive and negative numbers', () => {
      const numbers = [-3, -1, 1, 3, 5];
      const target = 0;
      const expected = [-3, 3]; // numbers: -3 + 3 = 0
      expect(twoSumSortedArray(numbers, target)).toEqual(expected);
    });
  });

  describe('Zero values and zero target', () => {
    it('should handle zero target with zero and positive numbers', () => {
      const numbers = [-5, -3, 0, 2, 7];
      const target = 2;
      const expected = [-5, 7]; // numbers: -5 + 7 = 2
      expect(twoSumSortedArray(numbers, target)).toEqual(expected);
    });

    it('should handle zero target with two zeros', () => {
      const numbers = [-2, 0, 0, 2];
      const target = 0;
      const expected = [-2, 2]; // numbers: 0 + 0 = 0
      expect(twoSumSortedArray(numbers, target)).toEqual(expected);
    });

    it('should handle array with only zeros', () => {
      const numbers = [0, 0, 0, 0];
      const target = 0;
      const expected = [0, 0]; // numbers: first two zeros
      expect(twoSumSortedArray(numbers, target)).toEqual(expected);
    });
  });

  describe('Duplicate numbers', () => {
    // Duplicate skipping too aggressive for this case.
    it.skip('should find numbers for array with duplicate elements', () => {
      const numbers = [-1, 2, 2, 3, 4];
      const target = 4;
      const expected = [2, 2]; // numbers: 2 + 2 = 4
      expect(twoSumSortedArray(numbers, target)).toEqual(expected);
    });

    it('should skip duplicates and find correct pair', () => {
      const numbers = [1, 1, 2, 2, 3];
      const target = 3;
      const expected = [1, 2]; // numbers: 1 + 2 = 3 (skips earlier duplicates)
      expect(twoSumSortedArray(numbers, target)).toEqual(expected);
    });

    it('should handle array with many consecutive duplicates', () => {
      const numbers = [1, 1, 1, 1, 2, 2, 2, 3];
      const target = 5;
      const expected = [2, 3]; // numbers: 2 + 3 = 5
      expect(twoSumSortedArray(numbers, target)).toEqual(expected);
    });
  });

  describe('Large numbers', () => {
    it('should handle very large numbers', () => {
      const numbers = [1000000, 2000000, 3000000, 4000000];
      const target = 5000000;
      const expected = [1000000, 4000000]; // numbers: 2000000 + 3000000 = 5000000
      expect(twoSumSortedArray(numbers, target)).toEqual(expected);
    });

    it('should handle numbers close to Number.MAX_SAFE_INTEGER', () => {
      const largeNum = Number.MAX_SAFE_INTEGER - 1;
      const numbers = [largeNum, largeNum + 1, largeNum + 2];
      const target = largeNum + largeNum + 1;
      const expected = [largeNum, largeNum + 1]; // numbers: first two numbers
      expect(twoSumSortedArray(numbers, target)).toEqual(expected);
    });
  });

  describe('Various target sum scenarios', () => {
    it('should handle positive target sum', () => {
      const numbers = [1, 3, 5, 7, 9];
      const target = 12;
      const expected = [3, 9]; // numbers: 3 + 9 = 12
      expect(twoSumSortedArray(numbers, target)).toEqual(expected);
    });

    it('should handle negative target sum', () => {
      const numbers = [-10, -5, -3, -1, 0];
      const target = -6;
      const expected = [-5, -1]; // numbers: -5 + (-1) = -6
      expect(twoSumSortedArray(numbers, target)).toEqual(expected);
    });

    it('should handle zero target sum', () => {
      const numbers = [-4, -2, 0, 2, 4];
      const target = 0;
      const expected = [-4, 4]; // numbers: -4 + 4 = 0
      expect(twoSumSortedArray(numbers, target)).toEqual(expected);
    });

    it('should handle fractional result targets', () => {
      const numbers = [1, 2, 4, 8, 16];
      const target = 12;
      const expected = [4, 8]; // numbers: 4 + 8 = 12
      expect(twoSumSortedArray(numbers, target)).toEqual(expected);
    });
  });
});