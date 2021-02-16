import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subscription } from 'rxjs';
import { GridService } from 'src/app/grid/grid.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  dimensions: number;
  fibonacciSequence: number;
  gridForm: FormGroup;
  gridSubscription: Subscription;

  title = 'Q-assignment';

  constructor(private gridService: GridService) {}

  ngOnInit() {
    this.gridForm = new FormGroup({
      dimensions: new FormControl(this.dimensions, [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
      ]),
      fibonacci: new FormControl(this.fibonacciSequence, [
        Validators.required,
        Validators.min(3),
        Validators.max(10),
      ]),
    });
  }

  onSubmit() {
    this.gridService.createRows(
      this.gridForm.value.dimensions,
      this.gridForm.value.fibonacci
    );
    this.trigger.closeMenu();
  }

  ngOnDestroy() {
    this.gridSubscription.unsubscribe();
  }
}
