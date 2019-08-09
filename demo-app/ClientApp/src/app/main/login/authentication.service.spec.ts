import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {

	let httpClientSpy: jasmine.SpyObj<HttpClient>;

	beforeEach(() => {

		httpClientSpy = jasmine.createSpyObj('HttpClient', { 'post': of("jst") });
		

		TestBed.configureTestingModule({
			providers: [
				{ provide: HttpClient, useValue: httpClientSpy },

				// If we wanted to use the actual objects themselves rather than a spy then:
				//HttpClient,
				//HttpHandler
			]
		});
	});

	it('should be created', () => {
		const service: AuthenticationService = TestBed.get(AuthenticationService);
		expect(service).toBeTruthy();
	});

	it('should make a single call to HttpClient.post() method.', () => {
		const authenticationService: AuthenticationService = TestBed.get(AuthenticationService);

		let result = authenticationService.Login("username", "password");

		expect(httpClientSpy.post.calls.count()).toBe(1);
	})

	it('should make internal call to HttpClient.post() method with 1st argument, the AccountsService URL, not being empty or null.', () => {
		const authenticationService: AuthenticationService = TestBed.get(AuthenticationService);

		let result = authenticationService.Login("username", "password");

		// Don't required seeing the actual URL because it could change in the future.

		expect(httpClientSpy.post.calls.first().args[0]).not.toBe('');
		expect(httpClientSpy.post.calls.first().args[0]).not.toBe(null);
	})

	it('should have Login() method that takes 2 parameters, username and password, that are encoded and then included in an "Authorization" header in call to HttpClient.post() method.', () => {
		const authenticationService: AuthenticationService = TestBed.get(AuthenticationService);

		let result = authenticationService.Login("username", "password");

		expect(httpClientSpy.post.calls.first().args[2].headers.get('Authorization')).toBe('Basic dXNlcm5hbWU6cGFzc3dvcmQ=');
	})

	it('should have Login() method that results in internal call to HttpClient.post() method with options parameter that includes option withCredentials: true', () => {
		const authenticationService: AuthenticationService = TestBed.get(AuthenticationService);

		let result = authenticationService.Login("username", "password");

		expect(httpClientSpy.post.calls.first().args[2].withCredentials).toBe(true);
	})
});
