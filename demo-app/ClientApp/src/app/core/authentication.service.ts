import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


export interface IAuthenticationService {
	Login(userName: string, password: string): Observable<string>;
	IsLoggedIn(): boolean;
	Jwt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements IAuthenticationService {

	// Construction.

	constructor(
		private httpClient: HttpClient
	) {
	}


	// Instance variables.

	jwt: string = null;


	// Property accessors.

	public get Jwt(): string {
		return this.jwt;
	}
	public set Jwt(jwt: string) {
		this.jwt = jwt;
	}


	Login(userName: string, password: string): Observable<string> {

		/*
		Programmer Notes:

		When attempting to login from demo-app by sending a request to the accounts-service
		the following error messages were being displayed in the Chrome brower console window:
		   Backend returned code 0, body was: [object ProgressEvent]
		   OPTIONS https://localhost:9005/api/Accounts/Authenticate net::ERR_CERT_COMMON_NAME_INVALID
		   ERROR Something bad happened; please try again later.
		The following website
			https://stackoverflow.com/questions/7580508/getting-chrome-to-accept-self-signed-localhost-certificate?rq=1
		suggested doing the following:
			For localhost only:
			Simply paste this in your chrome:
				chrome://flags/#allow-insecure-localhost
			You should see highlighted text saying: Allow invalid certificates for resources loaded from localhost
			Click Enable.
		This resolves the problem.

		When making a cross origin (CORS) request the following happens.  The request is
		actually 2 requests.  The first request, called the 'pre-flight" request, includes
		the following request headers:
			Access-Control-Request-Headers: authorization
			Access-Control-Request-Method: POST
			Origin: http://localhost:4200
		The response headers include:
			Access-Control-Allow-Credentials: true
			Access-Control-Allow-Headers: authorization
			Access-Control-Allow-Methods: POST
			Access-Control-Allow-Origin: http://localhost:4200
		The pre-flight request basically asks whether it is okay to do next request (which
		is the actual POST request).  The response headers answer the question.  If the
		response headers don't have the correct values or are not present then the next
		request will not happen.
		The next request includes the following request header:
			Access-Control-Request-Headers: authorization
		*/

		// base64 encode <user name>:<password> string.
		let base64EncodedUsernameAndPassword: string = btoa(userName + ':' + password);

		let headers: HttpHeaders = new HttpHeaders().set('Authorization', 'Basic ' + base64EncodedUsernameAndPassword);

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

		return this.httpClient.post(
			// Note that the scheme (HTTP, HTTPS) must be specified in the URL.
			'https://localhost:9005/api/Accounts/Authenticate',
			"",
			{
				headers,
				observe: 'response',
				responseType: 'text',
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
		).pipe(
			catchError(this.onError),
			map(httpResponse => httpResponse.body),
			map(jwt => this.jwt = jwt),
			tap(() => console.log(this.jwt))
		);
	}

	IsLoggedIn(): boolean {
		return (this.jwt != null);
	}


	// Private methods.

	private onError(error: HttpErrorResponse): Observable<never> {
		console.log(error.message);
		console.log(error.error);
		console.log(error.name);
		console.log(error.status);
		console.log(error.statusText);
		console.log(error.url);
		if (error.error instanceof ErrorEvent) {
			// A client-side or network error occurred. Handle it accordingly.
			console.error('An error occurred:', error.error.message);
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong,
			console.error(
				`Backend returned code ${error.status}, ` +
				`body was: ${error.error}`);
		}
		// return an observable with a user-facing error message
		return throwError('Something bad happened; please try again later.');
	};
}
