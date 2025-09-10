
function toMatrix(rows: number, cols: number, fill?: any) {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => fill));
}

export function pacificAtlantic(heights: number[][]): number[][] {
  const rows = heights.length;
  if (!rows) return [];
  const cols = heights[0].length;

  const pacificQueue = [];
  const atlanticQueue = [];

  const pacific = toMatrix(rows, cols, false);
  const atlantic = toMatrix(rows, cols, false);

  for (let i = 0; i < rows; i++) {
    pacific[i][0] = true;
    pacificQueue.push([i, 0]);
    atlantic[i][cols - 1] = true;
    atlanticQueue.push([i, cols - 1]);
  }

  for (let i = 0; i < cols; i++) {
    pacific[0][i] = true;
    pacificQueue.push([0, i]);
    atlantic[rows - 1][i] = true;
    atlanticQueue.push([rows - 1, i]);
  }

  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  function bfs(queue: number[][], accessible: boolean[][]) {
    while (queue.length) {
      const [row, col] = queue.shift() as [number, number];
      for (const direction of directions) {
        const nextRow = row + direction[0];
        const nextCol = col + direction[1];
        if (nextRow < 0 || nextCol < 0 || nextRow >= rows || nextCol >= cols) continue;
        if (accessible[nextRow][nextCol]) continue;
        if (heights[nextRow][nextCol] >= heights[row][col]) {
          accessible[nextRow][nextCol] = true;
          queue.push([nextRow, nextCol]);
        }
      }
    }
  }

  bfs(pacificQueue, pacific);
  bfs(atlanticQueue, atlantic);

  const result = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (pacific[i][j] && atlantic[i][j]) result.push([i, j]);
    }
  }

  return result;
}