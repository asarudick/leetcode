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
  public normalizer: (s: string) => string = (s: string) => s;
  constructor(normalizer: (s: string) => string) {
    this.root = new TrieNode();
    this.normalizer = normalizer;
  }
  
  getNode(s: string): TrieNode | null {
    const w = this.normalizer(s);
    let node = this.root;
    for (const ch of w) {
      const next = node.children.get(ch);
      if (!next) return null;
      node = next;
    }
    return node;
  }

  insert(word: string): void {
    if (!word.length) return;
    const w = this.normalizer(word);
    let node = this.root;
    for (let c of w) {
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