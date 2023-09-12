class Array2D<T> extends Array<T[]> {
  constructor(rows: number, cols: number, defaultValue: () => T = () => undefined as T) {
    super(rows);

    for (let index = 0; index < this.length; index++) {
      this[index] = Array.from(new Array<T>(cols), defaultValue);
    }
  }
}

export default Array2D;
