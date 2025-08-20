export function lengthOfLongestSubstring(s: string): number {
  let maxLength = 1;
  
  if (s.length < 2) {
    return s.length;
  }
  
  const seen = new Set();
  let i = 0;
  while (i < s.length) {
    let j = i;
    while (!seen.has(s[j]) && j < s.length) {
      seen.add(s[j]);
      j++;
    }

    maxLength = Math.max(seen.size, maxLength);
    seen.clear();
    i++;
  }

  return maxLength;
}
