import twoSum from '../src/twoSum';
import { describe, it, expect } from 'vitest';

describe('twoSum', () => {
  it('should pass', () => {
    const target = 9;
    const nums = [2, 7, 11, 15];
    const expected = [0,1]
    expect(twoSum(nums, target)).toEqual(expected);
  });
});
describe('twoSum', () => {
  it('should pass', () => {
    const target = 4;
    const nums = [1, 2, 3];
    const expected = [0, 2];
    expect(twoSum(nums, target)).toEqual(expected);
  });
});
describe('twoSum', () => {
  it('should pass', () => {
    const target = 6;
    const nums = [3, 2, 4];
    const expected = [1, 2];
    expect(twoSum(nums, target)).toEqual(expected);
  });
});
