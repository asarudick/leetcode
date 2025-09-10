export function rotateImage(matrix: number[][]): void {
  const length = matrix.length;

  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  for (let i = 0; i < length; i++) {
    matrix[i].reverse();
  }
}
