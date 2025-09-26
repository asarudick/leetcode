import { addOne } from '../src/addOne';
import { describe, it, expect } from 'vitest';

describe('addOne', () => {
  describe('Basic addition', () => {
    it('should add 1 to zero', () => {
      expect(addOne(0)).toBe(1);
    });

    it('should add 1 to single digit numbers', () => {
      expect(addOne(1)).toBe(2);
      expect(addOne(5)).toBe(6);
      expect(addOne(8)).toBe(9);
    });

    it('should add 1 to multi-digit numbers without carry', () => {
      expect(addOne(10)).toBe(11);
      expect(addOne(123)).toBe(124);
      expect(addOne(456)).toBe(457);
    });
  });

  describe('Carry-over scenarios', () => {
    it('should handle single digit carry-over', () => {
      expect(addOne(9)).toBe(10);
    });

    it('should handle multiple digit carry-over', () => {
      expect(addOne(99)).toBe(100);
      expect(addOne(999)).toBe(1000);
      expect(addOne(9999)).toBe(10000);
    });

    it('should handle partial carry-over', () => {
      expect(addOne(19)).toBe(20);
      expect(addOne(199)).toBe(200);
      expect(addOne(1099)).toBe(1100);
    });

    it('should handle all digits requiring carry-over', () => {
      expect(addOne(999)).toBe(1000);
      expect(addOne(999999)).toBe(1000000);
    });
  });

  describe('Edge cases', () => {
    it('should handle very large numbers', () => {
      expect(addOne(999999999)).toBe(1000000000);
    });

    it('should handle numbers with mixed digits', () => {
      expect(addOne(123)).toBe(124);
      expect(addOne(987654321)).toBe(987654322);
    });

    it('should handle numbers ending with 9 followed by non-9', () => {
      expect(addOne(29)).toBe(30);
      expect(addOne(8909)).toBe(8910);
    });
  });

  describe('Regression tests for implementation details', () => {
    it('should handle the exact algorithm steps', () => {
      // Test cases that exercise the specific implementation logic
      expect(addOne(9)).toBe(10); // Single 9 -> carry over creates new digit
      expect(addOne(10)).toBe(11); // No carry needed
      expect(addOne(99)).toBe(100); // Double carry over
      expect(addOne(100)).toBe(101); // Last digit 0 -> 1, no carry
      expect(addOne(999)).toBe(1000); // Triple carry over creating 4-digit result
    });
  });

  describe('Boundary and stress tests', () => {
    it('should handle maximum safe integer values', () => {
      const largeNum = 999999999999999; // 15 nines
      expect(addOne(largeNum)).toBe(1000000000000000); // 16 digits starting with 1
    });

    it('should handle alternating patterns', () => {
      expect(addOne(909)).toBe(910);
      expect(addOne(99099)).toBe(99100);
    });
  });
});
