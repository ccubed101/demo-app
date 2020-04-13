import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { loadData, loadedData } from './NgrxDemo.actions';
import { EMPTY } from 'rxjs';
import { NgrxDemoDataService } from '../NgrxDemoRootComponent/NgrxDemoData.service'
import { Action } from '@ngrx/store';

@Injectable()
export class NgrxDemoEffects {

    constructor(
        private actions$: Actions,
        private dataService: NgrxDemoDataService
        // Inject services here.
        // Inject other event streams here (e.g. from Angular router, observables created from browser events, and other observable streams.)
    ) {
    }


    loadData$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(loadData),
            mergeMap((a) => {
                return this.dataService.GetData().pipe(
                    map((data) => { console.log("data"); return loadedData({ data: data }); }),
                    catchError(() => EMPTY)
                )
            })
        )
    );
}
