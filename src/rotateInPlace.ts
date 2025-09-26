export function rotateInPlace(arr: number[], rotations: number) {
  if (arr.length <= 1) {
    return;
  }

  rotations = rotations % arr.length;

  if (rotations <= 0) {
    return;
  }

  arr.reverse();

  function swap(arr: number[], from: number, to: number) {
    const temp = arr[from];
    arr[from] = arr[to];
    arr[to] = temp;
  }

  function reverse(arr: number[], left: number, right: number) {
    while (left < right) {
      swap(arr, left, right);
      left++;
      right--;
    }
  }

  reverse(arr, 0, rotations - 1);
  reverse(arr, rotations, arr.length - 1);
}
