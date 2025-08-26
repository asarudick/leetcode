import { climbStairs } from '../src/climbStairs';
import { describe, it, expect } from 'vitest';

describe('climbStairs', () => {
  it('should return the number of distinct ways to climb to the top', () => {
    expect(climbStairs(1)).toBe(1);
    expect(climbStairs(2)).toBe(2);
    expect(climbStairs(3)).toBe(3);
    expect(climbStairs(4)).toBe(5);
    expect(climbStairs(5)).toBe(8);
    expect(climbStairs(6)).toBe(13);
    expect(climbStairs(7)).toBe(21);
    expect(climbStairs(8)).toBe(34);
    expect(climbStairs(9)).toBe(55);
    expect(climbStairs(10)).toBe(89);
  });

  it('should handle edge cases within constraints', () => {
    expect(climbStairs(1)).toBe(1); // Minimum constraint
    expect(climbStairs(45)).toBe(1836311903); // Maximum constraint
  });

  it('should follow Fibonacci sequence pattern', () => {
    // The sequence should be 1 (n=1), 2 (n=2), 3 (n=3), 5 (n=4), 8 (n=5), etc.
    expect(climbStairs(1)).toBe(1);
    expect(climbStairs(2)).toBe(2);
    expect(climbStairs(3)).toBe(3);
    expect(climbStairs(4)).toBe(5);
    expect(climbStairs(5)).toBe(8);
    expect(climbStairs(6)).toBe(13);
  });
});