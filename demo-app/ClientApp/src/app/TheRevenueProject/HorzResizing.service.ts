import * as $ from 'jquery'
import { Injectable } from "@angular/core";
import 'jqueryui'

export interface IHorzResizingService {
    Setup(selectors: string[], stopCallback: () => void): void;
    Enable(): void;
    Disable(): void;
}


class Panel {
    div: JQuery<HTMLDivElement>;
    initialWidth: number;
}

@Injectable()
export class HorzResizingService implements IHorzResizingService {

    // Construction.

    constructor() { }


    // Instance variables.

    panels: Panel[] = [];

    stopCallback: () => void = null;


    // Public methods.

    // Setup for resizing operation.  Must be called before a resize operation can be performed.
    public Setup(selectors: string[], stopCallback: () => void): void {

        this.stopCallback = stopCallback;

        selectors.forEach((selector: string) => {
            let panel: Panel = new Panel();
            panel.div = $(selector);            // This statement cannot be executed in the constructor because the DOM does not exist at that point.
            this.panels.push(panel);
        })

        this.panels.forEach((panel: Panel, index: number, panels: Panel[]) => {
            // If there is only one panel.
            if (index === 1 && panels.length === 1) {
                panel.div.resizable({ handles: "e", start: this.Start.bind(this), resize: this.Resize.bind(this), stop: this.Stop.bind(this) });
            }
            // If there are 2 or more panels.
            else if (index < panels.length - 1) {
                panel.div.resizable({ handles: "e", start: this.Start.bind(this), resize: this.Resize.bind(this), stop: this.Stop.bind(this) });
                panel.div.resizable("option", "maxWidth", panels[index].initialWidth + panels[index + 1].initialWidth - 50);
                panel.div.resizable("option", "minWidth", 50);
            }
        })
    }

    // Enable resizing service.
    public Enable(): void {
        this.panels.forEach((panel: Panel) => {
            panel.div.resizable("enable");
        })
    }

    // Disable resizing service.
    public Disable(): void {
        this.panels.forEach((panel: Panel) => {
            $(panel.div).resizable("disable");
        })
    }


    // Event handlers.

    // This event is triggered at the start of a resize operation.
    // Params:
    //      e           Normalized event object which will contain properties that will always be present regardless of which browser is being used.
    //      ui          Object which has the following properties: element, helper, originalElement, originalPosition, originalSize, position and size.
    Start(e: any, ui: any): void {

        /* Record the widths of the panels. */
        this.panels.forEach((panel: Panel) => {
            var widthString = panel.div.css("width");
            panel.initialWidth = Number(widthString.substring(0, widthString.length - 2));
        })

        this.panels.forEach((panel: Panel, index: number, panels: Panel[]) => {
            // If there is only one panel.
            if (index === 1 && panels.length === 1) {
            }
            // If there are 2 or more panels.
            else if (index < panels.length - 1) {
                panel.div.resizable("option", "maxWidth", panels[index].initialWidth + panels[index + 1].initialWidth - 50);
                panel.div.resizable("option", "minWidth", 50);
            }
        })
    }

    // This event is triggered during the resize, on the drag of the resize handler.
    // Params:
    //      e           Normalized event object which will contain properties that will always be present regardless of which browser is being used.
    //      ui          Object which has the following properties: element, helper, originalElement, originalPosition, originalSize, position and size.
    Resize(e: any, ui: any): void {

        this.panels.forEach((panel: Panel, index: number, panels: Panel[]) => {
            if (ui.element[0].id === panel.div.attr('id')) {
                if (ui.size.width < 0) {
                    $(panels[index + 1].div).css("width", panels[index].initialWidth + panels[index + 1].initialWidth);
                }
                if (ui.size.width > panels[index].initialWidth + panels[index + 1].initialWidth) {
                    $(panels[index + 1].div).css("width", 0);
                }
                else {
                    $(panels[index + 1].div).css("width", panels[index + 1].initialWidth + (panels[index].initialWidth - ui.size.width));
                }
            }
        })
    }

    // This event is triggered at the end of a resize operation.
    // When the resize operation is completed convert the panel size from pixels back to percentages.
    // Doing so means that when the browser is resized the panels will keep their relative sizes.
    // Params:
    //      e           Normalized event object which will contain properties that will always be present regardless of which browser is being used.
    //      ui          Object which has the following properties: element, helper, originalElement, originalPosition, originalSize, position and size.
    Stop(e: any, ui: any): void {

        var total = 0;
        this.panels.forEach((panel: Panel, index: number, panels: Panel[]) => {
            panel.initialWidth = panel.div.outerWidth();
            total += panel.initialWidth;
        })

        this.panels.forEach((panel: Panel, index: number, panels: Panel[]) => {
            let widthString: string = ((panel.initialWidth / total) * 100.0).toString() + "%";
            panel.div.css("width", widthString);
        })

        if (this.stopCallback)
            this.stopCallback();
    }
}
