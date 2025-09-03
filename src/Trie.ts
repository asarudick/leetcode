import { appendFileSync } from "fs";

export class TrieNode {
  public value: string | null;
  public children: Map<string, TrieNode>;
  public endCount: number;

  constructor(value?: string) {
    this.value = value ?? null;
    this.children = new Map<string, TrieNode>();
    this.endCount = 0;
  }

  isLeafNode(): boolean {
    return this.children.size === 0;
  }
}

export class Trie {
  public root: TrieNode;
  constructor() {
    this.root = new TrieNode();
  }
  
  private getNode(s: string): TrieNode | null {
    let node = this.root;
    for (const ch of s) {
      const next = node.children.get(ch);
      if (!next) return null;
      node = next;
    }
    return node;
  }

  insert(word: string): void {
    if (!word.length) return;
    let node = this.root;
    for (let c of word) {
      if (!node.children.has(c)) {
        const next = new TrieNode();
        node.children.set(c, next);
      }
      
      node = node.children.get(c)!;
    }
    node.endCount++;
  }

  search(word: string): boolean {
    const node = this.getNode(word);
    return !!node && node.endCount > 0;
  }

  startsWith(prefix: string): boolean {
    return !!this.getNode(prefix);
  }
}