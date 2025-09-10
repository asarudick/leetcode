function toMatrix<T>(rows: number, cols: number, init: T): T[][] {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => init))
}
export function numIslands(grid: number[][]): number {
  if (!grid) return 0;
  const rows = grid.length;
  if (!rows) return 0;
  
  const cols = grid[0].length;
  
  const visited = toMatrix(rows, cols, false);
  let islands = 0;
  
  function mark(row: number, col: number) {
    const directions = [[0,1], [1,0], [0, -1], [-1, 0]];
    if (grid[row][col] === 0) return;

    function recurse(row: number, col: number) {
      if (row < 0 || row >= rows || col < 0 || col >= cols) return;
      if (visited[row][col]) return;
      if (grid[row][col] === 0) return;

      visited[row][col] = true;

      for (const direction of directions) {
        const nextRow = row + direction[0];
        const nextCol = col + direction[1];
        recurse(nextRow, nextCol);
      }
    }

    return recurse(row,col);
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 0 || visited[i][j]) continue;
      islands++;
      mark(i, j);
    }
  }

  return islands;
}
