export default function twoSum(nums: number[], target: number): number[] {
  const cache: {[key: number]: number} = {};

  for (let i = 0; i < nums.length; i++) {
    cache[nums[i]] = i;
  }

  for (let i = 0; i < nums.length; i++) {
    const element = nums[i];
    const complimentIndex = cache[target - element];
    if (complimentIndex === i) continue;
    if (complimentIndex !== undefined) {
      return [i, complimentIndex];
    }
  }

  return [];
};