import { topKFrequentElements } from '../src/topKFrequentElements';
import { describe, it, expect } from 'vitest';

describe('topKFrequentElements', () => {
  it('should return the k most frequent elements', () => {
    const nums1 = [1,1,1,2,2,3];
    const k1 = 2;
    expect(topKFrequentElements(nums1, k1)).toEqual([1,2]);

    const nums2 = [1];
    const k2 = 1;
    expect(topKFrequentElements(nums2, k2)).toEqual([1]);

    const nums3 = [1,2,1,2,1,2,3,1,3,2];
    const k3 = 2;
    expect(topKFrequentElements(nums3, k3)).toEqual([1,2]);
  });
});
