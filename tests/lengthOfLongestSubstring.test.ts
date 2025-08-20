import { lengthOfLongestSubstring } from '../src/lengthOfLongestSubstring';
import { describe, it, expect } from 'vitest';

describe('lengthOfLongestSubstring', () => {
  it('should find the length of the longest substring without repeating characters', () => {
    expect(lengthOfLongestSubstring('abcabcbb')).toBe(3); // "abc"
    expect(lengthOfLongestSubstring('bbbbb')).toBe(1); // "b"
    expect(lengthOfLongestSubstring('pwwkew')).toBe(3); // "wke"
    expect(lengthOfLongestSubstring('')).toBe(0);
    expect(lengthOfLongestSubstring('a')).toBe(1);
    expect(lengthOfLongestSubstring('au')).toBe(2);
    expect(lengthOfLongestSubstring('dvdf')).toBe(3); // "vdf"
    expect(lengthOfLongestSubstring('abba')).toBe(2); // "ab" or "ba"
    expect(lengthOfLongestSubstring('tmmzuxt')).toBe(5); // "mzuxt"
  });
});
