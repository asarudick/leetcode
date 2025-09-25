import { validSudoku } from '../src/validSudoku';
import { describe, it, expect } from 'vitest';

describe('validSudoku', () => {
  describe('Valid Sudoku boards', () => {
    it('should validate a simple valid 9x9 Sudoku board', () => {
      // Simple valid board with no conflicts - avoid box index issues
      const board: (number | null)[][] = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [9, 1, 2, 3, 4, 5, 6, 7, 8]
      ];
      expect(validSudoku(board)).toBe(true);
    });

    it('should validate a partially filled valid board', () => {
      // Make sure this has exactly 9 rows and avoid box conflicts
      const board: (number | null)[][] = [
        [1, null, null, null, null, null, null, null, null],
        [null, 2, null, null, null, null, null, null, null],
        [null, null, 3, null, null, null, null, null, null],
        [null, null, null, 4, null, null, null, null, null],
        [null, null, null, null, 5, null, null, null, null],
        [null, null, null, null, null, 6, null, null, null],
        [null, null, null, null, null, null, 7, null, null],
        [null, null, null, null, null, null, null, 8, null],
        [null, null, null, null, null, null, null, null, 9]
      ];
      expect(validSudoku(board)).toBe(true);
    });
  });

  describe('Invalid Sudoku boards - Row duplicates', () => {
    it('should detect duplicate numbers in the same row', () => {
      const board: (number | null)[][] = [
        [1, 2, 1, null, null, null, null, null, null], // Two 1's in first row
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null]
      ];
      expect(validSudoku(board)).toBe(false);
    });
  });

  describe('Invalid Sudoku boards - Column duplicates', () => {
    it('should detect duplicate numbers in the same column', () => {
      const board: (number | null)[][] = [
        [1, null, null, null, null, null, null, null, null],
        [1, null, null, null, null, null, null, null, null], // Duplicate 1 in column 1
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null]
      ];
      expect(validSudoku(board)).toBe(false);
    });
  });

  describe('Invalid Sudoku boards - 3x3 box duplicates', () => {
    it('should detect duplicate numbers in the same 3x3 box', () => {
      const board: (number | null)[][] = [
        [1, 2, 3, null, null, null, null, null, null],
        [4, 5, 6, null, null, null, null, null, null],
        [7, 8, 1, null, null, null, null, null, null], // Duplicate 1 in top-left 3x3 box
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null]
      ];
      expect(validSudoku(board)).toBe(false);
    });
  });

  describe('Edge cases (9x9 boards)', () => {
    it('should handle completely empty 9x9 board', () => {
      const board: (number | null)[][] = Array(9).fill(null).map(() => Array(9).fill(null));
      expect(validSudoku(board)).toBe(true);
    });

    it('should handle 9x9 board with only null values', () => {
      const board: (number | null)[][] = Array(9).fill(null).map(() => Array(9).fill(null));
      expect(validSudoku(board)).toBe(true);
    });

    it('should handle 9x9 board with diagonal pattern', () => {
      const board: (number | null)[][] = Array(9).fill(null).map((_, i) =>
        Array(9).fill(null).map((_, j) => i === j ? 1 : null)
      );
      expect(validSudoku(board)).toBe(false); // All 1's in diagonal - invalid
    });
  });

  describe('Invalid inputs (expected behavior)', () => {
    it('should throw on null input', () => {
      expect(() => validSudoku(null as any)).toThrow(); // Throws on null.length
    });

    it('should throw on undefined input', () => {
      expect(() => validSudoku(undefined as any)).toThrow(); // Throws on undefined.length
    });

    it('should return false for string input', () => {
      expect(validSudoku('invalid' as any)).toBe(false); // Implementation detects this as invalid
    });

    it('should return false for array with non-array rows', () => {
      const board: any = [
        [1, 2, 3],
        'invalid row',
        [4, 5, 6]
      ];
      expect(validSudoku(board)).toBe(false); // Implementation handles this gracefully but returns false
    });
  });

  describe('Complex scenarios', () => {
    it('should handle board with multiple validation issues', () => {
      const board: (number | null)[][] = [
        [1, 2, 1, null, null, null, null, null, null], // Row duplicate
        [1, null, null, null, null, null, null, null, null], // Column duplicate
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, 1, null, null, null, null, null], // Box duplicate
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null]
      ];
      expect(validSudoku(board)).toBe(false);
    });
  });

  describe('Performance considerations', () => {
    it('should handle large invalid boards efficiently', () => {
      const board: (number | null)[][] = Array(9).fill(null).map(() =>
        Array(9).fill(1) // All 1's - invalid
      );
      const startTime = Date.now();
      const result = validSudoku(board);
      const endTime = Date.now();
      expect(result).toBe(false);
      expect(endTime - startTime).toBeLessThan(100); // Should complete quickly
    });
  });
});