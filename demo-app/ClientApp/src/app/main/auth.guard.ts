import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../core/authentication.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {

	// Construction.

	constructor(authenticationService: AuthenticationService) {
		console.log(authenticationService != null);
	}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		console.log('AuthGuard#canActivate called');
		return true;
	}
}
