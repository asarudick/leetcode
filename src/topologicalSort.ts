export type Edge<T> = [T, T];

export function topologicalSort<T>(nodes: Iterable<T>, edges: Iterable<Edge<T>>): Array<T> {
  const adj = new Map<T, T[]>();
  const indegree = new Map<T, number>();

  for (const node of nodes) {
    adj.set(node, []);
    indegree.set(node, 0);
  }

  for (const [u,v] of edges) {
    // In case there are nodes in edges but not in nodes.
    if (!adj.has(u)) adj.set(u, []) && indegree.set(u, 0);
    if (!adj.has(v)) adj.set(v, []) && indegree.set(v, 0);

    // Get current node, add edge.
    adj.get(u!)?.push(v);

    // Increment in-degree for target node.
    indegree.set(v, (indegree.get(v) ?? 0) + 1);
  }
  const queue: Array<T> = [];

  for (const [u, v] of indegree) {
    if (v === 0) queue.push(u);
  }

  const result = [];

  while (queue.length) {
    const current = queue.shift();
    result.push(current!);

    for (const u of adj.get(current!)!) {
      const degree = (indegree.get(u) ?? 0) - 1;
      indegree.set(u, degree);
      if (degree === 0) queue.push(u);
    }
  }

  if (result.length !== adj.size) {
    throw new Error('Graph has a cycle. Topological sort not possible.');
  }
  return result;
}
