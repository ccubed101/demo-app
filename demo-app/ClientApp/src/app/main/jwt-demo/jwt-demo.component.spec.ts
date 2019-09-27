import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler, HttpHeaders, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators'
import { JwtDemoComponent } from './jwt-demo.component';
import { IAuthenticationService, AuthenticationService } from '../../core/authentication.service';

describe('JwtDemoComponent', () => {

	let component: JwtDemoComponent;
	let fixture: ComponentFixture<JwtDemoComponent>;
	let authenticationService: IAuthenticationService;
	let httpClient: HttpClient;

	beforeEach(async(() => {


		let authenticationSeriveSpy: IAuthenticationService = jasmine.createSpyObj('AuthenticationService', { 'Login': of("HttpResponse") });

		TestBed.configureTestingModule({
			declarations: [JwtDemoComponent],
			providers: [
				HttpClient,
				HttpHandler,
				//{ provide: 'IAuthenticationService', useValue: authenticationSeriveSpy }
				{ provide: 'IAuthenticationService', useClass: AuthenticationService }
			]
		}).compileComponents();

		authenticationService = TestBed.get('IAuthenticationService');
		httpClient = TestBed.get(HttpClient);

	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(JwtDemoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display the JSON web token.', () => {

		let jwtText: string = 'This is the Jwt.';
		const authenticationService: IAuthenticationService = TestBed.get('IAuthenticationService');
		authenticationService.Jwt = jwtText;

		fixture.detectChanges();

		expect((<HTMLTextAreaElement>((<HTMLElement>(fixture.nativeElement)).querySelector('#ta'))).value).toBe(jwtText);
	});

	it('should call get() method of HttpClient when button is pressed.', () => {

		const httpClient: HttpClient = TestBed.get(HttpClient);
		spyOn(httpClient, 'get').and.returnValue(of(new HttpResponse<JSON>(JSON.parse('{}'))));

		const element: HTMLElement = fixture.nativeElement;
		const button: HTMLButtonElement = element.querySelector('#callProtectedService');
		button.click();

		expect(httpClient.get).toHaveBeenCalled();	
	});

	it('should call get() method of HttpClient with appropriate parameters when button is pressed.', () => {

		let jwtText: string = 'This is the Jwt 2.';
		const authenticationService: IAuthenticationService = TestBed.get('IAuthenticationService');
		authenticationService.Jwt = jwtText;

		const httpClient: HttpClient = TestBed.get(HttpClient);
		spyOn(httpClient, 'get').and.returnValue(of(new HttpResponse<JSON>(JSON.parse('{}'))));

		const element: HTMLElement = fixture.nativeElement;
		const button: HTMLButtonElement = element.querySelector('#callProtectedService');
		button.click();

		expect(httpClient.get).toHaveBeenCalledWith(
			'https://localhost:9006/api/values',
			{
				headers: new HttpHeaders().set('Authorization', 'Bearer ' + jwtText),
				withCredentials: true
			}
		)
	});

	it('should call get() method of HttpClient that returns a string that is displayed.', () => {

		const jsonString: string = '{"body":"value #1"}';
		const httpClient: HttpClient = TestBed.get(HttpClient);
		spyOn(httpClient, 'get').and.returnValue(of(JSON.parse(jsonString)));

		const element: HTMLElement = fixture.nativeElement;
		const button: HTMLButtonElement = element.querySelector('#callProtectedService');
		button.click();

		fixture.detectChanges();

		const textArea: HTMLTextAreaElement = element.querySelector('#responseText');
		expect(textArea.value).toEqual(jsonString);
	});
});
