import { ListNode } from '../lib/ListNode';

export function mergeTwoSortedLists(list1: ListNode<number> | null, list2: ListNode<number> | null): ListNode<number> | null {
  let [top, bottom] = [list1, list2];
  let result = new ListNode<number>(0);
  let sentinel = new ListNode<number>(0);
  sentinel.next = result;

  while (top || bottom) {
    if (top && bottom) {
      if (top.value <= bottom.value) {
        result.next = top;
        top = top.next;
      }
      else {
        result.next = bottom;
        bottom = bottom.next;
      }
      result = result.next;
      continue;
    }

    while (top) {
      result.next = top;
      top = top.next;
      result = result.next;
    }

    while (bottom) {
      result.next = bottom;
      bottom = bottom.next;
      result = result.next;
    }
  }

  return sentinel.next.next;
}
