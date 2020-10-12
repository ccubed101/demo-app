import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'

import { UnitOfWork } from './UnitOfWork'
import { ICourse } from './Course'
import { IStudent } from './Student'
import { IEnrollment } from './Enrollment'
import { ITeacher } from './Teacher'
import { Injectable } from "@angular/core";

@Injectable()
export class SchoolModel {

    // Construction
    constructor(
        private unitOfWork: UnitOfWork
    ) {
        this.unitOfWork.MetadataLoadedCallback = this.Initialize.bind(this);
    }

    // Instance variables
    private courses$: Observable<ICourse[]> = of([]);
    private students$: Observable<IStudent[]> = of([]);
    private enrollments$: Observable<IEnrollment[]> = of([]);
    private teachers$: Observable<any[]> = of([]);

    // For StudentEnrollments component.
    private currentlySelectedStudent: Number;
    private studentEnrollments$: Observable<IEnrollment[]> = of([]);


    // Property Accessors.

    get UnitOfWork(): UnitOfWork {
        return this.unitOfWork
    }

    get Courses(): Observable<ICourse[]> {
        return this.courses$
    }
    set Courses(value: Observable<ICourse[]>) {
        this.courses$ = value;
    }

    get Students(): Observable<IStudent[]> {
        return this.students$
    }
    set Students(value: Observable<IStudent[]>) {
        this.students$ = value;
    }

    get Enrollments(): Observable<IEnrollment[]> {
        return this.enrollments$
    }
    set Enrollments(value: Observable<IEnrollment[]>) {
        this.enrollments$ = value;
    }

    get Teachers(): Observable<ITeacher[]> {
        return this.teachers$
    }
    set Teachers(value: Observable<ITeacher[]>) {
        this.teachers$ = value;
    }

    get CurrentlySelectedStudent(): Number {
        return this.currentlySelectedStudent;
    }
    set CurrentlySelectedStudent(value: Number) {
        this.currentlySelectedStudent = value;
    }

   get StudentEnrollments(): Observable<IEnrollment[]> {
        return this.studentEnrollments$
    }
    set StudentEnrollments(value: Observable<IEnrollment[]>) {
        this.studentEnrollments$ = value;
    }


    // Methods.

    Initialize(): void {
        console.log("Have metadata");
        this.Courses = this.UnitOfWork.Courses.fetchAll();
        this.Students = this.UnitOfWork.Students.fetchAll();
        this.Enrollments = this.UnitOfWork.Enrollments.fetchAll();

        this.Teachers = this.UnitOfWork.Teachers.fetchAll();

    }

    public AddStudent(
        firstName: string,
        lastName: string,
        enrollmentDate: Date
    ): void {
        let student: IStudent = this.UnitOfWork.Students.Add();

        student.firstName = firstName;
        student.lastName = lastName;
        student.enrollmentDate = enrollmentDate;

        this.Students = of(this.UnitOfWork.Students.GetAll());
    }

    public AddCourse(
        title: string,
        credits: number
    ): void {
        let course: ICourse = this.UnitOfWork.Courses.Add();

        course.Title = title;
        course.Credits = credits;

        this.Courses = of(this.UnitOfWork.Courses.GetAll());
    }

    public AddEnrollment(
        course: ICourse,
        student: IStudent,
        grade: number,
    ): void {
        let enrollment: IEnrollment = this.UnitOfWork.Enrollments.Add();

        enrollment.course = course;
        enrollment.student = student;
        enrollment.grade = grade;

        this.Enrollments = of(this.UnitOfWork.Enrollments.GetAll());
    }

    public UpdateStudentEnrollments() {
        this.studentEnrollments$ = this.Enrollments.pipe(
            map((enrollments) => enrollments.filter((enrollment) => enrollment.student.id === this.CurrentlySelectedStudent))
        );
    }

    public Load() {
        this.Courses = this.unitOfWork.Courses.fetchAll();
        this.Students = this.unitOfWork.Students.fetchAll();
        this.Enrollments = this.unitOfWork.Enrollments.fetchAll();
   }
}
