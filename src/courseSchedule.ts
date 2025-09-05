import { topologicalSort, Edge } from "./topologicalSort";


export function courseSchedule(numCourses: number, prerequisites: number[][]): boolean {
  const nodes = new Set<number>();

  for (const pre of prerequisites) {
    for (const node of pre) {
      nodes.add(node);
    }
  }

  let result;
  const prereqs = prerequisites.map(a => a.reverse());
  try {
    result = topologicalSort(nodes, (prereqs as Edge<number>[]));
  }
  catch (e: any) {
    return false;
  }

  return result.length <= numCourses;
}
