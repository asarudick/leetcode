import { rotateImage } from '../src/rotateImage';
import { describe, it, expect } from 'vitest';

describe('rotateImage', () => {
  it('rotates 1x1 matrix', () => {
    const matrix = [[1]];
    rotateImage(matrix);
    expect(matrix).toEqual([[1]]);
  });

  it('rotates 2x2 matrix', () => {
    const matrix = [[1, 2], [3, 4]];
    rotateImage(matrix);
    expect(matrix).toEqual([[3, 1], [4, 2]]);
  });

  it('rotates 3x3 matrix', () => {
    const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    rotateImage(matrix);
    expect(matrix).toEqual([[7, 4, 1], [8, 5, 2], [9, 6, 3]]);
  });

  it('rotates 4x4 matrix', () => {
    const matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]];
    rotateImage(matrix);
    expect(matrix).toEqual([[13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3], [16, 12, 8, 4]]);
  });

  it('handles matrix with zeros and negatives', () => {
    const matrix = [[0, -1], [2, 3]];
    rotateImage(matrix);
    expect(matrix).toEqual([[2, 0], [3, -1]]);
  });
});