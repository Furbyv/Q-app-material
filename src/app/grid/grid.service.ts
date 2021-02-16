import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Cell } from './cell/cell.model';
import { Row } from './row/row.model';

@Injectable({
  providedIn: 'root',
})
export class GridService {
  private readonly _rows = new BehaviorSubject<Row[]>([]);
  readonly rows$ = this._rows.asObservable();
  private fibonacciSequence: number = 5;

  constructor() {}

  get rows(): Row[] {
    return this._rows.getValue();
  }

  set rows(newRows: Row[]) {
    this._rows.next(newRows);
  }

  createRows(dimensions: number, fibonacciSequence: number) {
    this.fibonacciSequence = fibonacciSequence;
    const rows: Row[] = [];
    for (let i = 0; i < dimensions; i++) {
      const newCells: Cell[] = [];
      for (let i = 0; i < dimensions; i++) {
        newCells.push(new Cell(i, null));
      }
      rows.push(new Row(i, newCells));
    }
    this.rows = rows;
  }

  incrementValues(rowIndex: number, colIndex: number) {
    const updatedRows = [...this.rows];

    updatedRows.forEach((row) => {
      row.cells = row.cells.map((cell) => {
        if (row.index === rowIndex || cell.index === colIndex) {
          cell.value++;
        }
        return cell;
      });
    });
    this.rows = updatedRows;
  }

  checkForFibonacciSequence() {
    const updatedRows = [...this.rows];

    updatedRows.forEach((row) => {
      for (let i = 0; i <= row.cells.length - this.fibonacciSequence; i++) {
        const cellsToCheck = row.cells.slice(i, i + this.fibonacciSequence);
        if (cellsToCheck.length < this.fibonacciSequence) continue;
        if (cellsToCheck.some((cell) => cell.value === null)) continue;
        if (
          !this.isFibonacciNumber(
            cellsToCheck[this.fibonacciSequence - 1].value
          )
        )
          continue;
        if (this.isFibonacciSequence(cellsToCheck)) {
          cellsToCheck.forEach((cell) => {
            row.cells[cell.index].value = null;
          });
        }
      }
    });

    this.rows = updatedRows;
  }

  private isFibonacciSequence(cells: Cell[]): boolean {
    for (let i = cells.length - 1; i > 1; i--) {
      if (!(cells[i].value === cells[i - 2].value + cells[i - 1].value))
        return false;
    }
    return true;
  }

  private isFibonacciNumber(value: number): boolean {
    return (
      this.isPerfectSquare(value * value * 5 - 4) ||
      this.isPerfectSquare(value * value * 5 + 4)
    );
  }

  private isPerfectSquare(value: number): boolean {
    return Math.sqrt(value) % 1 == 0;
  }
}
