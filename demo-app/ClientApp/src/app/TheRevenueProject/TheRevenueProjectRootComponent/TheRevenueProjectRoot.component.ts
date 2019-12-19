import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterState, RouterOutlet } from '@angular/router';
import { HorzResizingService } from '../HorzResizing.service'
import { VertResizingService } from '../VertResizing.service'
import { LayoutChangedEventService } from '../../shared/LayoutChangedEvent.service'

import * as $ from 'jquery'
import 'jqueryui'

//import { AppStatePersistenceService as ASPS } from '../Services/AppStatePersistence.Service'
//import { IAppModel, AppModel } from '../Models/AppModel'

@Component({
    selector: 'the-revenue-project',
    template: `
        <trpLayout2></trpLayout2>
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
export class TheRevenueProjectRootComponent implements OnInit, OnDestroy {

    // Construction.

    constructor(
        private layoutChangedEventService: LayoutChangedEventService,
    ) {
    }


    // Instance variables.
    private horzResizingService: HorzResizingService = new HorzResizingService();
    private vertResizingService: VertResizingService = new VertResizingService();


    // Life cycle event handlers.

    // Handler for event that is called once immediately after the component is instantiated.

    ngOnInit() {
        this.layoutChangedEventService.Subscribe(this.Resize.bind(this));
        console.log("ngOnInit(): " + this.layoutChangedEventService.Count);

        this.horzResizingService.Setup(["#leftPanel", "#centerPanel", "#rightPanel"], this.AfterHorzResizing.bind(this));
        this.vertResizingService.Setup(["#topPanel", "#middlePanel", "#bottomPanel"], this.AfterVertResizing.bind(this));
    }

    ngOnDestroy() {
        this.layoutChangedEventService.Unsubscribe(this.Resize.bind(this))
        console.log("ngOnDestroy(): " + this.layoutChangedEventService.Count);
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


    // Private methods.

    private Resize(reason: number): void {
        console.log('AppComponent.Resize()' + reason);
    }
}


