import { MinHeap } from '../lib/MinHeap';
import { describe, it, expect } from 'vitest';

describe('MinHeap', () => {
  it('should initialize an empty heap', () => {
    const heap = new MinHeap<number>();
    expect(heap.size()).toBe(0);
    expect(heap.isEmpty()).toBe(true);
    expect(heap.peek()).toBeNull();
  });

  it('should insert elements and maintain heap property', () => {
    const heap = new MinHeap<number>();
    heap.insert(5);
    heap.insert(3);
    heap.insert(8);
    heap.insert(1);
    heap.insert(2);

    expect(heap.size()).toBe(5);
    expect(heap.peek()).toBe(1);
  });

  it('should extract minimum elements correctly', () => {
    const heap = new MinHeap<number>();
    heap.insert(5);
    heap.insert(3);
    heap.insert(8);
    heap.insert(1);
    heap.insert(2);

    expect(heap.extractMin()).toBe(1);
    expect(heap.extractMin()).toBe(2);
    expect(heap.extractMin()).toBe(3);
    expect(heap.extractMin()).toBe(5);
    expect(heap.extractMin()).toBe(8);
    expect(heap.extractMin()).toBeNull();
  });

  it('should peek at the minimum element without extracting', () => {
    const heap = new MinHeap<number>();
    heap.insert(5);
    heap.insert(3);
    heap.insert(8);

    expect(heap.peek()).toBe(3);
    expect(heap.size()).toBe(3);
    expect(heap.extractMin()).toBe(3);
    expect(heap.peek()).toBe(5);
  });

  it('should handle extracting from an empty heap', () => {
    const heap = new MinHeap<number>();
    expect(heap.extractMin()).toBeNull();
  });

  it('should maintain heap property with duplicate values', () => {
    const heap = new MinHeap<number>();
    heap.insert(3);
    heap.insert(1);
    heap.insert(3);
    heap.insert(1);
    heap.insert(2);

    expect(heap.extractMin()).toBe(1);
    expect(heap.extractMin()).toBe(1);
    expect(heap.extractMin()).toBe(2);
    expect(heap.extractMin()).toBe(3);
    expect(heap.extractMin()).toBe(3);
  });

  it('should work with custom comparison function', () => {
    const heap = new MinHeap<{ value: number }>((a, b) => {
      if (a.value < b.value) return -1;
      if (a.value > b.value) return 1;
      return 0;
    });

    heap.insert({ value: 5 });
    heap.insert({ value: 3 });
    heap.insert({ value: 8 });
    heap.insert({ value: 1 });

    expect(heap.extractMin()?.value).toBe(1);
    expect(heap.extractMin()?.value).toBe(3);
    expect(heap.extractMin()?.value).toBe(5);
    expect(heap.extractMin()?.value).toBe(8);
  });

  it('should handle a large number of elements', () => {
    const heap = new MinHeap<number>();
    for (let i = 100; i >= 1; i--) {
      heap.insert(i);
    }

    expect(heap.size()).toBe(100);
    for (let i = 1; i <= 100; i++) {
      expect(heap.extractMin()).toBe(i);
    }
    expect(heap.isEmpty()).toBe(true);
  });

  it('should return the heap array', () => {
    const heap = new MinHeap<number>();
    heap.insert(5);
    heap.insert(3);
    heap.insert(8);

    const heapArray = heap.getHeap();
    expect(heapArray.length).toBe(3);
    expect(heapArray).toContain(3);
    expect(heapArray).toContain(5);
    expect(heapArray).toContain(8);
    // Note: The heap array is not necessarily sorted
  });
});