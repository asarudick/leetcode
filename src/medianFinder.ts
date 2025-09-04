import { MinHeap } from "../lib/MinHeap";
const Heap = MinHeap;

export class MedianFinder {
  public minHeap = new Heap<number>((a,b) => b - a);
  public maxHeap = new Heap<number>((a,b) => a - b);

  constructor() {

  }

  addNum(num: number): void {
    const min = this.maxHeap.peek();
    const max = this.minHeap.peek();

    if (min === null && max === null) {
      this.maxHeap.insert(num);
      return;
    }

    if (max !== null && num >= max!) {
      this.minHeap.insert(num);
      this.maxHeap.insert(this.minHeap.extractMin()!);
      return;
    }

    if (min !== null && num <= min!) {
      this.maxHeap.insert(num);
      this.minHeap.insert(this.maxHeap.extractMin()!);
      return;
    }
    
    this.maxHeap.insert(num);
    this.minHeap.insert(this.maxHeap.extractMin()!);
  }

  findMedian(): number {
    if (this.maxHeap.isEmpty() && this.minHeap.isEmpty()) {
      return 0;
    }

    if (this.maxHeap.size() > this.minHeap.size()) {
      return this.maxHeap.peek()!;
    }


    if (this.minHeap.size() > this.maxHeap.size()) {
      return this.minHeap.peek()!;
    }

    const min = this.maxHeap.peek()!;
    const max = this.minHeap.peek()!;

    return (min + max) / 2;
  }
}