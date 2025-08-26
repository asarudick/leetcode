export function twoSum(numbers: number[], target: number): number[] {
  let [left, right] = [0, numbers.length - 1];

  while (left < right) {
    const search = target - numbers[right];
    
    if (numbers[left] === search) {
      return [left, right];
    }

    if (numbers[left] < search) {
      left++;
      continue;
    }

    right--;
  }

  return [-1, -1];
};