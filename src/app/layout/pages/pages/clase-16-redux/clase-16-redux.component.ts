import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ContadorActions } from '../../../../core/store/contador/actions';
import { selectContadorValue } from '../../../../core/store/contador/selectors';

@Component({
  selector: 'app-clase-16-redux',
  templateUrl: './clase-16-redux.component.html',
  styleUrl: './clase-16-redux.component.css',
})
export class Clase16ReduxComponent implements OnDestroy {
  value$: Observable<number>;

  value = 0;

  contadorValueSubscription?: Subscription;

  constructor(private store: Store) {
    this.value$ = this.store.select(selectContadorValue);

    // this.contadorValueSubscription = this.store
    //   .select(selectContadorValue)
    //   .subscribe({
    //     next: (value) => {
    //       console.log('HOLA');
    //       this.value = value;
    //     },
    //   });
  }

  ngOnDestroy(): void {
    // this.contadorValueSubscription?.unsubscribe();
  }

  incrementar(): void {
    this.store.dispatch(ContadorActions.incrementar());
  }

  decrementar(): void {
    this.store.dispatch(ContadorActions.decrementar({ cantidad: 1 }));
  }
}
