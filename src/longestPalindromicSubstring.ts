export function longestPalindromicSubstring(s: string): string {
  if (s.length == 1) {
    return s;
  }

  let start = 0;
  let maxLength = 0;

  function expand(left: number, right: number): void {
    while (left >= 0 && right < s.length && s[left] == s[right]) {

      const length = right - left + 1;

      if (length > maxLength) {
        maxLength = length;
        start = left;
      }

      left--;
      right++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }

  return s.substring(start, start + maxLength);
}


export function longestPalindromicSubstringDp(s: string): string {

  const n = s.length;
  let maxLength = 1;
  let start = 0;

  if (n === 1) {
    return s;
  }

  const dp: boolean[][] = Array.from({ length: n }, () => Array(n).fill(false));

  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
  }

  for (let i = 0; i < n - 1; i++) {
    if (s[i] === s[i+1]) {
      dp[i][i + 1] = true;
      start = i;
      maxLength = 2;
    }
  }

  for (let len = 3; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      if (dp[i+1][j-1] && s[i] === s[j]) {
        dp[i][j] = true;
        if (len > maxLength) {
          maxLength = len;
          start = i;
        }
      }
    }
  }

  return s.substring(start, start + maxLength);
}