import { mergeTwoSortedLists } from '../src/mergeTwoSortedLists';
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

describe('mergeTwoSortedLists', () => {
  it('should merge two sorted lists - Example 1', () => {
    const list1 = createList([1, 2, 4]);
    const list2 = createList([1, 3, 4]);
    const merged = mergeTwoSortedLists(list1, list2);
    expect(listToArray(merged)).toEqual([1, 1, 2, 3, 4, 4]);
  });

  it('should merge two empty lists - Example 2', () => {
    const list1 = createList([]);
    const list2 = createList([]);
    const merged = mergeTwoSortedLists(list1, list2);
    expect(listToArray(merged)).toEqual([]);
  });

  it('should merge empty list with non-empty list - Example 3', () => {
    const list1 = createList([]);
    const list2 = createList([0]);
    const merged = mergeTwoSortedLists(list1, list2);
    expect(listToArray(merged)).toEqual([0]);
  });

  it('should merge lists with negative numbers', () => {
    const list1 = createList([-5, -3, 0]);
    const list2 = createList([-10, -2, 5]);
    const merged = mergeTwoSortedLists(list1, list2);
    expect(listToArray(merged)).toEqual([-10, -5, -3, -2, 0, 5]);
  });

  it('should merge lists with one element each', () => {
    const list1 = createList([1]);
    const list2 = createList([2]);
    const merged = mergeTwoSortedLists(list1, list2);
    expect(listToArray(merged)).toEqual([1, 2]);
  });

  it('should merge when list1 is longer than list2', () => {
    const list1 = createList([1, 3, 5, 7]);
    const list2 = createList([2, 4]);
    const merged = mergeTwoSortedLists(list1, list2);
    expect(listToArray(merged)).toEqual([1, 2, 3, 4, 5, 7]);
  });

  it('should merge when list2 is longer than list1', () => {
    const list1 = createList([1, 3]);
    const list2 = createList([2, 4, 6, 8]);
    const merged = mergeTwoSortedLists(list1, list2);
    expect(listToArray(merged)).toEqual([1, 2, 3, 4, 6, 8]);
  });
});
