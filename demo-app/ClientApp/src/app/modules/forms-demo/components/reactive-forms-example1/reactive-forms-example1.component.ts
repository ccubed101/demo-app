import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Observer, PartialObserver, Subscription, of } from 'rxjs';
import { delay, throttleTime } from 'rxjs/operators';

@Component({
    selector: 'reactive-form',
    template: `
        <h1 id="titleText">Reactive Forms Example 2</h1>
		<table align="center" border="6px line black" style="border-spacing: 10px; border-collapse: separate">
			<tr>
				<td>String:</td>
				<td>
					<input type="text" [formControl]="name"/>
				</td>
				<td>{{name.value}}</td>
			</tr>
			<tr>
				<td>ID:</td>
				<td>
					<input type="number" [formControl]="id"/>
				</td>
				<td>
					<button (click)="AddOne()">Add 1</button>
				</td>
			</tr>
			<tr>
				<td>Date:</td>
				<td>
					<input type="date" [formControl]="date"/>
				</td>
				<td></td>
			</tr>
		</table>
		<div style="margin-top: 1em">
			<form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
				<table align="center" border="6px line black" style="border-spacing: 10px; border-collapse: separate">
					<tr>
						<td>String:</td>
						<td>
							<input type="text" formControlName="name2"/>
						</td>
						<td>{{formGroup.controls.name2.value}}</td>
					</tr>
					<tr>
						<td>Number:</td>
						<td>
							<input type="number" formControlName="id2"/>
						</td>
						<td>{{formGroup.controls.id2.value}}</td>
					</tr>
					<tr>
						<td>Date:</td>
						<td>
							<input type="datetime-local" formControlName="date2"/>
						</td>
						<td>{{formGroup.controls.date2.value}}</td>
					</tr>
					<tr formGroupName="nestedFormGroup">
						<td>CheckBox:</td>
						<td>
							<input type="checkbox" formControlName="checkbox"/>
						</td>
						<!-- Can't use 'theForm.controls.nested.controls.checkbox.value' below because -->
						<!-- 'nested' is interpreted as an AbstractControl instead of a FormGroup when -->
						<!-- server-side rendering is build.  There is no problem on the client side.  -->
						<td>{{formGroup.controls.nestedFormGroup["controls"].checkbox.value}}</td>
					</tr>
					<tr formGroupName="nestedFormGroup">
						<td>Color:</td>
						<td>
							<input type="color" formControlName="color"/>
						</td>
						<!-- Another way to resolve the problem described in the previous <td>. -->
						<td>{{Color}}</td>
					</tr>
				</table>
				<div style="text-align: center; margin-top: 1em">
					<button type="submit" [disabled]="!formGroup.valid" style="margin-left: 0.5em; margin-right: 0.5em">Submit</button>
					<button style="margin-left: 0.5em; margin-right: 0.5em" (click)="onPatchValue()">patchValue()</button>
					<button style="margin-left: 0.5em; margin-right: 0.5em" (click)="onSetValue()">setValue()</button>
				</div>
			</form>
		</div>
    `,
    styles: [
      "#titleText { color: red; font-family: Comic Sans MS; font-size: 72px; font-weight: 900; text-align: center }",
    ]
})
export class ReactiveFormsExample1Component implements OnInit, OnDestroy {

    // Construction.
	constructor() {
	}


	// Life-cycle

	ngOnInit() {
		this.subscriptions.push(
			this.name.valueChanges.subscribe(this.allObserver),
			this.id.valueChanges.subscribe(this.allObserver),
			this.date.valueChanges.subscribe(this.allObserver)
		);

		this.subscriptions.push(this.formGroup.valueChanges.subscribe(this.allObserver));
	}

	ngOnDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}


	// FormGropus and FormControls

	name: FormControl = new FormControl("Initial value 1");
	id: FormControl = new FormControl(11);
	date: FormControl = new FormControl('2019-02-01');			// Note: To successfully initialize an HTML input element whose 'type' property is one of the date 
																// types (e.g. 'date', 'time', 'datetime-local') use must pass in a string with a very specific format.  
																// The format depends on the value assigned to the 'type' property.  In this particular case the 'type' 
																// property is set to 'date' and the correct format to use is 'yyyy-MM-dd'.


	formGroup: FormGroup = new FormGroup({
		name2: new FormControl('Initial Value'),						// Supplying an initial value here sets the 'value' property of the FormControl...but nothing is displayed in the UI.
		id2: new FormControl(11),
		date2: new FormControl('2019-02-01'),
		nestedFormGroup: new FormGroup({
			checkbox: new FormControl(false),
			color: new FormControl('#ff0000'),
		})
	});


	// Instance variables.

	subscriptions: Subscription[] = [];


	// UI event handlers.

	AddOne() {
		this.id.setValue(this.id.value + 1);		// MUST use count.setValue().  count.value = count.value + 1 is not the same thing.
	}

	AddTwo() {
		this.formGroup.controls.count2.setValue(this.formGroup.controls.count2.value + 2);		// MUST use count.setValue().  count.value = count.value + 1 is not the same thing.
	}

	onSubmit() {
		console.log((<FormGroup><unknown>(this.formGroup.controls))["nestedFormGroup"].controls["color"].value);
	}

	onPatchValue() {
		// <form>.patchValue() WILL NOT throw an error if object passed as parameter does not
		// match the structure of the FormGroup model.
		this.formGroup.patchValue({
			name2: "patchValue",
			nested: {
				checkbox: true,
				color: 0xffffff,
			}
		})
	}

	onSetValue() {
		// <form>.setValue() WILL throw an error if object passed as parameter does not
		// match the structure of the FormGroup model.  
		this.formGroup.setValue({
			name2: "setValue",
			id2: 44,
			date2: "2019-02-02",
			nestedFormGroup: {
				checkbox: false,
				color: 0xff00ff,
			}
		})
	}


	// Property accessors

	get Checkbox(): boolean {
		return (<FormGroup>(this.formGroup.controls.nestedFormGroup)).controls.checkbox.value;
	}

	get Color(): number {
		return (<FormGroup>(this.formGroup.controls.nestedFormGroup)).controls.color.value
	}


	// Observers

	allObserver: PartialObserver<any> = {
		next: (item) => { console.log(item); }
	};
}
