import Array2D from './array-2D';

export interface IMatrixCoordinates {
  row: number;
  column: number;
}

class Matrix<T = number> {
  private data: Array2D<T>;

  constructor(rows, cols) {
    this.data = new Array2D(rows, cols);
  }

  get({ row, column }: IMatrixCoordinates): T {
    return this.data[row][column];
  }

  set({ row, column }: IMatrixCoordinates, value): void {
    this.data[row][column] = value;
  }
}

export default Matrix;
