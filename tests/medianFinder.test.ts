import { MedianFinder } from '../src/medianFinder';
import { describe, it, expect } from 'vitest';

describe('MedianFinder', () => {
  it('should find the median correctly', () => {
    const medianFinder = new MedianFinder();
    medianFinder.addNum(1);
    medianFinder.addNum(2);
    expect(medianFinder.findMedian()).toBe(1.5);
    medianFinder.addNum(3);
    expect(medianFinder.findMedian()).toBe(2.0);
  });

  it('should handle single number', () => {
    const medianFinder = new MedianFinder();
    medianFinder.addNum(5);
    expect(medianFinder.findMedian()).toBe(5);
  });

  it('should handle multiple numbers with even count', () => {
    const medianFinder = new MedianFinder();
    medianFinder.addNum(6);
    medianFinder.addNum(10);
    medianFinder.addNum(2);
    medianFinder.addNum(6);
    expect(medianFinder.findMedian()).toBe(6);
  });

  it('should handle multiple numbers with odd count', () => {
    const medianFinder = new MedianFinder();
    medianFinder.addNum(6);
    medianFinder.addNum(10);
    medianFinder.addNum(2);
    medianFinder.addNum(6);
    medianFinder.addNum(1);
    expect(medianFinder.findMedian()).toBe(6);
  });

  it('should handle negative numbers', () => {
    const medianFinder = new MedianFinder();
    medianFinder.addNum(-1);
    medianFinder.addNum(-2);
    medianFinder.addNum(-3);
    expect(medianFinder.findMedian()).toBe(-2);
  });

  it('should handle mixed positive and negative numbers', () => {
    const medianFinder = new MedianFinder();
    medianFinder.addNum(-1);
    medianFinder.addNum(2);
    medianFinder.addNum(-3);
    medianFinder.addNum(4);
    expect(medianFinder.findMedian()).toBe(0.5);
  });
});
