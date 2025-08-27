
export function combinationSumII(candidates: number[], target: number): number[][] {
  const result: number[][] = [];
  candidates.sort((a,b) => a - b);

  const path: number[] = [];
  
  function dfs(start: number, remain: number) {
    if (path.length && remain === 0) {
      result.push([...path]);
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      const candidate = candidates[i];

      if (i > start && candidate === candidates[i - 1]) continue;

      if (candidate > remain) break;

      path.push(candidate);
      dfs(i+1, remain - candidate);
      path.pop();
    }
  }
  
  dfs(0, target);
  console.log({result});
  return result;
}
