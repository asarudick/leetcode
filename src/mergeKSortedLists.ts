import { ListNode } from '../lib/ListNode';
import { MinHeap } from '../lib/MinHeap';

export function mergeKSortedLists(lists: Array<ListNode<number> | null>): ListNode<number> | null {

    if (!lists) {
        return null;
    }
    
    const heap = new MinHeap<number>();

    function addListToHeap(heap: MinHeap<number>, head: ListNode<number> | null) {
        while (head) {
            heap.insert(head.value);
            head = head.next;
        }
    }

    function addListsToHeap(heap: MinHeap<number>, lists: Array<ListNode<number> | null>) {
        lists.forEach((head: ListNode<number> | null) => {
            addListToHeap(heap, head);
        });
    }

    addListsToHeap(heap, lists);

    let result = new ListNode<number>(0);
    let head = result;

    while (!heap.isEmpty()) {
        result.next = new ListNode(heap.extractMin() as number);
        result = result.next;
    }

    return head.next;
}
