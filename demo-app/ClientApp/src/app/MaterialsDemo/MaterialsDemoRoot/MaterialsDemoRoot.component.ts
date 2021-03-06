import { Component } from '@angular/core';

@Component({
	selector: 'materials-demo',
	template: `
        <div style="text-align: center; margin-bottom: 2em">
			Materials Demo
		</div>
        <mat-tab-group animationDuration="0ms" mat-align-tabs="center">
          <mat-tab label="Tree">
            <MaterialsTree></MaterialsTree>
          </mat-tab>
          <mat-tab label="List">
            <MaterialsList></MaterialsList>
          </mat-tab>
          <mat-tab label="Two">
            <h1>TAB 3</h1>
            <p>...</p>
          </mat-tab>
          <mat-tab label="Two">
            <h1>TAB 4</h1>
            <p>...</p>
          </mat-tab>
        </mat-tab-group>
	`,
	styles: [
	],
})
export class MaterialsDemoRootComponent {



}
