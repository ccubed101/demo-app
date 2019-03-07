import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Observer, PartialObserver, Subscription, of } from 'rxjs';
import { delay, throttleTime } from 'rxjs/operators';

@Component({
	selector: 'reactive-form-example3',
	template: `
        <h1 id="titleText">Reactive Forms Example 3</h1>
		<div style="margin-top: 1em">
			<form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
				<table align="center" border="6px line black" style="border-spacing: 10px; border-collapse: separate">
					<tr>
						<td>String:</td>
						<td>
							<input type="text" formControlName="name" required/>
						</td>
						<td>{{formGroup.controls.name.value}}</td>
					</tr>
					<tr>
						<td>Number:</td>
						<td>
							<input type="number" formControlName="id"/>
						</td>
						<td>{{formGroup.controls.id.value}}</td>
					</tr>
					<tr>
						<td>Date:</td>
						<td>
							<input type="date" formControlName="date"/>
						</td>
						<td>{{formGroup.controls.date.value}}</td>
					</tr>
					<tr formGroupName="nestedFormGroup">					<!-- It appears that formGroupName="..." can be on any parent element. -->
						<td>CheckBox:</td>
						<td>
							<input type="checkbox" formControlName="checkbox"/>
						</td>
						<!-- Can't use 'formGroup.controls.nestedFormGroup.controls.checkbox.value' below  -->
						<!-- because 'nestedFormGroup' is interpreted as an AbstractControl instead of a   -->
						<!-- FormGroup when server-side rendering is build.  There is no problem on the    -->
						<!-- client side.                                                                  -->
						<td>{{formGroup.controls.nestedFormGroup["controls"].checkbox.value}}</td>
					</tr>
					<tr formGroupName="nestedFormGroup">
						<td>Color:</td>
						<td>
							<input type="color" formControlName="color"/>
						</td>
						<!-- Another way to resolve the problem described in the previous <td>. -->
						<td>{{formGroup.controls.nestedFormGroup["controls"].color.value}}</td>
					</tr>
				</table>
				<div style="text-align: center; margin-top: 1em">
					<button type="submit" [disabled]="!formGroup.valid" style="margin-left: 0.5em; margin-right: 0.5em">Submit</button>
				</div>
				<div style="text-align: center; margin-top: 1em">
					Form Status: {{ formGroup.status }}
				</div>
			</form>
		</div>
    `,
	styles: [
		"#titleText { color: red; font-family: Comic Sans MS; font-size: 72px; font-weight: 900; text-align: center }",
	]
})
export class ReactiveFormsExample2Component implements OnInit, OnDestroy {

	// Construction.
	constructor(private formBuilder: FormBuilder) {
	}


	// FormGroup.

	formGroup: FormGroup



	// Life-cycle

	ngOnInit() {
		this.formGroup = this.formBuilder.group({
			name: [{ value: 'Colin', disabled: false }, Validators.required],
			id: [11],
			date: ['2019-02-01'],
			nestedFormGroup: this.formBuilder.group({
				checkbox: [true],
				color: ['#ff0000']
			})
		})
	}

	ngOnDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}


	// Instance variables.

	subscriptions: Subscription[] = [];


	// UI event handlers.

	onSubmit() {
		
	}




	// Observers

	allObserver: PartialObserver<any> = {
		next: (item) => { console.log(item); }
	};
}
