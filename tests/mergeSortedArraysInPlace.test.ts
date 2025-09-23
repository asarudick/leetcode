import { mergeSortedArraysInPlace } from '../src/mergeSortedArraysInPlace';
import { describe, it, expect } from 'vitest';

describe('mergeSortedArraysInPlace', () => {
  it('should merge two sorted arrays with different lengths', () => {
    const nums1 = [1, 2, 3, 0, 0, 0];
    const nums2 = [2, 5, 6];
    const result = mergeSortedArraysInPlace(nums1, 3, nums2, 3);
    expect(result).toEqual([1, 2, 2, 3, 5, 6]);
  });

  it('should merge when first array is empty', () => {
    const nums1 = [0, 0, 0];
    const nums2 = [1, 2, 3];
    const result = mergeSortedArraysInPlace(nums1, 0, nums2, 3);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should merge when second array is empty', () => {
    const nums1 = [1, 2, 3];
    const nums2: number[] = [];
    const result = mergeSortedArraysInPlace(nums1, 3, nums2, 0);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should merge single element arrays', () => {
    const nums1 = [1, 0];
    const nums2 = [2];
    const result = mergeSortedArraysInPlace(nums1, 1, nums2, 1);
    expect(result).toEqual([1, 2]);
  });

  it('should merge when first array has one element and second has multiple', () => {
    const nums1 = [1, 0, 0, 0];
    const nums2 = [2, 3, 4];
    const result = mergeSortedArraysInPlace(nums1, 1, nums2, 3);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('should merge when second array has one element and first has multiple', () => {
    const nums1 = [1, 2, 3, 0];
    const nums2 = [4];
    const result = mergeSortedArraysInPlace(nums1, 3, nums2, 1);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('should merge already sorted arrays', () => {
    const nums1 = [1, 3, 5, 0, 0, 0];
    const nums2 = [2, 4, 6];
    const result = mergeSortedArraysInPlace(nums1, 3, nums2, 3);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should merge arrays with duplicate values', () => {
    const nums1 = [1, 2, 2, 0, 0, 0];
    const nums2 = [2, 3, 3];
    const result = mergeSortedArraysInPlace(nums1, 3, nums2, 3);
    expect(result).toEqual([1, 2, 2, 2, 3, 3]);
  });

  it('should merge arrays with all duplicate values', () => {
    const nums1 = [2, 2, 2, 0, 0, 0];
    const nums2 = [2, 2, 2];
    const result = mergeSortedArraysInPlace(nums1, 3, nums2, 3);
    expect(result).toEqual([2, 2, 2, 2, 2, 2]);
  });

  it('should merge arrays with negative numbers', () => {
    const nums1 = [-3, -1, 0, 0, 0];
    const nums2 = [-4, -2, 1];
    const result = mergeSortedArraysInPlace(nums1, 3, nums2, 3);
    expect(result).toEqual([-4, -3, -2, -1, 0, 1]);
  });

  it('should merge arrays with mixed positive and negative numbers', () => {
    const nums1 = [-2, 0, 3, 0, 0, 0];
    const nums2 = [-3, 1, 4];
    const result = mergeSortedArraysInPlace(nums1, 3, nums2, 3);
    expect(result).toEqual([-3, -2, 0, 1, 3, 4]);
  });

  it('should merge when nums1 has more space than needed', () => {
    const nums1 = [1, 3, 5, 0, 0, 0, 0, 0];
    const nums2 = [2, 4];
    const result = mergeSortedArraysInPlace(nums1, 3, nums2, 2);
    expect(result).toEqual([1, 2, 3, 4, 5, 0, 0, 0]);
  });

  it('should merge when nums2 is longer than nums1', () => {
    const nums1 = [1, 0, 0, 0, 0, 0, 0];
    const nums2 = [2, 3, 4, 5, 6, 7];
    const result = mergeSortedArraysInPlace(nums1, 1, nums2, 6);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('should test in-place modification behavior - original arrays are modified', () => {
    const originalNums1 = [1, 3, 5, 0, 0, 0];
    const originalNums2 = [2, 4, 6];

    const nums1Copy = [...originalNums1];
    const nums2Copy = [...originalNums2];

    const result = mergeSortedArraysInPlace(originalNums1, 3, originalNums2, 3);

    // nums1 should be modified in-place
    expect(originalNums1).toEqual([1, 2, 3, 4, 5, 6]);
    expect(originalNums1).toBe(result);

    // nums2 should remain unchanged
    expect(originalNums2).toEqual(nums2Copy);
  });

  it('should handle minimum possible arrays', () => {
    const nums1 = [0];
    const nums2 = [1];
    const result = mergeSortedArraysInPlace(nums1, 0, nums2, 1);
    expect(result).toEqual([1]);
  });

  it('should handle maximum constraint scenario', () => {
    // Test with maximum possible lengths based on typical constraints
    const size = 500; // Using reasonable size for tests
    const nums1 = Array(size * 2).fill(0);
    const nums2 = Array(size).fill(0);

    for (let i = 0; i < size; i++) {
      nums1[i] = i;
      nums2[i] = i + size;
    }

    const result = mergeSortedArraysInPlace(nums1, size, nums2, size);

    // Verify sorted order
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i]).toBeLessThanOrEqual(result[i + 1]);
    }

    // Verify all original elements are present
    expect(result.slice(0, size * 2)).toEqual(
      Array.from({ length: size * 2 }, (_, i) => i)
    );
  });
});
