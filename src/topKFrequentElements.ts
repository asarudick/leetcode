import { MinHeap } from "../lib/MinHeap";

type Tuple = {
  val: number,
  freq: number
}

const Heap = MinHeap;

export function topKFrequentElements(nums: number[], k: number): number[] {
  const freqs = new Map<number, number>();
  
  for (const num of nums) {
   freqs.set(num, (freqs.get(num) ?? 0) + 1);
  }

  const heap = new Heap<Tuple>((a, b) => b.freq - a.freq);

  for (const freq of freqs) {
    heap.insert({val: freq[0], freq: freq[1]});
  }

  const result: Array<number> = [];
  
  for (let i = 0; i < k; i++) {
    result.push(heap.extractMin()!.val);
  }

  return result;
}
