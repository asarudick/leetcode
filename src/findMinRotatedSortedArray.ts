function printArray(left: number, right: number, nums: number[]) {
  console.log("left:", left, "right:", right, nums.slice(left, right + 1));
}

export function findMinRotatedSortedArray(nums: number[]): number {
  if (!nums.length) return -1;

  function recurse(left: number, right: number, nums: number[]): number {
    printArray(left, right, nums);
    if (left === right) return left;
    if (left + 1 === right) return nums[left] < nums[right] ? left : right;
    let middle = Math.floor(((right - left) / 2) + left);

    // If the right most of the right segment is greater than the middle, there's 
    // no possible scenario where the minimum is in the segment. 
    if (nums[right] > nums[middle]) {
      return recurse(left, middle, nums);
    }

    return recurse(middle, right, nums);
  }

  const result = recurse(0, nums.length - 1, nums);
  console.log(result);
  return nums[result];
}

// [3,4,5,1,2]
// [1,2,3,4,5]
// [5,1,2,3,4]
// [2,3,4,5,1]