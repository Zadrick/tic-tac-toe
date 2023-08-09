export function* numberIterator(till: number, from: number = 0, step: number = 1): Generator<number> {
  while(from <= till) {
    yield from
    from += step;
  };
}
