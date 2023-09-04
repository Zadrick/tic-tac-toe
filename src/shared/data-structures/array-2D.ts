class Array2D<T> extends Array<T[]> {
  constructor(rows: number, cols: number) {
    super(rows);

    for (let index = 0; index < this.length; index++) this[index] = new Array<T>(cols).fill(undefined as T);
  }
}

export default Array2D;
