import { longestConsecutive } from '../src/longestConsecutive';
import { describe, it, expect } from 'vitest';

describe('longestConsecutive', () => {
  it('returns 0 for empty array', () => {
    expect(longestConsecutive([])).toBe(0);
  });

  it('returns 1 for single element', () => {
    expect(longestConsecutive([1])).toBe(1);
  });

  it('returns 1 for non-consecutive elements', () => {
    expect(longestConsecutive([1, 3, 5])).toBe(1);
  });

  it('returns length of consecutive sequence', () => {
    expect(longestConsecutive([100, 4, 200, 1, 3, 2])).toBe(4);
  });

  it('handles duplicates', () => {
    expect(longestConsecutive([1, 1, 2, 3])).toBe(3);
  });

  it('handles negative numbers', () => {
    expect(longestConsecutive([-1, 0, 1])).toBe(3);
  });

  it('handles longer sequence', () => {
    expect(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])).toBe(9);
  });
});