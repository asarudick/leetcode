export class MinHeap<T> {
  private heap: T[];
  private compare: (a: T, b: T) => number;

  constructor(compareFn: (a: T, b: T) => number = (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }) {
    this.heap = [];
    this.compare = compareFn;
  }

  private parentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private leftChildIndex(index: number): number {
    return 2 * index + 1;
  }

  private rightChildIndex(index: number): number {
    return 2 * index + 2;
  }

  private swap(index1: number, index2: number): void {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  private heapifyUp(index: number): void {
    const parentIdx = this.parentIndex(index);
    if (parentIdx >= 0 && this.compare(this.heap[index], this.heap[parentIdx]) < 0) {
      this.swap(index, parentIdx);
      this.heapifyUp(parentIdx);
    }
  }

  private heapifyDown(index: number): void {
    const leftChildIdx = this.leftChildIndex(index);
    const rightChildIdx = this.rightChildIndex(index);
    let smallest = index;

    if (leftChildIdx < this.size() && this.compare(this.heap[leftChildIdx], this.heap[smallest]) < 0) {
      smallest = leftChildIdx;
    }

    if (rightChildIdx < this.size() && this.compare(this.heap[rightChildIdx], this.heap[smallest]) < 0) {
      smallest = rightChildIdx;
    }

    if (smallest !== index) {
      this.swap(index, smallest);
      this.heapifyDown(smallest);
    }
  }

  insert(value: T): void {
    this.heap.push(value);
    this.heapifyUp(this.size() - 1);
  }

  extractMin(): T | null {
    if (this.isEmpty()) return null;
    
    const min = this.heap[0];
    const last = this.heap.pop()!;
    
    if (!this.isEmpty()) {
      this.heap[0] = last;
      this.heapifyDown(0);
    }
    
    return min;
  }

  peek(): T | null {
    return this.isEmpty() ? null : this.heap[0];
  }

  size(): number {
    return this.heap.length;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  getHeap(): T[] {
    return [...this.heap];
  }
}