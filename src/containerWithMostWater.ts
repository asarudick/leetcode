export function containerWithMostWater(height: number[]) {
  let [left, right] = [0, height.length - 1];
  let maxSoFar = 0;

  while (left < right) {
    maxSoFar = Math.max(maxSoFar, (right - left) * Math.min(height[left], height[right]));
    if (height[left] < height[right]) {
      left++;
      continue;
    }
    right--;
  }

  return maxSoFar;
}
