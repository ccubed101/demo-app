import { Observable, of } from 'rxjs';
import { NgrxDemoState } from '../ngrx/interfaces';
import { state } from '../ngrx/State';


export class NgrxDemoDataService {

    // Construction.

    constructor(
    ) {
    }


    // Interface

    GetData(): Observable<any> {
        return of(state);
    }
}
