// Merge sorted arrays, in-place. `i` refers to the last valid element in nums1, and nums1 has 
// space for valid elements in both arrays. 
export function mergeSortedArraysInPlace(nums1: number[], n: number, nums2: number[], m: number) {
  let i = n - 1;
  let j = m - 1;
  // Last element in nums1.
  let k = n + m - 1;

  while (j >= 0 && i >= 0) {
    if (nums1[i] < nums2[j]) {
      nums1[k] = nums2[j];
      j--;
    }
    else {
      nums1[k] = nums1[i];
      i--;
    }

    k--;
  }

  while (j >= 0) {
    nums1[k] = nums2[j];
    j--;
    k--;
  }

  return nums1;
}
