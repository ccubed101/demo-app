import { Component, OnInit } from '@angular/core';

import { HorzResizingService } from '../../HorzResizing.service'
import { VertResizingService } from '../../VertResizing.service'

@Component({
    selector: 'trpLayout1',
    template: `
        <div id="banner" style="background-color: red; height: 150px">
        </div>
        <div id="content" style="height: 800px; background-color: blue">
            <div id="mapPanel" class="horzPanelLayout" style="background-color: green; width: 80%">
            </div>
            <div id="controlPanel" class="horzPanelLayout" style="background-color: cyan; width: 20%">
            </div>
        </div>
    `,
    styles: [
        ".horzPanelLayout { height: 100%; float: left; overflow: hidden; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;}"
    ],
})
export class Layout1Component implements OnInit {

    // Construction.

    constructor() { }


    // Instance variables.
    private horzResizingService: HorzResizingService = new HorzResizingService();
    private vertResizingService: VertResizingService = new VertResizingService();


    // Life-cycle

    ngOnInit() {
        this.horzResizingService.Setup(["#mapPanel", "#controlPanel"], this.AfterHorzResizing.bind(this));
        //this.vertResizingService.Setup(["#topPanel", "#middlePanel", "#bottomPanel"], this.AfterVertResizing.bind(this));
    }


    // Methods.

    AfterHorzResizing() {

        //// Persist records of widths so that they can be restored the next time
        //// the application is executed.
        //ASPS.Persist(ASPS.LeftPanelWidth, leftPanelWidthString);
        //ASPS.Persist(ASPS.CenterPanelWidth, centerPanelWidthString);
        //ASPS.Persist(ASPS.RightPanelWidth, rightPanelWidthString);

        //// Keep a record of the widths so that they can be restored when the 
        //// user navigates away from a "Print Preview" tab.
        //this.AppModel.LeftPanelWidth = leftPanelWidthString;
        //this.AppModel.CenterPanelWidth = centerPanelWidthString;
        //this.AppModel.RightPanelWidth = rightPanelWidthString;

    }

    AfterVertResizing() {

    }
}