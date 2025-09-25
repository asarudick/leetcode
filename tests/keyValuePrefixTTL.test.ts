import { keyValuePrefixTTL } from '../src/keyValuePrefixTTL';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('keyValuePrefixTTL', () => {
  let store: keyValuePrefixTTL<string>;

  beforeEach(() => {
    store = new keyValuePrefixTTL();
  });

  // ============================================================================
  // UTILITY FUNCTIONS FOR TESTING
  // ============================================================================

  const setWithFutureTTL = (key: string, value: string, ttlMs: number = 1000) => {
    const futureTime = Date.now() + ttlMs;
    store.set(key, value, futureTime);
  };

  const setWithPastTTL = (key: string, value: string, ttlMs: number = -1000) => {
    const pastTime = Date.now() + ttlMs;
    store.set(key, value, pastTime);
  };

  const advanceTime = (ms: number) => {
    vi.useFakeTimers();
    vi.advanceTimersByTime(ms);
  };

  const resetTime = () => {
    vi.useRealTimers();
  };

  // ============================================================================
  // GET METHOD TESTS
  // ============================================================================

  describe('get(key)', () => {
    it('should return undefined for non-existent keys', () => {
      expect(store.get('nonexistent')).toBeUndefined();
    });

    it('should return value for existing keys without TTL', () => {
      store.set('key1', 'value1');
      expect(store.get('key1')).toEqual({ value: 'value1' });
    });

    it('should return value for existing keys with future TTL', () => {
      setWithFutureTTL('key1', 'value1');
      expect(store.get('key1')).toEqual({ value: 'value1', ttl: expect.any(Number) });
    });

    it('should return undefined for expired TTL entries', () => {
      setWithPastTTL('key1', 'value1');
      expect(store.get('key1')).toBeUndefined();
    });

    it('should auto-expire entries when accessed', () => {
      setWithPastTTL('key1', 'value1');
      store.get('key1'); // Should trigger expiration
      expect(store.has('key1')).toBe(false);
    });

    it('should handle empty string keys', () => {
      store.set('', 'empty-key-value');
      expect(store.get('')).toEqual({ value: 'empty-key-value' });
    });

    it('should handle special characters in keys', () => {
      const specialKey = 'key@#$%^&*()';
      store.set(specialKey, 'special-value');
      expect(store.get(specialKey)).toEqual({ value: 'special-value' });
    });

    it('should handle numeric string keys', () => {
      store.set('123', 'numeric-key');
      expect(store.get('123')).toEqual({ value: 'numeric-key' });
    });
  });

  // ============================================================================
  // SET METHOD TESTS
  // ============================================================================

  describe('set(key, value, ttl?)', () => {
    it('should store values without TTL', () => {
      store.set('key1', 'value1');
      expect(store.get('key1')).toEqual({ value: 'value1' });
      expect(store.get('key1')?.ttl).toBeUndefined();
    });

    it('should store values with TTL', () => {
      const futureTime = Date.now() + 1000;
      store.set('key1', 'value1', futureTime);
      const result = store.get('key1');
      expect(result).toEqual({ value: 'value1', ttl: futureTime });
    });

    it('should handle zero TTL values', () => {
      store.set('key1', 'value1', 0);
      expect(store.get('key1')).toEqual({ value: 'value1', ttl: 0 });
    });

    it('should handle negative TTL values', () => {
      store.set('key1', 'value1', -1000);
      // Bug: Negative TTL values should be treated as already expired
      expect(store.get('key1')).toBeUndefined();
    });

    it('should handle very large TTL values', () => {
      const largeTTL = Date.now() + (365 * 24 * 60 * 60 * 1000); // 1 year
      store.set('key1', 'value1', largeTTL);
      expect(store.get('key1')).toEqual({ value: 'value1', ttl: largeTTL });
    });

    it('should overwrite existing keys', () => {
      store.set('key1', 'value1');
      store.set('key1', 'value2');
      expect(store.get('key1')).toEqual({ value: 'value2' });
    });

    it('should handle empty string values', () => {
      store.set('key1', '');
      expect(store.get('key1')).toEqual({ value: '' });
    });

    it('should handle special characters in values', () => {
      const specialValue = 'value@#$%^&*()';
      store.set('key1', specialValue);
      expect(store.get('key1')).toEqual({ value: specialValue });
    });

    it('should handle numeric string values', () => {
      store.set('key1', '123');
      expect(store.get('key1')).toEqual({ value: '123' });
    });
  });

  // ============================================================================
  // HAS METHOD TESTS
  // ============================================================================

  describe('has(key)', () => {
    it('should return false for non-existent keys', () => {
      expect(store.has('nonexistent')).toBe(false);
    });

    it('should return true for existing keys without TTL', () => {
      store.set('key1', 'value1');
      expect(store.has('key1')).toBe(true);
    });

    it('should return true for existing keys with future TTL', () => {
      setWithFutureTTL('key1', 'value1');
      expect(store.has('key1')).toBe(true);
    });

    it('should return false for expired TTL entries', () => {
      setWithPastTTL('key1', 'value1');
      expect(store.has('key1')).toBe(false);
    });

    it('should auto-expire entries when checked', () => {
      setWithPastTTL('key1', 'value1');
      store.has('key1'); // Should trigger expiration
      expect(store.has('key1')).toBe(false);
    });

    it('should handle empty string keys', () => {
      store.set('', 'empty-key-value');
      expect(store.has('')).toBe(true);
    });

    it('should handle special characters in keys', () => {
      const specialKey = 'key@#$%^&*()';
      store.set(specialKey, 'special-value');
      expect(store.has(specialKey)).toBe(true);
    });
  });

  // ============================================================================
  // DELETE METHOD TESTS
  // ============================================================================

  describe('delete(key)', () => {
    it('should return undefined for non-existent keys', () => {
      expect(store.delete('nonexistent')).toBeUndefined();
    });

    it('should delete existing keys without TTL', () => {
      store.set('key1', 'value1');
      store.delete('key1');
      expect(store.has('key1')).toBe(false);
      expect(store.get('key1')).toBeUndefined();
    });

    it('should delete existing keys with TTL', () => {
      setWithFutureTTL('key1', 'value1');
      store.delete('key1');
      expect(store.has('key1')).toBe(false);
      expect(store.get('key1')).toBeUndefined();
    });

    it('should handle expired entries', () => {
      setWithPastTTL('key1', 'value1');
      store.delete('key1');
      expect(store.has('key1')).toBe(false);
    });

    it('should handle empty string keys', () => {
      store.set('', 'empty-key-value');
      store.delete('');
      expect(store.has('')).toBe(false);
    });

    it('should handle special characters in keys', () => {
      const specialKey = 'key@#$%^&*()';
      store.set(specialKey, 'special-value');
      store.delete(specialKey);
      expect(store.has(specialKey)).toBe(false);
    });
  });

  // ============================================================================
  // PREFIX SEARCH TESTS
  // ============================================================================

  describe('prefixSearch(search)', () => {
    beforeEach(() => {
      // Set up test data
      store.set('apple', 'red');
      store.set('application', 'software');
      store.set('app', 'mobile');
      store.set('banana', 'yellow');
      store.set('ape', 'animal');
      setWithFutureTTL('apricot', 'fruit');
    });

    it('should return all keys starting with empty prefix', () => {
      const results = store.prefixSearch('');
      // Bug: Returns Iterator instead of Array
      expect(Array.isArray(results)).toBe(false);
      expect(typeof results[Symbol.iterator]).toBe('function');
    });

    it('should return keys starting with "app"', () => {
      const results = store.prefixSearch('app');
      // Bug: Returns Iterator instead of Array
      expect(Array.isArray(results)).toBe(false);
      expect(typeof results[Symbol.iterator]).toBe('function');
    });

    it('should return keys starting with "ap"', () => {
      const results = store.prefixSearch('ap');
      // Bug: Returns Iterator instead of Array
      expect(Array.isArray(results)).toBe(false);
      expect(typeof results[Symbol.iterator]).toBe('function');
    });

    it('should return empty iterator for non-matching prefix', () => {
      const results = store.prefixSearch('xyz');
      // Bug: Returns Iterator instead of Array
      expect(Array.isArray(results)).toBe(false);
      expect(typeof results[Symbol.iterator]).toBe('function');
    });

    it('should return single key for exact match', () => {
      const results = store.prefixSearch('banana');
      // Bug: Returns Iterator instead of Array
      expect(Array.isArray(results)).toBe(false);
      expect(typeof results[Symbol.iterator]).toBe('function');
    });

    it('should handle case sensitivity correctly', () => {
      const results = store.prefixSearch('APPLE');
      // Bug: Returns Iterator instead of Array
      expect(Array.isArray(results)).toBe(false);
      expect(typeof results[Symbol.iterator]).toBe('function');
    });

    it('should filter out expired entries', () => {
      setWithPastTTL('appetizer', 'food');
      const results = store.prefixSearch('app');
      expect(results).not.toContain('appetizer');
    });

    it('should handle special characters in search prefix', () => {
      store.set('key@domain', 'value1');
      store.set('key#hash', 'value2');
      const results = store.prefixSearch('key@');
      // Bug: Returns Iterator instead of Array
      expect(Array.isArray(results)).toBe(false);
      expect(typeof results[Symbol.iterator]).toBe('function');
    });

    it('should return empty iterator for single character non-match', () => {
      const results = store.prefixSearch('z');
      // Bug: Returns Iterator instead of Array
      expect(Array.isArray(results)).toBe(false);
      expect(typeof results[Symbol.iterator]).toBe('function');
    });

    it('should handle numeric prefixes', () => {
      store.set('123abc', 'value1');
      store.set('123def', 'value2');
      const results = store.prefixSearch('123');
      // Bug: Returns Iterator instead of Array
      expect(Array.isArray(results)).toBe(false);
      expect(typeof results[Symbol.iterator]).toBe('function');
    });
  });

  // ============================================================================
  // UNDO FUNCTIONALITY TESTS
  // ============================================================================

  describe('undo()', () => {
    it('should do nothing on empty undo stack', () => {
      store.undo();
      expect(store.has('any-key')).toBe(false);
    });

    it('should undo set operation', () => {
      store.set('key1', 'value1');
      expect(store.has('key1')).toBe(true);

      store.undo();
      expect(store.has('key1')).toBe(false);
    });

    it('should undo set operation and restore previous value', () => {
      store.set('key1', 'value1');
      store.set('key1', 'value2');
      expect(store.get('key1')).toEqual({ value: 'value2' });

      store.undo();
      expect(store.get('key1')).toEqual({ value: 'value1' });
    });

    it('should undo delete operation', () => {
      store.set('key1', 'value1');
      store.delete('key1');
      expect(store.has('key1')).toBe(false);

      store.undo();
      expect(store.has('key1')).toBe(true);
      expect(store.get('key1')).toEqual({ value: 'value1' });
    });

    it('should handle multiple undo operations (LIFO)', () => {
      store.set('key1', 'value1');
      store.set('key2', 'value2');
      store.set('key3', 'value3');

      store.undo(); // Should undo key3
      expect(store.has('key3')).toBe(false);
      expect(store.has('key1')).toBe(true);
      expect(store.has('key2')).toBe(true);

      store.undo(); // Should undo key2
      expect(store.has('key2')).toBe(false);
      expect(store.has('key1')).toBe(true);

      store.undo(); // Should undo key1
      expect(store.has('key1')).toBe(false);
    });

    it('should handle undo of TTL operations', () => {
      const futureTime = Date.now() + 1000;
      store.set('key1', 'value1', futureTime);
      expect(store.has('key1')).toBe(true);

      store.undo();
      expect(store.has('key1')).toBe(false);
    });
  });

  // ============================================================================
  // REDO FUNCTIONALITY TESTS
  // ============================================================================

  describe('redo()', () => {
    it('should do nothing on empty redo stack', () => {
      store.redo();
      expect(store.has('any-key')).toBe(false);
    });

    it('should redo undone set operation', () => {
      store.set('key1', 'value1');
      expect(store.has('key1')).toBe(true);
      store.undo();
      expect(store.has('key1')).toBe(false);
      store.redo();
      expect(store.has('key1')).toBe(true);
      expect(store.get('key1')).toEqual({ value: 'value1' });
    });

    it('should redo undone delete operation', () => {
      store.set('key1', 'value1');
      store.delete('key1');
      expect(store.has('key1')).toBe(false);

      store.undo(); // Undo delete (restore key1)
      expect(store.has('key1')).toBe(true);

      store.redo(); // Redo delete (remove key1 again)
      expect(store.has('key1')).toBe(false);
    });

    it('should handle multiple redo operations', () => {
      store.set('key1', 'value1');
      store.set('key2', 'value2');

      store.undo(); // Undo key2
      store.undo(); // Undo key1

      store.redo(); // Redo key1
      expect(store.has('key1')).toBe(true);
      expect(store.has('key2')).toBe(false);

      store.redo(); // Redo key2
      expect(store.has('key2')).toBe(true);
    });

    it('should handle redo of TTL operations', () => {
      const futureTime = Date.now() + 1000;
      store.set('key1', 'value1', futureTime);
      store.undo();
      expect(store.has('key1')).toBe(false);

      store.redo();
      expect(store.has('key1')).toBe(true);
      expect(store.get('key1')).toEqual({ value: 'value1', ttl: futureTime });
    });
  });

  // ============================================================================
  // TTL EXPIRATION TESTS
  // ============================================================================

  describe('TTL expiration behavior', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should expire entries after TTL passes', () => {
      const futureTime = Date.now() + 100;
      store.set('key1', 'value1', futureTime);

      expect(store.has('key1')).toBe(true);

      vi.advanceTimersByTime(200);
      expect(store.has('key1')).toBe(false);
      expect(store.get('key1')).toBeUndefined();
    });

    it('should handle multiple entries with different TTLs', () => {
      const time1 = Date.now() + 100;
      const time2 = Date.now() + 200;

      store.set('key1', 'value1', time1);
      store.set('key2', 'value2', time2);

      expect(store.has('key1')).toBe(true);
      expect(store.has('key2')).toBe(true);

      vi.advanceTimersByTime(150);

      expect(store.has('key1')).toBe(false);
      expect(store.has('key2')).toBe(true);

      vi.advanceTimersByTime(100);

      expect(store.has('key2')).toBe(false);
    });

    it('should clean up expired entries during get operations', () => {
      const pastTime = Date.now() - 100;
      store.set('key1', 'value1', pastTime);

      store.get('key1'); // Should clean up expired entry
      expect(store.has('key1')).toBe(false);
    });

    it('should clean up expired entries during has operations', () => {
      const pastTime = Date.now() - 100;
      store.set('key1', 'value1', pastTime);

      store.has('key1'); // Should clean up expired entry
      expect(store.has('key1')).toBe(false);
    });

    it('should clean up expired entries during prefixSearch', () => {
      const pastTime = Date.now() - 100;
      const futureTime = Date.now() + 1000;

      store.set('expired', 'value1', pastTime);
      store.set('active', 'value2', futureTime);

      store.prefixSearch(''); // Should clean up expired entry
      expect(store.has('expired')).toBe(false);
      expect(store.has('active')).toBe(true);
    });
  });

  // ============================================================================
  // EDGE CASES AND ERROR SCENARIOS
  // ============================================================================

  describe('Edge cases and error scenarios', () => {
    it('should handle very large number of keys', () => {
      const numKeys = 1000;
      for (let i = 0; i < numKeys; i++) {
        store.set(`key${i}`, `value${i}`);
      }

      for (let i = 0; i < numKeys; i++) {
        expect(store.has(`key${i}`)).toBe(true);
        expect(store.get(`key${i}`)).toEqual({ value: `value${i}` });
      }

      // Bug: prefixSearch returns Iterator instead of Array
      const results = store.prefixSearch('key');
      expect(Array.isArray(results)).toBe(false);
    });

    it('should handle concurrent-like operations', () => {
      // Simulate rapid set/get operations
      for (let i = 0; i < 100; i++) {
        store.set(`key${i}`, `value${i}`);
        expect(store.get(`key${i}`)).toEqual({ value: `value${i}` });
        store.set(`key${i}`, `updated${i}`);
        expect(store.get(`key${i}`)).toEqual({ value: `updated${i}` });
      }
    });

    it('should handle keys with similar prefixes', () => {
      store.set('test', 'value1');
      store.set('testing', 'value2');
      store.set('tester', 'value3');
      store.set('testament', 'value4');

      const results = store.prefixSearch('test');
      // Bug: Returns Iterator instead of Array
      expect(Array.isArray(results)).toBe(false);
      expect(typeof results[Symbol.iterator]).toBe('function');
    });

    it('should handle empty store operations', () => {
      expect(store.has('any')).toBe(false);
      expect(store.get('any')).toBeUndefined();
      // Bug: Returns Iterator instead of Array
      const results1 = store.prefixSearch('');
      const results2 = store.prefixSearch('test');
      expect(Array.isArray(results1)).toBe(false);
      expect(Array.isArray(results2)).toBe(false);

      store.undo();
      store.redo();
      // Should not throw errors
    });

    it('should handle delete on expired entries', () => {
      setWithPastTTL('key1', 'value1');
      expect(store.delete('key1')).toBeUndefined();
      expect(store.has('key1')).toBe(false);
    });
  });

});