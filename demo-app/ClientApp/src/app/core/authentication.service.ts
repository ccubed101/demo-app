import { Injectable } from '@angular/core';
import { CoreModule } from './core.module';

@Injectable({
	providedIn: 'root'					// Specifies that the root injector is the provider of this service.
	//providedIn: CoreModule			// For example purposes...you can specify that a specific NgModule be the provided of this service.
})
export class AuthenticationService {

	constructor() { }


}
