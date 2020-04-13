import { Observable, of } from 'rxjs';


export class NgrxDemoDataService {

    // Construction.

    constructor(
    ) {
    }


    // Interface

    GetData(): Observable<any> {
        return of([1, 2, 3, 4, 5]);
    }
}
