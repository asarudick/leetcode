import { twoSum as twoSumII } from '../src/twoSumII';
import { describe, it, expect } from 'vitest';

describe('twoSumII', () => {
  it('should find indices for basic case', () => {
    const numbers = [2, 7, 11, 15];
    const target = 9;
    const expected = [0, 1];
    expect(twoSumII(numbers, target)).toEqual(expected);
  });

  it('should find indices for target at the end of array', () => {
    const numbers = [1, 2, 3, 4];
    const target = 7;
    const expected = [2, 3];
    expect(twoSumII(numbers, target)).toEqual(expected);
  });

  it('should find indices for target at the beginning of array', () => {
    const numbers = [1, 2, 3, 4];
    const target = 3;
    const expected = [0, 1];
    expect(twoSumII(numbers, target)).toEqual(expected);
  });

  it('should find indices for larger numbers', () => {
    const numbers = [3, 24, 50, 79, 88, 150];
    const target = 200;
    const expected = [2, 5];
    expect(twoSumII(numbers, target)).toEqual(expected);
  });

  it('should find indices for negative numbers', () => {
    const numbers = [-5, -3, 0, 4, 7];
    const target = -3;
    const expected = [1, 2];
    expect(twoSumII(numbers, target)).toEqual(expected);
  });

  it('should find indices for zero target', () => {
    const numbers = [-5, -3, 0, 2, 7];
    const target = 2;
    const expected = [0, 4];
    expect(twoSumII(numbers, target)).toEqual(expected);
  });

  it('should handle array with two elements', () => {
    const numbers = [1, 2];
    const target = 3;
    const expected = [0, 1];
    expect(twoSumII(numbers, target)).toEqual(expected);
  });

  it('should handle array with duplicate elements', () => {
    const numbers = [-1, 2, 2, 3, 4];
    const target = 4;
    const expected = [1, 2];
    expect(twoSumII(numbers, target)).toEqual(expected);
  });

  it('should handle array with all positive numbers', () => {
    const numbers = [1, 3, 5, 7, 9];
    const target = 12;
    const expected = [1, 4];
    expect(twoSumII(numbers, target)).toEqual(expected);
  });

  it('should handle array with all negative numbers', () => {
    const numbers = [-9, -7, -5, -3, -1];
    const target = -12;
    const expected = [0, 3];
    expect(twoSumII(numbers, target)).toEqual(expected);
  });
});
