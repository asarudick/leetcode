import { cloneGraph } from '../src/cloneGraph';
import { GraphNode } from '../lib/GraphNode';
import { describe, it, expect } from 'vitest';

describe('cloneGraph', () => {
  it('should clone a graph with a single node', () => {
    const node1 = new GraphNode(1);
    const clonedNode = cloneGraph(node1);
    expect(clonedNode).not.toBeNull();
    expect(clonedNode!.value).toBe(1);
    expect(clonedNode!.neighbors.length).toBe(0);
  });

  it('should clone a graph with multiple nodes', () => {
    const node1 = new GraphNode(1);
    const node2 = new GraphNode(2);
    const node3 = new GraphNode(3);

    node1.addNeighbor(node2);
    node1.addNeighbor(node3);
    node2.addNeighbor(node1);
    node2.addNeighbor(node3);
    node3.addNeighbor(node1);
    node3.addNeighbor(node2);

    const clonedNode1 = cloneGraph(node1);
    expect(clonedNode1).not.toBeNull();
    expect(clonedNode1!.value).toBe(1);

    const clonedNode2 = clonedNode1!.neighbors.find(n => n.value === 2);
    const clonedNode3 = clonedNode1!.neighbors.find(n => n.value === 3);

    expect(clonedNode2).not.toBeNull();
    expect(clonedNode3).not.toBeNull();
    expect(clonedNode1!.neighbors.length).toBe(2);

    // Check if neighbors of clonedNode2 are correct
    const clonedNode2Neighbor1 = clonedNode2!.neighbors.find(n => n.value === 1);
    const clonedNode2Neighbor3 = clonedNode2!.neighbors.find(n => n.value === 3);
    expect(clonedNode2Neighbor1).not.toBeNull();
    expect(clonedNode2Neighbor3).not.toBeNull();
    expect(clonedNode2!.neighbors.length).toBe(2);

    // Check if neighbors of clonedNode3 are correct
    const clonedNode3Neighbor1 = clonedNode3!.neighbors.find(n => n.value === 1);
    const clonedNode3Neighbor2 = clonedNode3!.neighbors.find(n => n.value === 2);
    expect(clonedNode3Neighbor1).not.toBeNull();
    expect(clonedNode3Neighbor2).not.toBeNull();
    expect(clonedNode3!.neighbors.length).toBe(2);
  });

  it('should return null for null input', () => {
    expect(cloneGraph(null)).toBeNull();
  });

  it('should clone a graph with a linear structure', () => {
    const node1 = new GraphNode(1);
    const node2 = new GraphNode(2);
    const node3 = new GraphNode(3);

    node1.addNeighbor(node2);
    node2.addNeighbor(node1);
    node2.addNeighbor(node3);
    node3.addNeighbor(node2);

    const clonedNode1 = cloneGraph(node1);
    expect(clonedNode1).not.toBeNull();
    expect(clonedNode1!.value).toBe(1);

    const clonedNode2 = clonedNode1!.neighbors.find(n => n.value === 2);
    expect(clonedNode2).not.toBeNull();
    expect(clonedNode1!.neighbors.length).toBe(1);

    const clonedNode3 = clonedNode2!.neighbors.find(n => n.value === 3);
    expect(clonedNode3).not.toBeNull();
    expect(clonedNode2!.neighbors.length).toBe(2); // node1 and node3

    const clonedNode3Neighbor2 = clonedNode3!.neighbors.find(n => n.value === 2);
    expect(clonedNode3Neighbor2).not.toBeNull();
    expect(clonedNode3!.neighbors.length).toBe(1);
  });
});
