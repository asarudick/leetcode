
function printArray(left: number, right: number, nums: number[], target: number) {
  console.log({
    left,
    right,
    nums: nums.slice(left, right + 1),
    target
  });
}

export function searchInSortedArray(nums: number[], target: number): number {
  if (!nums.length) return -1;

  function recurse(left: number, right: number, nums: number[], target: number): any {
    if (left > right) return -1;
    if (left === right) return nums[left] === target ? left : -1;
    const middle = Math.floor((right + left) / 2);
    
    if (nums[middle] === target) return middle;

    // Find sorted set.
    let leftIsSorted = false;
    let rightIsSorted = false;

    if (nums[middle - 1] >= nums[left]) {
      leftIsSorted = true;
    }

    if (leftIsSorted) {
      if (target <= nums[middle - 1] && target >= nums[left]) {
        // go left
        return recurse(left, middle - 1, nums, target);
      }
      
      // go right
      return recurse(middle + 1, right, nums, target);
    }
    
    if (nums[middle + 1] <= nums[right]) {
      rightIsSorted = true;
    }

    if (rightIsSorted) {
      if (target <= nums[right] && target >= nums[middle + 1]) {
        // go right
        return recurse(middle + 1, right, nums, target);
      }
      // go left
      return recurse(left, middle - 1, nums, target);
    }

  }

  const result = recurse(0, nums.length - 1, nums, target);

  return result;
}
