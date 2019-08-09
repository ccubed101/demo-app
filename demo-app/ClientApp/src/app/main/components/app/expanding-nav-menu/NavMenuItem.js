"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NavMenuItem = /** @class */ (function () {
    // Constuction.
    function NavMenuItem(text, route, children) {
        var _a;
        // Instance variables.
        this.text = null;
        this.route = null;
        this.children = [];
        this.Text = text;
        if (route != undefined && route != null)
            this.Route = route;
        if (children != undefined && children != null)
            (_a = this.Children).push.apply(_a, children);
    }
    Object.defineProperty(NavMenuItem.prototype, "Text", {
        // Property accessors.
        get: function () {
            return this.text;
        },
        set: function (value) {
            this.text = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavMenuItem.prototype, "Route", {
        get: function () {
            return this.route;
        },
        set: function (value) {
            this.route = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavMenuItem.prototype, "Children", {
        get: function () {
            return this.children;
        },
        enumerable: true,
        configurable: true
    });
    return NavMenuItem;
}());
exports.NavMenuItem = NavMenuItem;
//# sourceMappingURL=NavMenuItem.js.map