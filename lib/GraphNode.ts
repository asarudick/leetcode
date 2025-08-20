export class GraphNode<T> {
  value: T;
  neighbors: GraphNode<T>[];

  constructor(value: T) {
    this.value = value;
    this.neighbors = [];
  }

  addNeighbor(neighbor: GraphNode<T>): void {
    this.neighbors.push(neighbor);
  }

  removeNeighbor(neighbor: GraphNode<T>): void {
    const index = this.neighbors.indexOf(neighbor);
    if (index > -1) {
      this.neighbors.splice(index, 1);
    }
  }

  getNeighbors(): GraphNode<T>[] {
    return this.neighbors;
  }

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}