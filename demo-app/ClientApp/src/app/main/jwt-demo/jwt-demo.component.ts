import { Component, OnInit, Inject } from '@angular/core';
import { IAuthenticationService, AuthenticationService } from '../../core/authentication.service';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

/*
			<textarea id="ta" #ta rows="20" cols="100" [(ngModel)]="this.authenticationService.jwt">
			</textarea>
*/

@Component({
	selector: 'jwt-demo',
	template: `
        <div style="text-align: center">
			<div style="margin: 15px">
				JSON Web Token
			</div>
			<div>
 				<textarea id="ta" #ta rows="20" cols="100" [value]="this.AuthenticationService.Jwt" (input)="this.AuthenticationService.Jwt=$event.target.value">
				</textarea>
			</div>
			<div>
				<button (click)="Click()">Call Protected Service</button>
			</div>
			<div>
 				<textarea rows="5" cols="100" [value]="this.responseText">
				</textarea>
			</div>
		</div>
	`,
	styles: [`
	`]
})
export class JwtDemoComponent implements OnInit {

	// Construction.

	constructor(
		private httpClient: HttpClient,
		@Inject('IAuthenticationService') private authenticationService: IAuthenticationService,
	) { }


	// Instance variables.

	responseText: string = "<Response Text>";


	// Life-cycle methods.

	ngOnInit() {
	}


	// Property accessors.

	public get AuthenticationService(): IAuthenticationService {
		return this.authenticationService;
	}
	public set AuthenticationService(authenticationService: IAuthenticationService) {
		this.authenticationService = authenticationService;
	}



	// Event handlers.

	Click() {
		let headers: HttpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authenticationService.Jwt);

		//const options = {
		//	headers: headers,
		//	observe: 'response',
		//	responseType: 'text',
		//	// Options must specify withCredentials = true if cookies, authorization headers
		//	// or TLS client certificates are part of request.  In this case an "Authorization"
		//	// header is part of the request.  Further note that when withCredentials is true
		//	// the "Access-Control-Allow-Origin" response header cannot be "*".  So the
		//	// appropriate changes to he service being called will have to be made.  (Basically
		//	// it means that the CORS policy cannot be specified using the AllowAnyDomain()
		//	// method.)  Note that the AllowCredentials() must be specified for the policy in
		//	// order for the access-control-allow-credentials response header to be part of
		//	// the response.
		//	withCredentials: true
		//}

		this.httpClient.get(
			// Note that the scheme (HTTP, HTTPS) must be specified in the URL.
			'https://localhost:9006/api/values',
			{
				headers,
				// Options must specify withCredentials = true if cookies, authorization headers
				// or TLS client certificates are part of request.  In this case an "Authorization"
				// header is part of the request.  Further note that when withCredentials is true
				// the "Access-Control-Allow-Origin" response header cannot be "*".  So the
				// appropriate changes to he service being called will have to be made.  (Basically
				// it means that the CORS policy cannot be specified using the AllowAnyDomain()
				// method.)  Note that the AllowCredentials() must be specified for the policy in
				// order for the access-control-allow-credentials response header to be part of
				// the response.
				withCredentials: true
			}
		).subscribe({
			next: (response: HttpResponse<JSON>) => { this.responseText = JSON.stringify(response); },
			error: (err: HttpErrorResponse) => { this.responseText = err.message; }
		});
	}

}
