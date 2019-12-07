import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterState, RouterOutlet } from '@angular/router';
import { HorzResizingService } from '../HorzResizing.service'
import { VertResizingService } from '../VertResizing.service'

import * as $ from 'jquery'
import 'jqueryui'

//import { AppStatePersistenceService as ASPS } from '../Services/AppStatePersistence.Service'
//import { IAppModel, AppModel } from '../Models/AppModel'

@Component({
    selector: 'the-revenue-project',
	template: `
		<div class="title">
			The Revenue Project
        </div>
        <div>
            <div id="leftPanel" class="panel" style="background-color: red; width: 33.33%; height: 800px">
            </div>
            <div id="centerPanel" class="panel" style="background-color: green; width: 33.33%; height: 800px">
                <div id="topPanel" style="background-color: green; height: 33.33%">
                </div>
                <div id="middlePanel" style="background-color: cyan; height: 33.33%">
                </div>
                <div id="bottomPanel" style="background-color: yellow; height: 33.33%">
                </div>
            </div>
            <div id="rightPanel" class="panel" style="background-color: blue; width: 33.33%; height: 800px">
            </div>
        </div>
    `,
	styles: [
        ".title { text-align: center; font-size: xx-large; margin-top: 0.5em }",
        ".panel { height: 100%; float: left; overflow: hidden; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;}"
    ],
    providers: [
        HorzResizingService,
        VertResizingService,
    ]
})
export class TheRevenueProjectRootComponent implements OnInit {

    // Construction.

    constructor() { }


    // Instance variables.
    private horzResizingService: HorzResizingService = new HorzResizingService();
    private vertResizingService: VertResizingService = new VertResizingService();


    // Life-cycle

    ngOnInit() {
        this.horzResizingService.Setup(["#leftPanel", "#centerPanel", "#rightPanel"], this.AfterHorzResizing.bind(this));
        this.vertResizingService.Setup(["#topPanel", "#middlePanel", "#bottomPanel"], this.AfterVertResizing.bind(this));
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


