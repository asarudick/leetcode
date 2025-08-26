import { combinationSum } from '../src/combinationSum';
import { describe, it, expect } from 'vitest';

function sortCombinations(combinations: number[][]): number[][] {
  return combinations.map(comb => comb.slice().sort((a, b) => a - b))
    .sort((a, b) => {
      if (a.length !== b.length) return a.length - b.length;
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return a[i] - b[i];
      }
      return 0;
    });
}

describe('combinationSum', () => {
  it('should return combinations that sum to target - Example 1', () => {
    const candidates = [2, 3, 6, 7];
    const target = 7;
    const result = combinationSum(candidates, target);
    const sortedResult = sortCombinations(result);
    
    const expected = [[2, 2, 3], [7]];
    const sortedExpected = sortCombinations(expected);
    
    expect(sortedResult).toEqual(sortedExpected);
  });

  it('should return combinations that sum to target - Example 2', () => {
    const candidates = [2, 3, 5];
    const target = 8;
    const result = combinationSum(candidates, target);
    const sortedResult = sortCombinations(result);
    
    const expected = [[2, 2, 2, 2], [2, 3, 3], [3, 5]];
    const sortedExpected = sortCombinations(expected);
    
    expect(sortedResult).toEqual(sortedExpected);
  });

  it('should return empty array when no combination sums to target - Example 3', () => {
    const candidates = [2];
    const target = 1;
    const result = combinationSum(candidates, target);
    expect(result).toEqual([]);
  });

  it('should handle candidates with one element that equals target', () => {
    const candidates = [5];
    const target = 5;
    const result = combinationSum(candidates, target);
    const sortedResult = sortCombinations(result);
    
    const expected = [[5]];
    const sortedExpected = sortCombinations(expected);
    
    expect(sortedResult).toEqual(sortedExpected);
  });

  it('should handle multiple uses of the same candidate', () => {
    const candidates = [2, 3];
    const target = 6;
    const result = combinationSum(candidates, target);
    const sortedResult = sortCombinations(result);
    
    const expected = [[2, 2, 2], [3, 3]];
    const sortedExpected = sortCombinations(expected);
    
    expect(sortedResult).toEqual(sortedExpected);
  });

  it('should handle candidates with larger values than target', () => {
    const candidates = [5, 10, 15];
    const target = 4;
    const result = combinationSum(candidates, target);
    expect(result).toEqual([]);
  });

  it('should handle multiple valid combinations with different lengths', () => {
    const candidates = [2, 3, 5];
    const target = 7;
    const result = combinationSum(candidates, target);
    const sortedResult = sortCombinations(result);
    
    const expected = [[2, 2, 3], [2, 5]];
    const sortedExpected = sortCombinations(expected);
    
    expect(sortedResult).toEqual(sortedExpected);
  });

  it('should handle empty candidates array', () => {
    const candidates: number[] = [];
    const target = 5;
    const result = combinationSum(candidates, target);
    expect(result).toEqual([]);
  });

  it('should handle target of 0', () => {
    const candidates = [1, 2, 3];
    const target = 0;
    const result = combinationSum(candidates, target);
    // According to the problem, target >= 1, but let's handle this edge case
    expect(result).toEqual([]);
  });
});