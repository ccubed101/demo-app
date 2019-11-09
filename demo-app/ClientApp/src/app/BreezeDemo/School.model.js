"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var SchoolModel = /** @class */ (function () {
    // Construction
    function SchoolModel(unitOfWork) {
        this.unitOfWork = unitOfWork;
        // Instance variables
        this.courses$ = rxjs_1.of([]);
        this.students$ = rxjs_1.of([]);
        this.enrollments$ = rxjs_1.of([]);
        this.teachers$ = rxjs_1.of([]);
        this.studentEnrollments$ = rxjs_1.of([]);
        this.unitOfWork.MetadataLoadedCallback = this.Initialize.bind(this);
    }
    Object.defineProperty(SchoolModel.prototype, "UnitOfWork", {
        // Property Accessors.
        get: function () {
            return this.unitOfWork;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SchoolModel.prototype, "Courses", {
        get: function () {
            return this.courses$;
        },
        set: function (value) {
            this.courses$ = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SchoolModel.prototype, "Students", {
        get: function () {
            return this.students$;
        },
        set: function (value) {
            this.students$ = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SchoolModel.prototype, "Enrollments", {
        get: function () {
            return this.enrollments$;
        },
        set: function (value) {
            this.enrollments$ = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SchoolModel.prototype, "Teachers", {
        get: function () {
            return this.teachers$;
        },
        set: function (value) {
            this.teachers$ = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SchoolModel.prototype, "CurrentlySelectedStudent", {
        get: function () {
            return this.currentlySelectedStudent;
        },
        set: function (value) {
            this.currentlySelectedStudent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SchoolModel.prototype, "StudentEnrollments", {
        get: function () {
            return this.studentEnrollments$;
        },
        set: function (value) {
            this.studentEnrollments$ = value;
        },
        enumerable: true,
        configurable: true
    });
    // Methods.
    SchoolModel.prototype.Initialize = function () {
        console.log("Have metadata");
        this.Courses = this.UnitOfWork.Courses.fetchAll();
        this.Students = this.UnitOfWork.Students.fetchAll();
        this.Enrollments = this.UnitOfWork.Enrollments.fetchAll();
        this.Teachers = this.UnitOfWork.Teachers.fetchAll();
    };
    SchoolModel.prototype.AddStudent = function (firstName, lastName, enrollmentDate) {
        var student = this.UnitOfWork.Students.Add();
        student.firstName = firstName;
        student.lastName = lastName;
        student.enrollmentDate = enrollmentDate;
        this.Students = rxjs_1.of(this.UnitOfWork.Students.GetAll());
    };
    SchoolModel.prototype.AddCourse = function (title, credits) {
        var course = this.UnitOfWork.Courses.Add();
        course.Title = title;
        course.Credits = credits;
        this.Courses = rxjs_1.of(this.UnitOfWork.Courses.GetAll());
    };
    SchoolModel.prototype.AddEnrollment = function (course, student, grade) {
        var enrollment = this.UnitOfWork.Enrollments.Add();
        enrollment.course = course;
        enrollment.student = student;
        enrollment.grade = grade;
        this.Enrollments = rxjs_1.of(this.UnitOfWork.Enrollments.GetAll());
    };
    SchoolModel.prototype.UpdateStudentEnrollments = function () {
        var _this = this;
        this.studentEnrollments$ = this.Enrollments.pipe(operators_1.map(function (enrollments) { return enrollments.filter(function (enrollment) { return enrollment.student.id === _this.CurrentlySelectedStudent; }); }));
        console.log("Here I am");
    };
    SchoolModel.prototype.Load = function () {
        this.Courses = this.unitOfWork.Courses.fetchAll();
        this.Students = this.unitOfWork.Students.fetchAll();
        this.Enrollments = this.unitOfWork.Enrollments.fetchAll();
    };
    return SchoolModel;
}());
exports.SchoolModel = SchoolModel;
//# sourceMappingURL=School.model.js.map