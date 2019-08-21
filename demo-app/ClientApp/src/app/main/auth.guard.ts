import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { IAuthenticationService, AuthenticationService } from '../core/authentication.service';
import { LoginService } from '../core/login.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {

	// Construction.

	constructor(
		@Inject('IAuthenticationService') private authenticationService: IAuthenticationService,
		//private authenticationService: AuthenticationService,
		private loginService: LoginService,
		private router: Router
	)
	{
	}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

		if (this.authenticationService.IsLoggedIn())
			return true;
		else {
			this.loginService.LoginWithCallbacks(
				() => {
					console.log(this.authenticationService.IsLoggedIn());
					this.router.navigate(['/JwtDemo']);
				},
				() => {
					console.log('failCallback');
				}
			);
			return false;
		}
	}
}
