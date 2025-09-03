import { Trie, TrieNode } from "../lib/Trie";

export class WordDictionary {
  public trie: Trie;
  
  constructor() {
    this.trie = new Trie((s: string) => s.toLocaleLowerCase());
  }

  addWord(word: string) {
    this.trie.insert(word);
  }

  search(word: string) {
    const dfs = (i: number, node: TrieNode): boolean => {
      if (i === word.length) return node.endCount > 0;

      const char = word[i];

      if (char === '.') {
        for (const child of node.children.values()) {
          if (dfs(i+1, child)) return true;
        }
        return false;
      }
      else {
        const n = node.children.get(char);
        return n ? dfs(i+1, n) : false;
      }
    };

    return dfs(0, this.trie.root);
  }
}