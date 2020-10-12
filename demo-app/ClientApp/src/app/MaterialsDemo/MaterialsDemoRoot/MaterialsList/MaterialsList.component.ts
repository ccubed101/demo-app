import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'MaterialsList',
    template: `
        <div style="text-align: center">
            <mat-action-list style="width: 15em; margin-left: auto; margin-right: auto">
                <mat-list-item *ngFor="let item of listItems">
                    {{ item }}
                </mat-list-item>
            </mat-action-list>
        </div>
    `,
    styles: []
})
export class MaterialsListComponent implements OnInit {

    constructor() { }


    listItems: string[] = [
        "List Item #1",
        "List Item #2",
        "List Item #3",
        "List Item #4",
        "List Item #5",
        "List Item #6",
    ];


    // Life-cycle

    ngOnInit() {
    }


    // Event handlers.

    save() { }

    undo() { }

    reset() { }

}
