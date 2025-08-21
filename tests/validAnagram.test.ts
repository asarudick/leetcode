import { validAnagram } from '../src/validAnagram';
import { describe, it, expect } from 'vitest';

describe('validAnagram', () => {
  it('should return false for empty strings', () => {
    expect(validAnagram('', '')).toBe(false);
    expect(validAnagram('', 'a')).toBe(false);
    expect(validAnagram('a', '')).toBe(false);
  });

  it('should return true for valid anagrams', () => {
    expect(validAnagram('anagram', 'nagaram')).toBe(true);
    expect(validAnagram('rat', 'tar')).toBe(true);
    expect(validAnagram('listen', 'silent')).toBe(true);
    expect(validAnagram('a', 'a')).toBe(true);
    expect(validAnagram('abc', 'cba')).toBe(true);
    expect(validAnagram('hello', 'olelh')).toBe(true);
  });

  it('should return false for invalid anagrams', () => {
    expect(validAnagram('rat', 'car')).toBe(false);
    expect(validAnagram('hello', 'helo')).toBe(false);
    expect(validAnagram('apple', 'apply')).toBe(false);
    expect(validAnagram('a', 'b')).toBe(false);
    expect(validAnagram('abc', 'abcd')).toBe(false);
  });

  it('should handle case sensitivity', () => {
    expect(validAnagram('Hello', 'hello')).toBe(false);
    expect(validAnagram('State', 'Taste')).toBe(false);
  });

  it('should handle strings with spaces', () => {
    expect(validAnagram('anagram', 'nag a ram')).toBe(true);
    expect(validAnagram('dormitory', 'dirty room')).toBe(true);
  });

  it('should handle strings with special characters', () => {
    expect(validAnagram('a!b@c#', 'c@b#a!')).toBe(true);
    expect(validAnagram('test', 't e s t')).toBe(true);
  });

  it('should handle strings with numbers', () => {
    expect(validAnagram('123', '321')).toBe(true);
    expect(validAnagram('a1b2', '2b1a')).toBe(true);
    expect(validAnagram('123', '12')).toBe(false);
  });

  it('should handle long strings', () => {
    const longStr1 = 'a'.repeat(1000) + 'b'.repeat(1000);
    const longStr2 = 'b'.repeat(1000) + 'a'.repeat(1000);
    expect(validAnagram(longStr1, longStr2)).toBe(true);
    
    const longStr3 = 'a'.repeat(1000) + 'b'.repeat(999);
    const longStr4 = 'b'.repeat(1000) + 'a'.repeat(999);
    expect(validAnagram(longStr3, longStr4)).toBe(false);
  });
});