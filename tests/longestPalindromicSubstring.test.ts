import { longestPalindromicSubstring, longestPalindromicSubstringDp } from '../src/longestPalindromicSubstring';
import { describe, it, expect } from 'vitest';

describe('longestPalindromicSubstring', () => {
  it('should find the longest palindromic substring', () => {
    expect(longestPalindromicSubstring('babad')).toBe('bab');
    expect(longestPalindromicSubstring('cbbd')).toBe('bb');
    expect(longestPalindromicSubstring('a')).toBe('a');
    expect(longestPalindromicSubstring('ac')).toBe('a');
    expect(longestPalindromicSubstring('racecar')).toBe('racecar');
    expect(longestPalindromicSubstring('abcdef')).toBe('a');
    expect(longestPalindromicSubstring('abba')).toBe('abba');
    expect(longestPalindromicSubstring('abcba')).toBe('abcba');
    expect(longestPalindromicSubstring('')).toBe('');
  });
});

describe('longestPalindromicSubstringDp', () => {
  it('should find the longest palindromic substring using dynamic programming', () => {
    expect(longestPalindromicSubstringDp('babad')).toBe('bab');
    expect(longestPalindromicSubstringDp('cbbd')).toBe('bb');
    expect(longestPalindromicSubstringDp('a')).toBe('a');
    expect(longestPalindromicSubstringDp('ac')).toBe('a');
    expect(longestPalindromicSubstringDp('racecar')).toBe('racecar');
    expect(longestPalindromicSubstringDp('abcdef')).toBe('a');
    expect(longestPalindromicSubstringDp('abba')).toBe('abba');
    expect(longestPalindromicSubstringDp('abcba')).toBe('abcba');
    expect(longestPalindromicSubstringDp('')).toBe('');
  });
});
