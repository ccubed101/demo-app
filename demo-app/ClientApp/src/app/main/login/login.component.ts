import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../core/authentication.service';
import { LoginModel } from './Login.Model'
import { LoginCallbacksService } from '../../core/login.callbacks.service';

@Component({
	selector: 'login',
	template: `
        <div style="text-align: center">

			<div style="margin: 15px">
			    (username: colin2, password: Woscers101?)
			</div>

			<form id="theForm" (ngSubmit)="onSubmit()" #loginForm="ngForm">

				<div class="grid-container">

					<div class="grid-item title">
						<h1>Login</h1>
					</div>

					<div class="grid-item label-item">
					  <label for="username">Username:</label>
					</div>
					<div class="grid-item input-item">
					  <input type="text" id="login-username" required [(ngModel)]="LoginModel.UserName" name="UserName" #username="ngModel">
					</div>

					<div class="grid-item label-item">
					  <label for="password">Password:</label>
					</div>
					<div class="grid-item input-item">
					  <input type="password" id="login-password" required [(ngModel)]="LoginModel.Password" name="Password" #password="ngModel">
					</div>

					<div class="grid-item submit">
						<button id="loginButton" type="submit" [disabled]="!loginForm.form.valid">Login</button>
					</div>

				</div>

			</form>

        </div>
    `,
	styles: [`
        .grid-container {
            display: inline-grid;
            grid-template-columns: auto auto;
            background-color: #2196F3;
            padding: 10px;
            grid-column-gap: 10px;
            grid-row-gap: 10px;
            border: 2px solid rgba(0, 0, 0);
			margin-top: 100px
        }
        .grid-item {
            font-size: 14px;
            text-align: right;
        }
        .label-item {
        }
        .input-item {
            background-color: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(0, 0, 0, 0.8);
        }
        .title {
            grid-column: 1 / span 2;
            text-align: center;
        }
        .submit {
            grid-column: 1 / span 2;
            text-align: center;
        }
    `]
})
export class LoginComponent implements OnInit, OnDestroy {

	constructor(private authenticationService: AuthenticationService, private loginCallbacksService: LoginCallbacksService) { }


	// Angular life-cycle methods

	ngOnInit() {
	}

	ngOnDestroy() {
	}


	// Instance variables.

	loginModel: LoginModel = new LoginModel();


	// Property accessors.

	public get LoginModel(): LoginModel {
		return this.loginModel;
	}

	// Event handlers.

	public onSubmit() {

		this.authenticationService.Login(this.LoginModel.UserName, this.LoginModel.Password)
			.subscribe(
				httpResponse => {
					this.loginCallbacksService.SuccessCallback();
				},
				err => {
					this.loginCallbacksService.FailCallback();
				}
			);
	}
}
