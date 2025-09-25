export function validSudoku(board: (number | null)[][]) {
  const seenRows = Array.from({ length: 9 }, () => new Set());
  const seenColumns = Array.from({ length: 9 }, () => new Set());
  const seenBoxes = Array.from({ length: 9 }, () => new Set());

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const ch = board[i][j];
      if (ch === null) {
        continue;
      }

      const boxIndex = ((i / 3) | 0) * 3 + ((j / 3) | 0);
      console.log(boxIndex);

      if (seenRows[i].has(ch) || seenColumns[j].has(ch) || seenBoxes[boxIndex].has(ch)) {
        return false;
      }

      seenRows[i].add(ch);
      seenColumns[j].add(ch);
      seenBoxes[boxIndex].add(ch);
    }
  } 

  return true;
}
