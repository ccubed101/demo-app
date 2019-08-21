import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthenticationService } from '../../core/authentication.service';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;

	let authenticationSeriveSpy: jasmine.SpyObj<AuthenticationService>;

	beforeEach(async(() => {

		let p: Partial<AuthenticationService>;

		authenticationSeriveSpy = jasmine.createSpyObj('AuthenticationService', { 'Login': of("HttpResponse") });

		TestBed.configureTestingModule({
			imports: [FormsModule], 
			declarations: [LoginComponent],
			providers: [
				//HttpClient,
				//HttpHandler,
				{ provide: AuthenticationService, useValue: authenticationSeriveSpy }
			]
		})
		.compileComponents();
	}));

	beforeEach(async(() => {										// Why did wrapping function passed to beforeEach() with async() allow username and password to be updated on model???
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call AuthenticationService when \"Login\" button is clicked with expected username and password parameters.', () => {

		let username: string = "username";
		let password: string = "password";

		let usernameInput: HTMLInputElement = fixture.nativeElement.querySelector("#login-username");
		usernameInput.value = username;
		usernameInput.dispatchEvent(new Event('input'));

		let passwordInput: HTMLInputElement = fixture.nativeElement.querySelector("#login-password");
		passwordInput.value = password;
		passwordInput.dispatchEvent(new Event('input'));

		let loginButton: HTMLElement = fixture.nativeElement.querySelector("#loginButton");
		loginButton.click();

		expect(authenticationSeriveSpy.Login.calls.count()).toEqual(1);
		expect(authenticationSeriveSpy.Login.calls.first().args[0]).toBe(username);
		expect(authenticationSeriveSpy.Login.calls.first().args[1]).toBe(password);
	});
});

