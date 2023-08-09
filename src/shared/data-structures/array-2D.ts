class Array2D<T> extends Array<T[]> {
  constructor(rows: number, cols: number) {
    super(rows);

    for (const index in this) {
      this[index] = new Array<T>(cols);
    }
  }
}

export default Array2D;
