"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//import { NgrxPlusBreezeModule } from './NgrxPlusBreeze.module';
var Repository_1 = require("./Repository");
//// Specifying providers can be done as shown below (as opposed to being done in the NgModule
//// declaration).  But this could cause problems.  In particular there was some conflict with
//// Ngrx.
//@Injectable({
//    providedIn: NgrxPlusBreezeModule
//})
var StudentRepository = /** @class */ (function (_super) {
    __extends(StudentRepository, _super);
    // Construction.
    function StudentRepository(entityManager) {
        return _super.call(this, entityManager) || this;
    }
    Object.defineProperty(StudentRepository.prototype, "EntityTypeName", {
        // Property Accessors
        get: function () {
            return "Student";
        },
        enumerable: true,
        configurable: true
    });
    return StudentRepository;
}(Repository_1.Repository));
exports.StudentRepository = StudentRepository;
//# sourceMappingURL=StudentRepository.js.map