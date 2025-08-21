import { containerWithMostWater } from '../src/containerWithMostWater';
import { describe, it, expect } from 'vitest';

describe('containerWithMostWater', () => {
  it('should handle empty array', () => {
    expect(containerWithMostWater([])).toBe(0);
  });

  it('should handle array with one element', () => {
    expect(containerWithMostWater([1])).toBe(0);
  });

  it('should calculate maximum area for basic case', () => {
    expect(containerWithMostWater([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
  });

  it('should calculate maximum area for ascending heights', () => {
    expect(containerWithMostWater([1, 2, 3, 4, 5])).toBe(6);
  });

  it('should calculate maximum area for descending heights', () => {
    expect(containerWithMostWater([5, 4, 3, 2, 1])).toBe(6);
  });

  it('should calculate maximum area for equal heights', () => {
    expect(containerWithMostWater([5, 5, 5, 5, 5])).toBe(20);
  });

  it('should calculate maximum area for two elements', () => {
    expect(containerWithMostWater([1, 1])).toBe(1);
    expect(containerWithMostWater([1, 2])).toBe(1);
    expect(containerWithMostWater([2, 1])).toBe(1);
  });

  it('should handle case where maximum area is at the beginning', () => {
    expect(containerWithMostWater([8, 1, 1, 1, 1, 1, 1, 1, 7])).toBe(56);
  });

  it('should handle case where maximum area is at the end', () => {
    expect(containerWithMostWater([1, 1, 1, 1, 1, 1, 1, 8, 7])).toBe(8);
  });

  it('should handle case with varying heights', () => {
    expect(containerWithMostWater([1, 3, 2, 5, 25, 24, 5])).toBe(24);
  });
});
