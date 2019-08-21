import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, of, from } from 'rxjs';
import { LoginCallbacksService } from './login.callbacks.service';

export interface ILoginService {
	Login(): Observable<boolean>;
	LoginWithCallbacks(successCallback: () => void, failCallback: () => void);
}

@Injectable({
  providedIn: 'root'
})
export class LoginService implements ILoginService {

	// Construction.

	constructor(private router: Router, private loginCallbacksService: LoginCallbacksService) { }


	// Instance variables.

	successUrl: string;
	failUrl: string;

	successCallback: () => void = null;
	failCallback: () => void = null


	// Interface methods

	// Initiates and performs the login process.
	// Observable emits true if login succeeds and false if login fails.
	Login(): Observable<boolean> {
		return from(this.router.navigate(['/Login']));
			//.then((x) => { console.log("x is " + x); return of(x); })
			//.catch((err) => { return of(err); })
	}

	LoginWithUrls(successUrl: string, failUrl: string) {

		// Save the URLs.
		this.successUrl = successUrl;
		this.failUrl = failUrl;

		// Navigate to the Login page.
		this.router.navigate(['/Login']);
	}

	LoginWithCallbacks(successCallback: () => void, failCallback: () => void) {

		// Save the callbacks.
		this.loginCallbacksService.SuccessCallback = successCallback;
		this.loginCallbacksService.FailCallback = failCallback;

		// Navigate to the Login page.
		this.router.navigate(['/Login']);
	}
}
