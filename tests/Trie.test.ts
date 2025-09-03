import { Trie } from '../src/Trie';
import { describe, it, expect } from 'vitest';

describe('Trie', () => {
  it('should handle basic operations', () => {
    const trie = new Trie();
    expect(trie).toBeDefined();

    trie.insert("apple");
    expect(trie.search("apple")).toBe(true);
    expect(trie.search("app")).toBe(false);
    expect(trie.startsWith("app")).toBe(true);

    trie.insert("app");
    expect(trie.search("app")).toBe(true);
    expect(trie.search("apple")).toBe(true);
    expect(trie.startsWith("app")).toBe(true);
  });

  it('should search for words that are not inserted', () => {
    const trie = new Trie();
    trie.insert("apple");
    expect(trie.search("apples")).toBe(false);
    expect(trie.search("aple")).toBe(false);
    expect(trie.search("banana")).toBe(false);
  });

  it('should handle startsWith for non-existent prefixes', () => {
    const trie = new Trie();
    trie.insert("apple");
    expect(trie.startsWith("app")).toBe(true);
    expect(trie.startsWith("appl")).toBe(true);
    expect(trie.startsWith("b")).toBe(false);
    expect(trie.startsWith("applepie")).toBe(false);
  });

  it('should handle multiple insertions of the same word', () => {
    const trie = new Trie();
    trie.insert("apple");
    trie.insert("apple");
    expect(trie.search("apple")).toBe(true);
    expect(trie.startsWith("app")).toBe(true);
  });

  it('should handle words with common prefixes', () => {
    const trie = new Trie();
    trie.insert("apple");
    trie.insert("app");
    trie.insert("application");
    trie.insert("apply");

    expect(trie.search("apple")).toBe(true);
    expect(trie.search("app")).toBe(true);
    expect(trie.search("application")).toBe(true);
    expect(trie.search("apply")).toBe(true);
    expect(trie.search("appl")).toBe(false);

    expect(trie.startsWith("app")).toBe(true);
    expect(trie.startsWith("appl")).toBe(true);
    expect(trie.startsWith("apple")).toBe(true);
    expect(trie.startsWith("ap")).toBe(true);
    expect(trie.startsWith("b")).toBe(false);
  });

  it('should handle complex example from problem statement', () => {
    const trie = new Trie();
    const operations = [
      { name: "insert", args: ["apple"], expected: null },
      { name: "search", args: ["apple"], expected: true },
      { name: "search", args: ["app"], expected: false },
      { name: "startsWith", args: ["app"], expected: true },
      { name: "insert", args: ["app"], expected: null },
      { name: "search", args: ["app"], expected: true }
    ];

    operations.forEach(op => {
      if (op.name === "insert") {
        trie.insert(op.args[0]);
      } else if (op.name === "search") {
        expect(trie.search(op.args[0])).toBe(op.expected);
      } else if (op.name === "startsWith") {
        expect(trie.startsWith(op.args[0])).toBe(op.expected);
      }
    });
  });
});
