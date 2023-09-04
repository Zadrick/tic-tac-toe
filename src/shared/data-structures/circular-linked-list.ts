import LinkedList, { ILinkedListNode } from './linked-list';

export default class CircularLinkedList<T> extends LinkedList<T> {
  constructor(nodes: any[]) {
    super(nodes);

    this.circulate();
  }

  append(value: T): void {
    super.append(value);

    this.circulate();
  }

  private circulate() {
    this.tail.next = this.head;
  }
}
