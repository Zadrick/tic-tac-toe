import Array2D from './array-2D';

interface ISideViewHandler<T> {
  get(target: Array2D<T>, prop: string | symbol, receiver: any): T[] | Array<T>[keyof T[]];
}

function columnSideViewHandlersFactory<T>(size: number): ISideViewHandler<T> {
  const data = new Array2D<T>(size, size);

  return {
    get(matrixData, prop, receiver) {
      const isElement = typeof prop !== 'symbol' && Number.isInteger(+prop);

      if (!isElement) return Reflect.get(data, prop, receiver);
      const columnIndex = +prop;

      const handler: ProxyHandler<T[]> = {
        set(_, rowIndex, newValue, receiver2) {
          data[columnIndex][rowIndex as any] = newValue;
          return Reflect.set(matrixData[columnIndex], rowIndex, newValue, receiver2);
        },
      };

      const proxy: T[] = new Proxy(data[+prop], handler);

      return proxy;
    },
  }
}

function diagonalSideViewHandlersFactory<T>(size: number): ISideViewHandler<T> {
  const data = new Array2D<T>(2, size);

  return {
    get(matrixData, prop, receiver) {
      const isElement = typeof prop !== 'symbol' && Number.isInteger(prop);

      if (!isElement) return Reflect.get(data, prop, receiver);

      const diagonalIndex = +prop;
      const shift = diagonalIndex << 1;
      const diagonal = matrixData.map((row, columnIndex) => row[shift - columnIndex]);

      const handler: ProxyHandler<T[]> = {
        set(_, cellIndex: string, newValue, receiver2) {
          const rowIndex = +cellIndex;
          const columnIndex = shift - +cellIndex;

          data[diagonalIndex][rowIndex] = newValue;

          return Reflect.set(matrixData[rowIndex], columnIndex, newValue, receiver2);
        },
      };

      const proxy: T[] = new Proxy(diagonal, handler);

      return proxy;
    },
  }
}

export interface IMatrixCoordinates {
  x: number;
  y: number;
}


class MatrixCell<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }
}

class Matrix<T = number> {
  private data: Array2D<MatrixCell<T>>;

  rows: Array2D<MatrixCell<T>>;
  columns: Array2D<MatrixCell<T>>;
  diagonals: Array2D<MatrixCell<T>>;

  constructor(size: number) {
    this.data = new Array2D(size, size, () => new MatrixCell<T>(undefined as T));

    this.rows = new Proxy(this.data, {});

    this.columns = new Array2D<MatrixCell<T>>(size, size);

    this.columns.forEach((col, colIndex) => {
      col.forEach((row, rowIndex) => {
        col[rowIndex] = this.data[rowIndex][colIndex];
      });
    });

    this.diagonals = new Array2D<MatrixCell<T>>(2, size);

    for (let i = 0; i < this.data.length; i++) {
      this.diagonals[0][i] = this.data[i][i];
      this.diagonals[1][i] = this.data[i][this.data.length - i - 1];
    }
  }

  get({ x, y }: IMatrixCoordinates): T {
    return this.data[x][y].value;
  }

  set({ x, y }: IMatrixCoordinates, value: any): void {
    this.data[x][y].value = value;
  }
}

export default Matrix;
