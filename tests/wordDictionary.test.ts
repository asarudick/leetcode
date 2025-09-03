import { describe, it, expect, beforeEach } from 'vitest';
import { WordDictionary } from '../src/wordDictionary';

describe('WordDictionary', () => {
  let wordDictionary: WordDictionary;

  beforeEach(() => {
    wordDictionary = new WordDictionary();
  });

  describe('constructor', () => {
    it('should initialize a new WordDictionary with an empty trie', () => {
      expect(wordDictionary).toBeInstanceOf(WordDictionary);
      expect(wordDictionary.trie).toBeDefined();
      // Since the trie is internal, we can't directly check its state,
      // but we can infer it's empty by searching for a non-existent word.
      expect(wordDictionary.search('test')).toBe(false);
    });
  });

  describe('addWord', () => {
    it('should add a single word to the dictionary', () => {
      wordDictionary.addWord('apple');
      expect(wordDictionary.search('apple')).toBe(true);
      expect(wordDictionary.search('app')).toBe(false);
    });

    it('should add multiple words to the dictionary', () => {
      wordDictionary.addWord('apple');
      wordDictionary.addWord('app');
      wordDictionary.addWord('banana');
      expect(wordDictionary.search('apple')).toBe(true);
      expect(wordDictionary.search('app')).toBe(true);
      expect(wordDictionary.search('banana')).toBe(true);
      expect(wordDictionary.search('band')).toBe(false);
    });

    it('should handle adding duplicate words', () => {
      wordDictionary.addWord('apple');
      wordDictionary.addWord('apple');
      expect(wordDictionary.search('apple')).toBe(true);
      // Depending on implementation, this might count 'apple' twice,
      // but search only needs to return true if it exists at least once.
      // The current Trie implementation in lib/Trie.ts increments endCount.
      // For this problem, searching for 'apple' should still just be true.
    });

    it('should handle empty string word if constraints allowed (though constraint is length >= 1)', () => {
      // Constraint: 1 <= word.length <= 25
      // So, we don't need to test empty string addWord.
    });

    it('should handle words with maximum length (25)', () => {
      const longWord = 'a'.repeat(25);
      wordDictionary.addWord(longWord);
      expect(wordDictionary.search(longWord)).toBe(true);
      expect(wordDictionary.search('a'.repeat(24))).toBe(false);
    });

    it('should add words consisting of lowercase English letters', () => {
      wordDictionary.addWord('bad');
      wordDictionary.addWord('dad');
      wordDictionary.addWord('mad');
      expect(wordDictionary.search('bad')).toBe(true);
      expect(wordDictionary.search('dad')).toBe(true);
      expect(wordDictionary.search('mad')).toBe(true);
    });
  });

  describe('search', () => {
    beforeEach(() => {
      wordDictionary.addWord('bad');
      wordDictionary.addWord('dad');
      wordDictionary.addWord('mad');
      wordDictionary.addWord('apple');
      wordDictionary.addWord('app');
    });

    it('should return true for an exact match', () => {
      expect(wordDictionary.search('bad')).toBe(true);
      expect(wordDictionary.search('dad')).toBe(true);
      expect(wordDictionary.search('mad')).toBe(true);
      expect(wordDictionary.search('apple')).toBe(true);
    });

    it('should return false for a non-existent exact match', () => {
      expect(wordDictionary.search('pad')).toBe(false);
      expect(wordDictionary.search('bat')).toBe(false);
      expect(wordDictionary.search('map')).toBe(false);
      expect(wordDictionary.search('appl')).toBe(false);
    });

    it('should handle wildcard "." for any single character', () => {
      expect(wordDictionary.search('.ad')).toBe(true); // bad, dad, mad
      expect(wordDictionary.search('b.')).toBe(false); // No 2-letter words added starting with 'b'
      expect(wordDictionary.search('b.d')).toBe(true); // bad
      expect(wordDictionary.search('...')).toBe(true); // bad, dad, mad
      expect(wordDictionary.search('....')).toBe(false); // No 4-letter words like this
    });

    it('should handle words with multiple wildcards "."', () => {
      expect(wordDictionary.search('b..')).toBe(true); // bad
      expect(wordDictionary.search('.a.')).toBe(true); // bad, dad, mad
      expect(wordDictionary.search('...d')).toBe(false); // No 4-letter words ending with 'd'
      wordDictionary.addWord('bard');
      expect(wordDictionary.search('b..d')).toBe(true); // bard
    });

    it('should search for a string that is a prefix of an added word but not an exact match', () => {
      expect(wordDictionary.search('app')).toBe(true); // 'app' was added
      expect(wordDictionary.search('ap')).toBe(false); // 'ap' was not added
    });

    it('should return false if wildcard does not match any letter', () => {
      wordDictionary.addWord('cat');
      wordDictionary.addWord('car');
      // Assuming 'z' is not a character in any word for a given pattern
      expect(wordDictionary.search('c.z')).toBe(false); 
    });

    it('should handle search queries with exactly two dots as per constraints', () => {
      wordDictionary.addWord('bat');
      wordDictionary.addWord('bit');
      wordDictionary.addWord('bot');
      wordDictionary.addWord('but');
      
      expect(wordDictionary.search('b.t')).toBe(true); // bat, bit, bot, but
      expect(wordDictionary.search('b..')).toBe(true); // bat, bit, bot, but (if they were 3 letters, they are)
      expect(wordDictionary.search('.a.')).toBe(true); // bad
      expect(wordDictionary.search('...')).toBe(true); // bad, dad, mad, bat, bit, bot, but
    });

    it('should handle search queries with no dots', () => {
      expect(wordDictionary.search('bad')).toBe(true);
      expect(wordDictionary.search('pad')).toBe(false);
    });

    it('should return false for search of empty string (constraint: word.length >= 1)', () => {
      // Constraint: 1 <= word.length <= 25 for search as well
      // We don't need to test searching for ""
    });

    it('should handle search for words of maximum length (25)', () => {
      const longWord = 'a'.repeat(25);
      wordDictionary.addWord(longWord);
      expect(wordDictionary.search(longWord)).toBe(true);
      expect(wordDictionary.search('a'.repeat(24))).toBe(false);
      expect(wordDictionary.search('z' + 'a'.repeat(24))).toBe(false); // starts with different char
      expect(wordDictionary.search('.' + 'a'.repeat(24))).toBe(true); // wildcard match
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle the example from the problem statement', () => {
      const wd = new WordDictionary();
      wd.addWord("bad");
      wd.addWord("dad");
      wd.addWord("mad");
      expect(wd.search("pad")).toBe(false);
      expect(wd.search("bad")).toBe(true);
      expect(wd.search(".ad")).toBe(true);
      expect(wd.search("b..")).toBe(true);
    });
    
    it('should correctly search when words share prefixes', () => {
      wordDictionary.addWord('app');
      wordDictionary.addWord('apple');
      wordDictionary.addWord('appetite');
      wordDictionary.addWord('application');

      expect(wordDictionary.search('app')).toBe(true);
      expect(wordDictionary.search('apple')).toBe(true);
      expect(wordDictionary.search('appetite')).toBe(true);
      expect(wordDictionary.search('application')).toBe(true);

      expect(wordDictionary.search('appl')).toBe(false); // 'appl' is not an added word
      expect(wordDictionary.search('app.')).toBe(false); // 'app' (if 4 letters, 'app' is 3)
      wordDictionary.addWord('apply');
      expect(wordDictionary.search('app.')).toBe(false); // 'apply'

      expect(wordDictionary.search('.pp')).toBe(true); // 'app'
      expect(wordDictionary.search('.pple')).toBe(true); // 'apple'
      expect(wordDictionary.search('appeti.e')).toBe(true); // 'appetite'
      expect(wordDictionary.search('app...ion')).toBe(false); // 'application'
    });

    it('should handle searches where wildcards could lead to multiple paths', () => {
      wordDictionary.addWord('cat');
      wordDictionary.addWord('cut');
      wordDictionary.addWord('cot');
      wordDictionary.addWord('bat');
      wordDictionary.addWord('bit');

      expect(wordDictionary.search('.at')).toBe(true); // 'bat', 'cat'
      expect(wordDictionary.search('.ut')).toBe(true); // 'cut'
      expect(wordDictionary.search('.ot')).toBe(true); // 'cot'
      expect(wordDictionary.search('c.t')).toBe(true); // 'cat', 'cot'
      expect(wordDictionary.search('b.t')).toBe(true); // 'bat'
      expect(wordDictionary.search('b..')).toBe(true); // 'bat', 'bit'
      expect(wordDictionary.search('...')).toBe(true); // 'cat', 'cut', 'cot', 'bat', 'bit'
      
      // A case where a wildcard has no valid path for a specific branch
      expect(wordDictionary.search('c.x')).toBe(false); // No word 'cX' where X is not t, o, u
      expect(wordDictionary.search('b.y')).toBe(false); // No word 'bY' where Y is not a, i
    });
  });
});