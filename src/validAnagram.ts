export function validAnagram(s: string, t: string): boolean {
  if (!s.length || !t.length) {
    return false;
  }

  const str = s.concat(t);
  const set = new Map<string, number>();

  for (let char of str) {
    if (char === " ") {
      continue;
    }
    set.set(char, (set.get(char) ?? 0) + 1);
  }

  for (let entry of set.values()) {
    if (entry % 2 == 1) {
      return false;
    }
  }
  return true;
}
