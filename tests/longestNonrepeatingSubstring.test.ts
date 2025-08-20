import longestNonrepeatingSubstring from '../src/longestNonrepeatingSubstring';
import { describe, it, expect } from 'vitest';

describe('longestNonrepeatingSubstring', () => {
  it('should pass', () => {
    const input = "abcabcbb";
    const expected = 3;
    expect(longestNonrepeatingSubstring(input)).toEqual(expected);
  });
});
