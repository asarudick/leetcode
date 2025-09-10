import { numIslands } from '../src/numIslands';
import { describe, it, expect } from 'vitest';

describe('numIslands', () => {
  it('example 1', () => {
    const grid = [[1,1,1,1,0],[1,1,0,1,0],[1,1,0,0,0],[0,0,0,0,0]];
    expect(numIslands(grid)).toBe(1);
  });

  it('example 2', () => {
    const grid = [[1,1,0,0,0],[1,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1]];
    expect(numIslands(grid)).toBe(3);
  });

  it('single land', () => {
    const grid = [[1]];
    expect(numIslands(grid)).toBe(1);
  });

  it('single water', () => {
    const grid = [[0]];
    expect(numIslands(grid)).toBe(0);
  });

  it('empty grid', () => {
    const grid: number[][] = [];
    expect(numIslands(grid)).toBe(0);
  });

  it('all water', () => {
    const grid = [[0,0],[0,0]];
    expect(numIslands(grid)).toBe(0);
  });

  it('all land', () => {
    const grid = [[1,1],[1,1]];
    expect(numIslands(grid)).toBe(1);
  });

  it('diagonal not connected', () => {
    const grid = [[1,0],[0,1]];
    expect(numIslands(grid)).toBe(2);
  });
});