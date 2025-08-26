import { spiralOrder } from '../src/spiralOrder';
import { describe, it, expect } from 'vitest';

describe('spiralOrder', () => {
  it('should return elements in spiral order for a 3x3 matrix', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    const result = spiralOrder(matrix);
    expect(result).toEqual([1, 2, 3, 6, 9, 8, 7, 4, 5]);
  });

  it('should return elements in spiral order for a 3x4 matrix', () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12]
    ];
    const result = spiralOrder(matrix);
    expect(result).toEqual([1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]);
  });

  it('should handle a single row matrix', () => {
    const matrix = [[1, 2, 3, 4, 5]];
    const result = spiralOrder(matrix);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle a single column matrix', () => {
    const matrix = [
      [1],
      [2],
      [3],
      [4],
      [5]
    ];
    const result = spiralOrder(matrix);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle a 1x1 matrix', () => {
    const matrix = [[1]];
    const result = spiralOrder(matrix);
    expect(result).toEqual([1]);
  });

  it('should handle a 2x2 matrix', () => {
    const matrix = [
      [1, 2],
      [4, 3]
    ];
    const result = spiralOrder(matrix);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('should handle a 4x4 matrix', () => {
    const matrix = [
      [1, 2, 3, 4],
      [12, 13, 14, 5],
      [11, 16, 15, 6],
      [10, 9, 8, 7]
    ];
    const result = spiralOrder(matrix);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
  });

  it('should handle a 2x3 matrix', () => {
    const matrix = [
      [1, 2, 3],
      [6, 5, 4]
    ];
    const result = spiralOrder(matrix);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should handle a 3x2 matrix', () => {
    const matrix = [
      [1, 2],
      [6, 3],
      [5, 4]
    ];
    const result = spiralOrder(matrix);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should handle matrices with negative numbers', () => {
    const matrix = [
      [-1, -2, -3],
      [-6, -5, -4],
      [-7, -8, -9]
    ];
    const result = spiralOrder(matrix);
    expect(result).toEqual([-1, -2, -3, -4, -9, -8, -7, -6, -5]);
  });

  it('should handle matrices with mixed positive and negative numbers', () => {
    const matrix = [
      [1, -2, 3],
      [-6, 5, 4],
      [-7, -8, 9]
    ];
    const result = spiralOrder(matrix);
    expect(result).toEqual([1, -2, 3, 4, 9, -8, -7, -6, 5]);
  });
});