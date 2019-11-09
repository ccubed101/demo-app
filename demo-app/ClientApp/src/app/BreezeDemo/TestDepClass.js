"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TestDepClass = /** @class */ (function () {
    function TestDepClass() {
        // Instance variables
        this.name = "Name #1";
    }
    Object.defineProperty(TestDepClass.prototype, "Name", {
        // Property Accessors
        get: function () {
            return this.name;
        },
        set: function (value) {
            this.name = value;
        },
        enumerable: true,
        configurable: true
    });
    return TestDepClass;
}());
exports.TestDepClass = TestDepClass;
//# sourceMappingURL=TestDepClass.js.map