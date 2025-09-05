import { topologicalSort } from '../src/topologicalSort';
import { describe, it, expect } from 'vitest';

describe('topologicalSort', () => {
  it('should handle an empty graph', () => {
    const nodes: string[] = [];
    const edges: [string, string][] = [];
    const result = topologicalSort(nodes, edges);
    expect(result).toEqual([]);
  });

  it('should handle a graph with a single node and no edges', () => {
    const nodes = ['A'];
    const edges: [string, string][] = [];
    const result = topologicalSort(nodes, edges);
    expect(result).toEqual(['A']);
  });

  it('should handle a graph with multiple nodes and no edges', () => {
    const nodes = ['A', 'B', 'C'];
    const edges: [string, string][] = [];
    const result = topologicalSort(nodes, edges);
    // The order of nodes with no dependencies can be arbitrary
    expect(result).toEqual(expect.arrayContaining(['A', 'B', 'C']));
    expect(result).toHaveLength(3);
  });

  it('should handle a simple linear graph', () => {
    const nodes = ['A', 'B', 'C'];
    const edges: [string, string][] = [['A', 'B'], ['B', 'C']];
    const result = topologicalSort(nodes, edges);
    expect(result).toEqual(['A', 'B', 'C']);
  });

  it('should handle a graph with multiple dependencies', () => {
    const nodes = ['A', 'B', 'C', 'D'];
    const edges: [string, string][] = [['A', 'C'], ['B', 'C'], ['C', 'D']];
    const result = topologicalSort(nodes, edges);
    expect(result).toEqual(expect.arrayContaining(['A', 'B', 'C', 'D']));
    expect(result).toHaveLength(4);
    expect(result.indexOf('C')).toBeGreaterThan(result.indexOf('A'));
    expect(result.indexOf('C')).toBeGreaterThan(result.indexOf('B'));
    expect(result.indexOf('D')).toBeGreaterThan(result.indexOf('C'));
  });

  it('should handle a graph with independent subgraphs', () => {
    const nodes = ['A', 'B', 'C', 'D'];
    const edges: [string, string][] = [['A', 'B'], ['C', 'D']];
    const result = topologicalSort(nodes, edges);
    expect(result).toEqual(expect.arrayContaining(['A', 'B', 'C', 'D']));
    expect(result).toHaveLength(4);
    expect(result.indexOf('B')).toBeGreaterThan(result.indexOf('A'));
    expect(result.indexOf('D')).toBeGreaterThan(result.indexOf('C'));
  });

  it('should handle a graph where some nodes have no dependencies', () => {
    const nodes = ['A', 'B', 'C', 'D'];
    const edges: [string, string][] = [['B', 'C'], ['B', 'D']];
    const result = topologicalSort(nodes, edges);
    expect(result).toEqual(expect.arrayContaining(['A', 'B', 'C', 'D']));
    expect(result).toHaveLength(4);
    expect(result.indexOf('C')).toBeGreaterThan(result.indexOf('B'));
    expect(result.indexOf('D')).toBeGreaterThan(result.indexOf('B'));
    // 'A' can appear anywhere since it has no dependencies
  });

  it('should handle a more complex graph', () => {
    const nodes = ['A', 'B', 'C', 'D', 'E', 'F'];
    const edges: [string, string][] = [
      ['A', 'B'],
      ['A', 'C'],
      ['B', 'D'],
      ['C', 'D'],
      ['D', 'E'],
      ['F', 'E']
    ];
    const result = topologicalSort(nodes, edges);
    expect(result).toEqual(expect.arrayContaining(['A', 'B', 'C', 'D', 'E', 'F']));
    expect(result).toHaveLength(6);
    expect(result.indexOf('B')).toBeGreaterThan(result.indexOf('A'));
    expect(result.indexOf('C')).toBeGreaterThan(result.indexOf('A'));
    expect(result.indexOf('D')).toBeGreaterThan(result.indexOf('B'));
    expect(result.indexOf('D')).toBeGreaterThan(result.indexOf('C'));
    expect(result.indexOf('E')).toBeGreaterThan(result.indexOf('D'));
    expect(result.indexOf('E')).toBeGreaterThan(result.indexOf('F'));
  });

  it('should handle nodes in edges but not in nodes', () => {
    const nodes = ['A', 'B'];
    const edges: [string, string][] = [['A', 'B'], ['B', 'C']];
    const result = topologicalSort(nodes, edges);
    expect(result).toEqual(expect.arrayContaining(['A', 'B', 'C']));
    expect(result).toHaveLength(3);
    expect(result.indexOf('B')).toBeGreaterThan(result.indexOf('A'));
    expect(result.indexOf('C')).toBeGreaterThan(result.indexOf('B'));
  });

  it('should throw an error when the graph has a cycle', () => {
    const nodes = ['A', 'B', 'C'];
    const edges: [string, string][] = [['A', 'B'], ['B', 'C'], ['C', 'A']];
    expect(() => topologicalSort(nodes, edges)).toThrow('Graph has a cycle. Topological sort not possible.');
  });

  it('should throw an error with a more complex cycle', () => {
    const nodes = ['A', 'B', 'C', 'D'];
    const edges: [string, string][] = [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'B']];
    expect(() => topologicalSort(nodes, edges)).toThrow('Graph has a cycle. Topological sort not possible.');
  });

  it('should handle a graph with different node types (numbers)', () => {
    const nodes = [1, 2, 3];
    const edges: [number, number][] = [[1, 2], [2, 3]];
    const result = topologicalSort(nodes, edges);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should handle a graph with different node types (objects)', () => {
    const nodeA = { id: 'A' };
    const nodeB = { id: 'B' };
    const nodeC = { id: 'C' };
    const nodes = [nodeA, nodeB, nodeC];
    const edges: [typeof nodeA, typeof nodeB][] = [[nodeA, nodeB], [nodeB, nodeC]];
    const result = topologicalSort(nodes, edges);
    expect(result).toEqual([nodeA, nodeB, nodeC]);
  });

  it('should handle a graph with duplicate edges', () => {
    const nodes = ['A', 'B', 'C'];
    const edges: [string, string][] = [['A', 'B'], ['B', 'C'], ['A', 'B']];
    const result = topologicalSort(nodes, edges);
    expect(result).toEqual(['A', 'B', 'C']);
  });
});
