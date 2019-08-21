import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginCallbacksService {

	constructor() { }


	// Instance variables.

	successCallback: () => void = null;
	failCallback: () => void = null;


	// Property accessors.

	public get SuccessCallback(): () => void {
		return this.successCallback;
	}
	public set SuccessCallback(successCallback: () => void) {
		this.successCallback = successCallback;
	}

	public get FailCallback(): () => void {
		return this.failCallback;
	}
	public set FailCallback(failCallback: () => void) {
		this.failCallback = failCallback;
	}

}
