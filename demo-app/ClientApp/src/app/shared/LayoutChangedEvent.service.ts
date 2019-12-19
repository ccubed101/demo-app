import * as $ from 'jquery'

export class LayoutChangedEventService {

    constructor() {

        // Call resize functions when Document Object Model (DOM) is fully loaded.
        $(document).ready(this.DocumentReady.bind(this));

        // Call resize functions when 1.) the user manually changes the dimensions
        // of the browser window and 2.) user maximizes, restores or minimizes the
        // browser window.
        window.onresize = this.BrowserWindowResize.bind(this);
    }

    // Instance variables

    // Collection of layout resizing functions that get called.
    private eventHandlers: ((reason: number) => void)[] = [];


    // Property accessors.

    public get Count(): number {
        return this.eventHandlers.length;
    }



    // Public methods

    public Subscribe(func: (reason: number) => void) {
        this.eventHandlers.push(func);
    }

    public Unsubscribe(func: (reason: number) => void) {
        let i: number = this.eventHandlers.indexOf(func);
        this.eventHandlers.splice(i);
    }

    public CallEventHandlers(reason: number) {
        this.eventHandlers.forEach((func: (reason: number) => void) => {
            func(reason);
        });
    }

    public DocumentReady() {
        this.CallEventHandlers(1)
    }

    public BrowserWindowResize() {
        this.CallEventHandlers(2)
    }

    public LayoutChange() {
        this.CallEventHandlers(3);
    }
}
