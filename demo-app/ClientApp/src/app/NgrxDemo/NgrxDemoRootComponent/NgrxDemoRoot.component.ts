import { Component } from '@angular/core';
import { ActivatedRoute, RouterState, RouterOutlet } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { setGreeting, setSecondGreeting } from '../../main/ngrx/main.actions';
import { loadFavoriteMovies, favoriteMoviesLoaded } from '../FeatureState.reducer'
import { Observable, of } from 'rxjs';


@Component({
    selector: 'ngrx-demo',
	template: `
		<div class="title">
			Ngrx Demo
        </div>
        <div style="margin-top: 2em">
            <table border="1" style="margin-left: auto; margin-right: auto">
                <tr>
                    <td>
                        Greeting:
                    </td>
                    <td>
                        {{ greeting$ | async }}
                    </td>
                </tr>
                <tr>
                    <td>
                        Enter Greeting Text: 
                    </td>
                    <td>
                        <input type="text" (input)="OnGreetingChanged($event)"/>
                    </td>
                </tr>
                 <tr>
                    <td>
                        Feature Property Value:
                    </td>
                    <td>
                        {{ featurePropertyValue$ | async }}
                    </td>
                </tr>
           </table>
		</div>
        <div style="display: table; margin: 2em auto 0 auto">
            <button (click)="GetFavorites()">Get Favorites</button>
            <button (click)="ClearList()">Clear List</button>
        </div>
        <div>
            <ul style="display: table; margin: 2em auto 0 auto">
                <li *ngFor="let favoriteMovie of favoriteMovies$ | async">
                    {{ favoriteMovie }}
                </li>
            </ul>
        </div>	`,
	styles: [
		".title { text-align: center; font-size: xx-large; margin-top: 0.5em }",
	],
})
export class NgrxDemoRootComponent {

    // Construction.

    constructor(
        private store: Store<{ main: { greeting: string }, featureState: { featureProperty: string, favoriteMovies: [] } }>
    ) {

        this.greeting$ = store.pipe(select(state => state.main.greeting));
        this.featurePropertyValue$ = store.pipe(select(state => state.featureState.featureProperty));
        this.favoriteMovies$ = store.pipe(select(state => state.featureState.favoriteMovies));

        //console.log(1);
        //store.pipe(select('main')).subscribe(x => console.log(x.greeting));
        //store.pipe(select('main')).subscribe(x => console.log(x.secondGreeting));
        //store.pipe(select('main')).subscribe(x => console.log(x.thirdGreeting));
        //console.log(2);
        ////store.dispatch(setGreeting({ greeting: 'Test' }));
        ////store.dispatch(setGreeting({ greeting: 'Test1' }));
        ////store.dispatch(setGreeting({ greeting: 'Test2' }));
        //store.dispatch(setGreeting({ greeting: 'Test4' }));
        //store.dispatch(setSecondGreeting({ greeting: 'Test5' }));
        //console.log(3);
        //store.pipe(select('main')).subscribe(x => console.log(x.secondGreeting));
        //console.log(4);

    }


    // Instance variables.

    private greeting$: Observable<string>;
    private featurePropertyValue$: Observable<string>;
    private favoriteMovies$: Observable<[]>;


    // Methods

    OnGreetingChanged($event) {
        this.store.dispatch(setGreeting({ greeting: $event.target.value }))
    }

    GetFavorites() {
        this.store.dispatch(loadFavoriteMovies());
    }

    ClearList() {

    }

}


