import { Component, OnInit } from '@angular/core';

import { HorzResizingService } from '../../HorzResizing.service'
import { VertResizingService } from '../../VertResizing.service'

@Component({
    selector: 'trpLayout2',
    template: `
        <div id="mapAndBannerPanel" class="horzPanelLayout" style="width: 80%; height: 100%">
            <div id="banner" style="background-color: red; height: 150px">
            </div>
            <div id="mapPanel" style="background-color: green; height: 800px">
            </div>
        </div>
        <div id="controlPanel" class="horzPanelLayout" style="background-color: cyan; width: 20%; height: 950px">
        </div>
    `,
    styles: [
        ".horzPanelLayout { height: 100%; float: left; overflow: hidden; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;}"
    ],
})
export class Layout2Component implements OnInit {

    // Construction.

    constructor() { }


    // Instance variables.
    private horzResizingService: HorzResizingService = new HorzResizingService();
    private vertResizingService: VertResizingService = new VertResizingService();


    // Life-cycle

    ngOnInit() {
        this.horzResizingService.Setup(["#mapAndBannerPanel", "#controlPanel"], this.AfterHorzResizing.bind(this));
        //this.vertResizingService.Setup(["#mapAndBannerPanel", "#controlPanel"], this.AfterVertResizing.bind(this));
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