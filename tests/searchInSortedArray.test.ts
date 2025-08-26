import { searchInSortedArray } from '../src/searchInSortedArray';
import { describe, it, expect } from 'vitest';

describe('searchInSortedArray', () => {
  it('should find target in a rotated sorted array', () => {
    expect(searchInSortedArray([4, 5, 6, 7, 0, 1, 2], 0)).toBe(4);
    expect(searchInSortedArray([4, 5, 6, 7, 0, 1, 2], 4)).toBe(0);
    expect(searchInSortedArray([4, 5, 6, 7, 0, 1, 2], 2)).toBe(6);
  });

  it('should return -1 when target is not in the array', () => {
    expect(searchInSortedArray([4, 5, 6, 7, 0, 1, 2], 3)).toBe(-1);
    expect(searchInSortedArray([1], 0)).toBe(-1);
  });

  it('should handle a non-rotated sorted array', () => {
    expect(searchInSortedArray([0, 1, 2, 3, 4, 5, 6, 7], 3)).toBe(3);
    expect(searchInSortedArray([0, 1, 2, 3, 4, 5, 6, 7], 0)).toBe(0);
    expect(searchInSortedArray([0, 1, 2, 3, 4, 5, 6, 7], 7)).toBe(7);
  });

  it('should handle a rotated array with two elements', () => {
    expect(searchInSortedArray([1, 3], 3)).toBe(1);
    expect(searchInSortedArray([3, 1], 1)).toBe(1);
    expect(searchInSortedArray([3, 1], 3)).toBe(0);
    expect(searchInSortedArray([3, 1], 0)).toBe(-1);
  });

  it('should handle a single element array', () => {
    expect(searchInSortedArray([1], 1)).toBe(0);
    expect(searchInSortedArray([1], 2)).toBe(-1);
  });

  it('should handle arrays with negative numbers', () => {
    expect(searchInSortedArray([4, 5, 6, 7, -1, 0, 1, 2], -1)).toBe(4);
    expect(searchInSortedArray([-1, 0, 1, 2, 4, 5, 6, 7], -1)).toBe(0);
    expect(searchInSortedArray([4, 5, 6, 7, -1, 0, 1, 2], 2)).toBe(7);
  });

  it('should handle arrays with larger values', () => {
    expect(searchInSortedArray([10, 11, 12, 13, 14, 15, 16, 1, 2, 3, 4], 1)).toBe(7);
    expect(searchInSortedArray([10, 11, 12, 13, 14, 15, 16, 1, 2, 3, 4], 16)).toBe(6);
  });

  it('should handle arrays rotated at different points', () => {
    // Rotated at k=1
    expect(searchInSortedArray([2, 3, 4, 5, 6, 7, 0, 1], 0)).toBe(6);
    // Rotated at k=2
    expect(searchInSortedArray([3, 4, 5, 6, 7, 0, 1, 2], 5)).toBe(2);
    // Rotated at k=3
    expect(searchInSortedArray([4, 5, 6, 7, 0, 1, 2, 3], 7)).toBe(3);
  });

  it('should return -1 for empty array', () => {
    expect(searchInSortedArray([], 5)).toBe(-1);
  });
});