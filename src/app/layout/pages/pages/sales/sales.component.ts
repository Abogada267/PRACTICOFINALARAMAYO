import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { SaleDialogComponent } from './components/sale-dialog/sale-dialog.component';
import { Sale } from './models';
import { SalesActions } from './store/sales.actions';
import { selectSales, selectSalesIsLoading } from './store/sales.selectors';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css',
})
export class SalesComponent implements OnDestroy {
  // sales$: Observable<Sale[]>;

  sales: Sale[] = [];

  isLoading$: Observable<boolean>;

  salesSubscripion?: Subscription;

  destroyed$ = new Subject();

  constructor(private store: Store, private matDialog: MatDialog) {
    // this.sales$ = this.store.select(selectSales);

    this.store
      .select(selectSales)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (sales) => {
          this.sales = sales;
        },
      });

    this.isLoading$ = this.store.select(selectSalesIsLoading);
    this.store.dispatch(SalesActions.loadSales());
  }

  createSale(): void {
    this.matDialog.open(SaleDialogComponent);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
