export function twoSumSortedArray(nums: number[], target: number) {
  let [left, right] = [0, nums.length - 1];
  
  while (left < right) {
    // Skip dupes
    if (nums[left] === nums[left + 1] && (left + 1) < right) {
      left++;
      continue;
    }
    if (nums[right] === nums[right - 1] && (right - 1) > left) {
      right--;
      continue;
    }
    const sum = nums[left] + nums[right];

    if (sum === target) {
      return [nums[left], nums[right]];
    }

    if (sum > target) {
      right--;
      continue;
    }

    left++;
  }

  return [];
}
