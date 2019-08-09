"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoginModel = /** @class */ (function () {
    // Construction
    function LoginModel(userName, password) {
        this.userName = userName;
        this.password = password;
    }
    Object.defineProperty(LoginModel.prototype, "UserName", {
        // Property accessors.
        get: function () {
            return this.userName;
        },
        set: function (value) {
            this.userName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginModel.prototype, "Password", {
        get: function () {
            return this.password;
        },
        set: function (value) {
            this.password = value;
        },
        enumerable: true,
        configurable: true
    });
    return LoginModel;
}());
exports.LoginModel = LoginModel;
//# sourceMappingURL=Login.Model.js.map