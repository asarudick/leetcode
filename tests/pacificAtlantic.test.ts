import { pacificAtlantic } from '../src/pacificAtlantic';
import { describe, it, expect } from 'vitest';

describe('pacificAtlantic', () => {
  it('should return coordinates that can flow to both oceans for example 1', () => {
    const heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]];
    const expected = [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]];
    expect(pacificAtlantic(heights)).toEqual(expected);
  });

  it('should return coordinates for single cell example', () => {
    const heights = [[1]];
    const expected = [[0,0]];
    expect(pacificAtlantic(heights)).toEqual(expected);
  });

  it('should handle single cell with height 0', () => {
    const heights = [[0]];
    const expected = [[0,0]];
    expect(pacificAtlantic(heights)).toEqual(expected);
  });

  it('should handle 1x3 gridh', () => {
    const heights = [[1,2,3]];
    const expected = [[0,0],[0,1],[0,2]];
    expect(pacificAtlantic(heights)).toEqual(expected);
  });

  it('should handle all equal heights in 1x3, all reach both', () => {
    const heights = [[2,2,2]];
    const expected = [[0,0],[0,1],[0,2]];
    expect(pacificAtlantic(heights)).toEqual(expected);
  });

  it('should handle 3x1 grid, all reach both if equal', () => {
    const heights = [[2],[2],[2]];
    const expected = [[0,0],[1,0],[2,0]];
    expect(pacificAtlantic(heights)).toEqual(expected);
  });

  it('should handle larger grid with multiple paths', () => {
    const heights = [[1,2],[2,1]];
    // [0,0] to Pacific, to [0,1] 2>1 no, to [1,0] 2>1 no.
    // Wait, [0,0]=1 Pacific, cannot to Atlantic.
    // [0,1]=2 to Pacific? Top edge yes, to Atlantic right yes.
    // [1,0]=2 to Pacific left yes, to Atlantic bottom yes.
    // [1,1]=1 to Atlantic bottom and right, to Pacific? to [0,1]=2>1 no, to [1,0]=2>1 no.
    const expected = [[0,1],[1,0]];
    expect(pacificAtlantic(heights)).toEqual(expected);
  });
});