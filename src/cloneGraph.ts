import { GraphNode } from "../lib/GraphNode";

export function cloneGraph(node: GraphNode<number> | null): GraphNode<number> | null {
  if(!node) {
    return null;
  }
  
  const cloned = new Map();

  function recurse(node: GraphNode<number>): GraphNode<number> | null {
    if (cloned.has(node.value)) {
      return cloned.get(node.value);
    }
    
    const clone = new GraphNode(node.value);

    cloned.set(clone.value, clone);

    for (const neighbor of node.neighbors) {
      const clonedNeighbor = recurse(neighbor);
      if (clonedNeighbor) {
        clone.addNeighbor(clonedNeighbor);
      }
    }

    return clone;
  }

  return recurse(node);
}
