import { mergeKSortedLists } from '../src/mergeKSortedLists';
import { ListNode } from '../lib/ListNode';
import { describe, it, expect } from 'vitest';

function createList(values: number[]): ListNode<number> | null {
  if (values.length === 0) return null;
  const head = new ListNode(values[0]);
  let current = head;
  for (let i = 1; i < values.length; i++) {
    current.next = new ListNode(values[i]);
    current = current.next;
  }
  return head;
}

function listToArray(head: ListNode<number> | null): number[] {
  const result: number[] = [];
  let current = head;
  while (current) {
    result.push(current.value);
    current = current.next;
  }
  return result;
}

describe('mergeKSortedLists', () => {
  it('should merge k sorted lists - Example 1', () => {
    const lists = [
      createList([1, 4, 5]),
      createList([1, 3, 4]),
      createList([2, 6])
    ];
    const merged = mergeKSortedLists(lists);
    expect(listToArray(merged)).toEqual([1, 1, 2, 3, 4, 4, 5, 6]);
  });

  it('should handle empty lists array', () => {
    const lists: Array<ListNode<number> | null> = [];
    const merged = mergeKSortedLists(lists);
    expect(listToArray(merged)).toEqual([]);
  });

  it('should handle array with all empty lists', () => {
    const lists = [createList([]), createList([]), createList([])];
    const merged = mergeKSortedLists(lists);
    expect(listToArray(merged)).toEqual([]);
  });

  it('should handle array with some empty lists', () => {
    const lists = [createList([1, 2]), createList([]), createList([3, 4])];
    const merged = mergeKSortedLists(lists);
    expect(listToArray(merged)).toEqual([1, 2, 3, 4]);
  });

  it('should handle single list', () => {
    const lists = [createList([1, 3, 5])];
    const merged = mergeKSortedLists(lists);
    expect(listToArray(merged)).toEqual([1, 3, 5]);
  });

  it('should handle lists with negative numbers', () => {
    const lists = [
      createList([-5, -2, 0]),
      createList([-10, -1, 3]),
      createList([-8, -3])
    ];
    const merged = mergeKSortedLists(lists);
    expect(listToArray(merged)).toEqual([-10, -8, -5, -3, -2, -1, 0, 3]);
  });

  it('should handle lists with duplicate values', () => {
    const lists = [
      createList([1, 1, 3]),
      createList([1, 2, 4]),
      createList([2, 3])
    ];
    const merged = mergeKSortedLists(lists);
    expect(listToArray(merged)).toEqual([1, 1, 1, 2, 2, 3, 3, 4]);
  });

  it('should handle lists with one element each', () => {
    const lists = [
      createList([5]),
      createList([2]),
      createList([8]),
      createList([1])
    ];
    const merged = mergeKSortedLists(lists);
    expect(listToArray(merged)).toEqual([1, 2, 5, 8]);
  });

  it('should handle null input', () => {
    const merged = mergeKSortedLists(null as any);
    expect(merged).toBeNull();
  });
});