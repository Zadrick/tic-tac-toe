export interface ILinkedListNode<T> {
  data: T;
  next: ILinkedListNode<T> | null;
}

export interface ILinkedList<T> {
  head: ILinkedListNode<T>;
  tail: ILinkedListNode<T>

  append(value: T): void;
}

export class LinkedListNode<T> implements ILinkedListNode<T> {
  data: T;
  next: ILinkedListNode<T> | null = null;

  constructor(data: LinkedListNode<T>['data'], next?: any) {
    this.data = data;

    if (next !== undefined) this.next = new LinkedListNode(next);
  }
}

export default class LinkedList<T> implements ILinkedList<T> {
  head: ILinkedListNode<T>;
  tail: ILinkedListNode<T>;

  constructor(array: any[]) {
    if (!array.length) throw new Error('array should contain at least one element');

    this.head = LinkedList.arrayToNodes<T>(array[0]);
    this.tail = LinkedList.arrayToNodes<T>(array.length > 1 ? array.slice(1, 1): array);
    this.head.next = this.tail;

    for (const element of array.slice(2)) this.append(element);
  }

  append(value: T): void {
    this.tail.next = new LinkedListNode(value);
    this.tail = this.tail.next;
  }

  static arrayToNodes<T = any>(array: T[]) {
    const head = new LinkedListNode(array[0]);

    array
      .slice(1)
      .reduce((curr, next) => curr.next = new LinkedListNode(next), head);

    return head;
  }

  *[Symbol.iterator]() {
    let current: LinkedListNode<T> = this.head;
    let hasNext = current.next !== null;
    
    while(hasNext) {
      current = current.next!;
      hasNext = current.next !== null;

      yield current.data;
    }
  }
}
