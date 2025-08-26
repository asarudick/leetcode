import { productExceptSelf } from '../src/productExceptSelf';
import { describe, it, expect } from 'vitest';

describe('productExceptSelf', () => {
  it('should correctly compute product of array except self', () => {
    // Example 1
    expect(productExceptSelf([1, 2, 3, 4])).toEqual([24, 12, 8, 6]);
    
    // Example 2
    expect(productExceptSelf([-1, 1, 0, -3, 3])).toEqual([-0, 0, 9, -0, 0]);
  });

  it('should handle edge cases', () => {
    // Minimum constraint length
    expect(productExceptSelf([1, 2])).toEqual([2, 1]);
    
    // Array with negative numbers
    expect(productExceptSelf([-1, -2, -3, -4])).toEqual([-24, -12, -8, -6]);
    
    // Array with zeros
    expect(productExceptSelf([0, 1, 2, 3])).toEqual([6, 0, 0, 0]);
    expect(productExceptSelf([1, 0, 3, 0])).toEqual([0, 0, 0, 0]);
    
    // Array with mixed positive and negative numbers
    expect(productExceptSelf([-1, 2, -3, 4])).toEqual([-24, 12, -8, 6]);
  });

  it('should handle arrays with length 2', () => {
    expect(productExceptSelf([5, 2])).toEqual([2, 5]);
    expect(productExceptSelf([-3, 7])).toEqual([7, -3]);
  });
});
