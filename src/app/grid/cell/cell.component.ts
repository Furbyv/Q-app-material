import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Cell } from './cell.model';
import { GridService } from '../grid.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
  animations: [
    trigger('incrementValue', [
      transition(':increment', [
        style({ backgroundColor: 'yellow' }),
        animate('0.2s', style('*')),
      ]),
    ]),
    trigger('changedToNull', [
      state('true', style('*')),
      state('false', style('*')),
      transition('false => true', [
        style({ backgroundColor: 'green' }),
        animate('0.3s ease-out', style('*')),
      ]),
      transition('true => false', [
        style({ backgroundColor: 'yellow' }),
        animate('0.3s ease-out', style('*')),
      ]),
    ]),
  ],
})
export class CellComponent implements OnInit {
  @Input() cell: Cell;
  @Input() rowIndex: number;
  constructor(private gridService: GridService) {}

  ngOnInit(): void {}

  onClick() {
    this.gridService.incrementValues(this.rowIndex, this.cell.index);

    setTimeout(() => {
      this.gridService.checkForFibonacciSequence();
    }, 500);
  }
}
