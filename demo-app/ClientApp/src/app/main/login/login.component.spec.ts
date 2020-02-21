import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DebugElement, Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { LoginComponent } from './login.component'
import { AuthenticationService } from '../../core/authentication.service'
import { LoginCallbacksService } from '../../core/login.callbacks.service'

describe('LoginComponent', () => {

	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;

    let authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', { 'Login': of("HttpResponse") });
    let loginCallbackServiceSpy: LoginCallbacksService = jasmine.createSpyObj('LoginCallbacksService', [ 'SuccessCallback', 'FailCallback' ]);
    let httpClientSpy = jasmine.createSpyObj('HttpClient', [ 'dontCare' ]);
    let httpHandlerSpy = jasmine.createSpyObj('HttpHandler', [ 'dontCare' ]);

	beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                FormsModule,
            ],
            declarations: [
                LoginComponent
            ],
            providers: [
                //HttpClient,
                //HttpHandler,
                //AuthenticationService,
                //LoginCallbacksService
                { provide: HttpHandler, useValue: httpHandlerSpy },
                { provide: HttpClient, useValue: httpClientSpy },
                { provide: AuthenticationService, useValue: authenticationServiceSpy },
                { provide: LoginCallbacksService, useValue: loginCallbackServiceSpy }
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(LoginComponent);
		    component = fixture.componentInstance;
            fixture.detectChanges();
        });

	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});

    it('should call AuthenticationService when \"Login\" button is clicked with expected username and password parameters.', () => {

        let authenticationService: any = TestBed.get(AuthenticationService);

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

        expect(authenticationService.Login.calls.count()).toEqual(1);
        expect(authenticationService.Login.calls.first().args[0]).toBe(username);
        expect(authenticationService.Login.calls.first().args[1]).toBe(password);

	});
});

