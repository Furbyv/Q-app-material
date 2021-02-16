import { Component, OnInit } from '@angular/core';
import { GridService } from './grid.service';
import { Row } from './row/row.model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  gridDimension = 50;
  fibonacciSequence = 5;

  constructor(public gridService: GridService) {}

  ngOnInit(): void {
    this.gridService.createRows(50, 5);
  }

  identify(index, row: Row) {
    return row.index;
  }
}
