import Array2D from './array-2D';

export interface IMatrixCoordinates {
  row: number;
  column: number;
}

class Matrix<T = number> {
  rows: Array2D<T>;
  cols: Array2D<T>;

  constructor(rows: number, cols: number) {
    this.rows = new Array2D(cols, cols);

    this.cols = new Array2D(cols, rows);
  }

  get({ row, column }: IMatrixCoordinates): T {
    return this.rows[row][column];
  }

  set({ row, column }: IMatrixCoordinates, value: any): void {
    this.rows[row][column] = value;
    this.cols[column][row] = value;
  }
}

export default Matrix;
