const getAlphabetIndex = (char: string) => {
  return char.charCodeAt(0) - "a".charCodeAt(0);
};

export default function lengthOfLongestSubstring(s: string): number {
  let max = 0;
  const seen = Array(26).fill(false);

  let left = 0;
  let right = 0;

  while (right < s.length) {
    while (seen[getAlphabetIndex(s.charAt(right))]) {
      seen[getAlphabetIndex(s.charAt(left))] = false;
      left++;
    }
    seen[getAlphabetIndex(s.charAt(right))] = true;
    max = Math.max(max, right - left + 1);
    right++;
  }

  return max;
};

// "abcabcbb"