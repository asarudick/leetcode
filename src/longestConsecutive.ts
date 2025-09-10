export function longestConsecutive(nums: number[]): number {
  const set = new Set(nums);

  let maxSoFar = 0;

  for (const num of set) {
    if (!set.has(num - 1)) {
      let min = num;
      while (set.has(min)) min++;
      maxSoFar = Math.max(maxSoFar, min - num);
    }
  }

  return maxSoFar;
}