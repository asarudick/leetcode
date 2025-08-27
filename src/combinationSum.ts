export function combinationSum(candidates: number[], target: number): number[][] {
  const result: number[][] = [];

  function recurse(current: Array<number>, index: number, total: number) {
    if (current.length && total === target) {
      result.push([...current]);
      return;
    } 
    if (index >= candidates.length) {
      return;
    }
    if (total > target) {
      return;
    }
    current.push(candidates[index]);
    recurse(current, index, total + candidates[index]);
    current.pop();
    recurse(current, index + 1, total);
  }

  recurse([], 0, 0);
  console.log({result});

  return result;
}
