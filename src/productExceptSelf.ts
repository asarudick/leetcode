export function productExceptSelf(nums: number[]): number[] {
  let prefix: Array<number> = Array<number>(nums.length).fill(0);
  let suffix: Array<number> = Array<number>(nums.length).fill(0);

  prefix[0] = nums[0];
  for (let i = 1; i < prefix.length; i++) {
    prefix[i] = nums[i] * prefix[i - 1]
  }

  suffix[nums.length - 1] = nums[nums.length - 1];
  for (let i = suffix.length - 2; i >= 0; i--) {
    suffix[i] = nums[i] * suffix[i + 1]
  }

  return nums.map((n, i) => {
    if (i === 0) {
      return suffix[i + 1];
    }
    if (i === nums.length - 1) {
      return prefix[i - 1];
    }
    return prefix[i - 1] * suffix[i + 1];
  })
};