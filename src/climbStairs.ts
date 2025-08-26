const memo = new Map<number, number>();
export function climbStairs(n: number): number {
  if (n <= 2) return n;

  if (memo.has(n)) return memo.get(n) as number;
  
  const oneStep = climbStairs(n - 1);
  const twoStep = climbStairs(n - 2);

  memo.set(n, oneStep + twoStep);
  
  return oneStep + twoStep;
}
