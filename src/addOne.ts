export function addOne(num: number) {
  const arr = num.toString().split('').map(Number);

  // Add one, determine carry.
  const last = arr[arr.length - 1];
  arr[arr.length - 1] = (last + 1) % 10;
  let carry = last + 1 === 10;
  console.log(arr[arr.length - 1]);

  // Carry until no digit equates to 10 after addition.
  for (let i = arr.length - 2; i >= 0; i--) {
    if (!carry) {
      break;
    }

    const n = arr[i];
    arr[i] = (n + 1) % 10;
    carry = n + 1 === 10;
  }

  // Add new m sig digit if carry is true.
  if (carry) {
    arr.unshift(1);
  }
  
  return parseInt(arr.join(''), 10);
}
