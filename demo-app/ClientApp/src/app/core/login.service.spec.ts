import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

describe('LoginService', () => {

	let router: Router = {
		navigate: () => { }
	} as unknown as Router;

	beforeEach(() => {

		TestBed.configureTestingModule({
			providers: [
				{ provide: Router, useValue: router },
			]
		})
	});

	it('should be created', () => {
		const service: LoginService = TestBed.get(LoginService);
		expect(service).toBeTruthy();
	});


	it('should have Login() return false if login fails.', () => {

		spyOn(router, 'navigate').and.callFake(() => {
			return new Promise<boolean>((resolve, reject) => {
				resolve(false);
			});
		});

		const service: LoginService = TestBed.get(LoginService);

		service.Login().subscribe(
			x => {
				expect(x).toBe(false);
			},
			err => {
			}
		);
	});


	it('should have Login() return true if login succeeds.', () => {

		spyOn(router, 'navigate').and.callFake(() => {
			return new Promise<boolean>((resolve, reject) => {
				resolve(true);
			});
		});

		const service: LoginService = TestBed.get(LoginService);

		service.Login().subscribe(
			x => {
				expect(x).toBe(true);
			},
			err => {
			}
		);
	});
});
