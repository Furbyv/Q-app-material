import { Component, Input, OnInit } from '@angular/core';
import { Cell } from '../cell/cell.model';
import { Row } from './row.model';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css'],
})
export class RowComponent implements OnInit {
  @Input() row: Row;
  constructor() {}

  ngOnInit(): void {}

  identify(index, cell: Cell) {
    return cell.index;
  }
}
