import { findMinRotatedSortedArray } from '../src/findMinRotatedSortedArray';
import { describe, it, expect } from 'vitest';

describe('findMinRotatedSortedArray', () => {
  it('should handle empty array', () => {
    expect(findMinRotatedSortedArray([])).toBe(-1);
  });

  it('should find minimum in a sorted array that is not rotated', () => {
    expect(findMinRotatedSortedArray([1, 2, 3, 4, 5])).toBe(1);
  });

  it('should find minimum in a rotated sorted array', () => {
    expect(findMinRotatedSortedArray([3, 4, 5, 1, 2])).toBe(1);
  });

  it('should find minimum when minimum is at the beginning', () => {
    expect(findMinRotatedSortedArray([1, 2, 3, 4, 5])).toBe(1);
  });

  it('should find minimum when minimum is at the beginning + 1', () => {
    expect(findMinRotatedSortedArray([5, 1, 2, 3, 4])).toBe(1);
  });

  it('should find minimum in a rotated sorted array with two elements', () => {
    expect(findMinRotatedSortedArray([2, 1])).toBe(1);
  });

  it('should find minimum in a non-rotated array with two elements', () => {
    expect(findMinRotatedSortedArray([1, 2])).toBe(1);
  });

  it('should find minimum in an array with one element', () => {
    expect(findMinRotatedSortedArray([1])).toBe(1);
  });

  it('should find minimum in a rotated sorted array with negative numbers', () => {
    expect(findMinRotatedSortedArray([4, 5, 6, -1, 0, 1, 2])).toBe(-1);
  });

  it('should find minimum in a rotated sorted array with larger values', () => {
    expect(findMinRotatedSortedArray([10, 11, 12, 13, 14, 15, 16, 17, 1, 2, 3])).toBe(1);
  });
});
