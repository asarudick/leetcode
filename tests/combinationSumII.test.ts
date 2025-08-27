import { combinationSumII } from '../src/combinationSumII';
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

describe('combinationSumII', () => {
  it('should return unique combinations that sum to target - Example 1', () => {
    const candidates = [10, 1, 2, 7, 6, 1, 5];
    const target = 8;
    const result = combinationSumII(candidates, target);
    const sortedResult = sortCombinations(result);
    
    const expected = [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]];
    const sortedExpected = sortCombinations(expected);
    
    expect(sortedResult).toEqual(sortedExpected);
  });

  it('should return unique combinations that sum to target - Example 2', () => {
    const candidates = [2, 5, 2, 1, 2];
    const target = 5;
    const result = combinationSumII(candidates, target);
    const sortedResult = sortCombinations(result);
    
    const expected = [[1, 2, 2], [5]];
    const sortedExpected = sortCombinations(expected);
    
    expect(sortedResult).toEqual(sortedExpected);
  });

  it('should handle empty candidates array', () => {
    const candidates: number[] = [];
    const target = 5;
    const result = combinationSumII(candidates, target);
    expect(result).toEqual([]);
  });

  it('should handle target larger than sum of all candidates', () => {
    const candidates = [1, 2, 3];
    const target = 10;
    const result = combinationSumII(candidates, target);
    expect(result).toEqual([]);
  });

  it('should handle target equal to single candidate', () => {
    const candidates = [1, 2, 3, 4, 5];
    const target = 3;
    const result = combinationSumII(candidates, target);
    const sortedResult = sortCombinations(result);
    
    const expected = [[1,2], [3]];
    const sortedExpected = sortCombinations(expected);
    
    expect(sortedResult).toEqual(sortedExpected);
  });

  it('should handle candidates with duplicates but no valid combination', () => {
    const candidates = [2, 2, 2, 2];
    const target = 3;
    const result = combinationSumII(candidates, target);
    expect(result).toEqual([]);
  });

  it('should handle multiple valid combinations with duplicates', () => {
    const candidates = [1, 1, 2, 5, 6, 7, 10];
    const target = 8;
    const result = combinationSumII(candidates, target);
    const sortedResult = sortCombinations(result);
    
    const expected = [[1, 1, 6], [1,2,5], [1, 7], [2, 6]];
    const sortedExpected = sortCombinations(expected);
    
    expect(sortedResult).toEqual(sortedExpected);
  });

  it('should handle target of 1 with candidates containing 1', () => {
    const candidates = [1, 2, 3];
    const target = 1;
    const result = combinationSumII(candidates, target);
    const sortedResult = sortCombinations(result);
    
    const expected = [[1]];
    const sortedExpected = sortCombinations(expected);
    
    expect(sortedResult).toEqual(sortedExpected);
  });

  it('should handle target of 0', () => {
    const candidates = [1, 2, 3];
    const target = 0;
    const result = combinationSumII(candidates, target);
    expect(result).toEqual([]);
  });

  it('should handle candidates with all elements the same and valid combination', () => {
    const candidates = [2, 2, 2, 2];
    const target = 4;
    const result = combinationSumII(candidates, target);
    const sortedResult = sortCombinations(result);
    
    const expected = [[2, 2]];
    const sortedExpected = sortCombinations(expected);
    
    expect(sortedResult).toEqual(sortedExpected);
  });
});