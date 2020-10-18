import { Injectable, ApplicationRef, ChangeDetectorRef, NgZone } from "@angular/core";

import { Observable, of } from 'rxjs'
import { map, mergeMap, tap } from 'rxjs/operators'

import { UnitOfWork } from './UnitOfWork'
import { ITeacher } from './Teacher'
import { ICourse } from './Course'
import { IStudent } from './Student'
import { ITeacherAssignment } from './TeacherAssignment';
import { IStudentEnrollment } from './StudentEnrollment';

@Injectable()
export class SchoolModel {

    // Construction
    constructor(
        private unitOfWork: UnitOfWork,
        private applicationRef: ApplicationRef,
        //private changeDetectorRef: ChangeDetectorRef
        private zone: NgZone
    ) {
        this.unitOfWork.MetadataLoadedCallback = this.Initialize.bind(this);
    }

    // Instance variables

    private teachers$: Observable<ITeacher[]> = of([
   ]);
    private courses$: Observable<ICourse[]> = of([
    ]);
    private students$: Observable<IStudent[]> = of([
    ]);
    private teacherAssignments$: Observable<ITeacherAssignment[]> = of([
    ]);
    private studentEnrollments$: Observable<IStudentEnrollment[]> = of([
    ]);

    // AddRemoveTeachers
    private selectedTeacherToRemove$: Observable<ITeacher> = of();

    // AddRemoveCourses
    private selectedCourseToRemove$: Observable<ICourse> = of();

    // AddRemoveStudents
    private selectedStudentToRemove$: Observable<IStudent> = of();

    // TeacherAssignments
    private selectedAssignedCourse$: Observable<ICourse> = of();
    private selectedUnassignedCourse$: Observable<ICourse> = of();
    private selectedTeacherForAssignment$: Observable<ITeacher> = of();

    // StudentEnrollments
    private selectedEnrolledCourse$: Observable<ICourse> = of();
    private selectedUnenrolledCourse$: Observable<ICourse> = of();
    private selectedStudentForEnrollment$: Observable<IStudent> = of();

    // State
    private haveMetadata = false;


    // Property Accessors.

    get HaveMetadata(): boolean {
        return this.haveMetadata;
    }
    set HaveMetadata(haveMetadata: boolean) {
        this.haveMetadata = haveMetadata;
    }

    get UnitOfWork(): UnitOfWork {
        return this.unitOfWork
    }

    get Teachers$(): Observable<ITeacher[]> {
        return this.teachers$
    }
    set Teachers$(value: Observable<ITeacher[]>) {
        this.teachers$ = value;
    }

    get Courses$(): Observable<ICourse[]> {
        return this.courses$
    }
    set Courses$(value: Observable<ICourse[]>) {
        this.courses$ = value;
    }

    get Students$(): Observable<IStudent[]> {
        return this.students$
    }
    set Students$(value: Observable<IStudent[]>) {
        this.students$ = value;
    }

    get TeacherAssignments$(): Observable<ITeacherAssignment[]> {
        return this.teacherAssignments$
    }
    set TeacherAssignments$(value: Observable<ITeacherAssignment[]>) {
        this.teacherAssignments$ = value;
    }

    get StudentEnrollments$(): Observable<IStudentEnrollment[]> {
        return this.studentEnrollments$
    }
    set StudentEnrollments$(value: Observable<IStudentEnrollment[]>) {
        this.studentEnrollments$ = value;
    }


    // AddRemoveTeachers

    get SelectedTeacherToRemove$(): Observable<ITeacher> {
        return this.selectedTeacherToRemove$;
    }
    set SelectedTeacherToRemove$(selectedTeacherToRemove$) {
        this.selectedTeacherToRemove$ = selectedTeacherToRemove$;
    }


    // AddRemoveStudents

    get SelectedStudentToRemove$(): Observable<IStudent> {
        return this.selectedStudentToRemove$;
    }
    set SelectedStudentToRemove$(selectedStudentToRemove$) {
        this.selectedStudentToRemove$ = selectedStudentToRemove$;
    }


    // AddRemoveCourses

    get SelectedCourseToRemove$(): Observable<ICourse> {
        return this.selectedCourseToRemove$;
    }
    set SelectedCourseToRemove$(selectedCourseToRemove$) {
        this.selectedCourseToRemove$ = selectedCourseToRemove$;
    }


    // TeacherAssignments

    get AssignedCourses$(): Observable<ICourse[]> {

        return (
            // Start with the currently selected student.
            this.SelectedTeacherForAssignment$
                .pipe(
                    // Go from Observable<ITeacher> to Observable<ITeacherAssignment[]>
                    mergeMap(selectedTeacherForAssignment => {
                        return this.TeacherAssignments$
                            .pipe(
                                // Filter out teacher assignments that don't apply to teacher.
                                map(teacherAssignmentArray => teacherAssignmentArray.filter(teacherAssignment => teacherAssignment.TeacherId === selectedTeacherForAssignment.Id)),
                                // Go from Observable<ITeacherAssignment[]> to Observable<ICourse[]>
                                mergeMap(teacherAssignmentArray => {
                                    return this.Courses$
                                        .pipe(
                                            // Filter out courses that teacher is not assigned to.
                                            map(courseArray => courseArray.filter(course => teacherAssignmentArray.find(teacherAssignment => teacherAssignment.CourseId === course.Id) !== undefined))
                                        )
                                })
                            )
                    })
                )
        )

    }

    get UnassignedCourses$(): Observable<ICourse[]> {

        return (
            // Start with the currently selected student.
            this.SelectedTeacherForAssignment$
                .pipe(
                    // Go from Observable<ITeacher> to Observable<ITeacherAssignment[]>
                    mergeMap(selectedTeacherForAssignment => {
                        return this.TeacherAssignments$
                            .pipe(
                                // Filter out teacher assignments that don't apply to teacher.
                                map(teacherAssignmentArray => teacherAssignmentArray.filter(teacherAssignment => teacherAssignment.TeacherId === selectedTeacherForAssignment.Id)),
                                // Go from Observable<ITeacherAssignment[]> to Observable<ICourse[]>
                                mergeMap(teacherAssignmentArray => {
                                    return this.Courses$
                                        .pipe(
                                            // Filter out courses that teacher is not assigned to.
                                            map(courseArray => courseArray.filter(course => teacherAssignmentArray.find(teacherAssignment => teacherAssignment.CourseId === course.Id) === undefined))
                                        )
                                })
                            )
                    })
                )
        )

    }

    get SelectedTeacherForAssignment$(): Observable<ITeacher> {
        return this.selectedTeacherForAssignment$;
    }
    set SelectedTeacherForAssignment$(selectedTeacherForAssignment$: Observable<ITeacher>) {
        this.selectedTeacherForAssignment$ = selectedTeacherForAssignment$;
    }

    get SelectedAssignedCourse$(): Observable<ICourse> {
        return this.selectedAssignedCourse$;
    }
    set SelectedAssignedCourse$(selectedAssignedCourse$: Observable<ICourse>) {
        this.selectedAssignedCourse$ = selectedAssignedCourse$;
    }

    get SelectedUnassignedCourse$(): Observable<ICourse> {
        return this.selectedUnassignedCourse$;
    }
    set SelectedUnassignedCourse$(selectedUnassignedCourse$: Observable<ICourse>) {
        this.selectedUnassignedCourse$ = selectedUnassignedCourse$;
    }


    // StudentEnrollments

    get EnrolledCourses$(): Observable<ICourse[]> {

        return (
            // Start with the currently selected student.
            this.SelectedStudentForEnrollment$
                .pipe(
                    // Go from Observable<IStudent> to Observable<IStudentEnrollment[]>
                    mergeMap(selectedStudentForEnrollment => {
                        return this.StudentEnrollments$
                            .pipe(
                                // Filter out student enrollments that don't apply to student.
                                map(studentEnrollmentArray => studentEnrollmentArray.filter(se => se.StudentId === selectedStudentForEnrollment.Id)),
                                // Go from Observable<IStudentEnrollment[]> to Observable<ICourse[]>
                                mergeMap(studentEnrollmentArray => {
                                    return this.Courses$
                                        .pipe(
                                            // Filter out courses that student is not enrolled in.
                                            map(courseArray => courseArray.filter(course => studentEnrollmentArray.find(studentEnrollment => studentEnrollment.CourseId === course.Id) !== undefined))
                                        )
                                })
                            )
                    })
                )
        )

    }

    get UnenrolledCourses$(): Observable<ICourse[]> {

        return (
            // Start with the currently selected student.
            this.SelectedStudentForEnrollment$
                .pipe(
                    // Go from Observable<IStudent> to Observable<IStudentEnrollment[]>
                    mergeMap(selectedStudentForEnrollment => {
                        return this.StudentEnrollments$
                            .pipe(
                                // Filter out student enrollments that don't apply to student.
                                map(studentEnrollmentArray => studentEnrollmentArray.filter(se => se.StudentId === selectedStudentForEnrollment.Id)),
                                // Go from Observable<IStudentEnrollment[]> to Observable<ICourse[]>
                                mergeMap(studentEnrollmentArray => {
                                    return this.Courses$
                                        .pipe(
                                            // Filter out courses that student is not enrolled in.
                                            map(courseArray => courseArray.filter(course => studentEnrollmentArray.find(studentEnrollment => studentEnrollment.CourseId === course.Id) === undefined))
                                        )
                                })
                            )
                    })
                )
        )

    }

    get SelectedStudentForEnrollment$(): Observable<IStudent> {
        return this.selectedStudentForEnrollment$;
    }
    set SelectedStudentForEnrollment$(selectedStudentForEnrollment$) {
        this.selectedStudentForEnrollment$ = selectedStudentForEnrollment$;
    }

    get SelectedEnrolledCourse$(): Observable<ICourse> {
        return this.selectedEnrolledCourse$;
    }
    set SelectedEnrolledCourse$(selectedEnrolledCourse$: Observable<ICourse>) {
        this.selectedEnrolledCourse$ = selectedEnrolledCourse$;
    }

    get SelectedUnenrolledCourse$(): Observable<ICourse> {
        return this.selectedUnenrolledCourse$;
    }
    set SelectedUnenrolledCourse$(selectedUnenrolledCourse$: Observable<ICourse>) {
        this.selectedUnenrolledCourse$ = selectedUnenrolledCourse$;
    }


    // Methods.

    Initialize(): void {
        this.HaveMetadata = true;
    }

    public AddTeacher(
        FirstName: string,
        LastName: string,
    ): void {
        const teacher: ITeacher = this.UnitOfWork.Teachers.Add();

        teacher.FirstName = FirstName;
        teacher.LastName = LastName;
        console.log(teacher);

        this.Teachers$ = of(this.UnitOfWork.Teachers.GetAll());
    }

    public AddCourse(
        title: string,
        credits: number
    ): void {
        const course: ICourse = this.UnitOfWork.Courses.Add();

        course.Title = title;
        course.Credits = credits;

        this.Courses$ = of(this.UnitOfWork.Courses.GetAll());
    }

    public AddStudent(
        FirstName: string,
        LastName: string,
        EnrollmentDate: Date
    ): void {
        const student: IStudent = this.UnitOfWork.Students.Add();

        student.FirstName = FirstName;
        student.LastName = LastName;
        student.EnrollmentDate = EnrollmentDate;

        this.Students$ = of(this.UnitOfWork.Students.GetAll());
    }

    public AddStudentEnrollment(
        student: IStudent,
        course: ICourse
    ): void {
        const studentEnrollment: IStudentEnrollment = this.UnitOfWork.StudentEnrollments.Add();

        studentEnrollment.StudentId = student.Id;
        studentEnrollment.CourseId = course.Id;

        this.StudentEnrollments$ = of(this.UnitOfWork.StudentEnrollments.GetAll());
    }

    public AddTeacherAssignment(
        teacher: ITeacher,
        course: ICourse
    ): void {
        const teacherAssignment: ITeacherAssignment = this.UnitOfWork.TeacherAssignments.Add();

        teacherAssignment.TeacherId = teacher.Id;
        teacherAssignment.CourseId = course.Id;

        this.TeacherAssignments$ = of(this.UnitOfWork.TeacherAssignments.GetAll());
    }

    public RemoveTeacher(teacherToRemove: ITeacher): void {
        this.UnitOfWork.Teachers.Remove(teacherToRemove);
        this.Teachers$.subscribe(teachers => this.Teachers$ = of((teachers as ITeacher[]).filter(teacher => teacher !== teacherToRemove)))
    }

    public RemoveCourse(courseToRemove: ICourse): void {
        this.UnitOfWork.Teachers.Remove(courseToRemove);
        this.Courses$.subscribe(courses => this.Courses$ = of((courses as ICourse[]).filter(course => course !== courseToRemove)))
    }

    public RemoveStudent(studentToRemove: IStudent): void {
        this.UnitOfWork.Students.Remove(studentToRemove);
        this.Students$.subscribe(students => this.Students$ = of((students as IStudent[]).filter(student => student !== studentToRemove)))
    }

    public RemoveTeacherAssignment(teacher: ITeacher, course: ICourse): void {
        this.TeacherAssignments$.subscribe(teacherAssignments => {
            const teacherAssignmentToRemove: ITeacherAssignment =
                (teacherAssignments as ITeacherAssignment[]).find(teacherAssignment => teacherAssignment.TeacherId === teacher.Id && teacherAssignment.CourseId === course.Id);
            this.unitOfWork.TeacherAssignments.Remove(teacherAssignmentToRemove);
            this.TeacherAssignments$.subscribe(teacherAssignments =>
                this.TeacherAssignments$ = of((teacherAssignments.filter(teacherAssignment => teacherAssignment !== teacherAssignmentToRemove))));
        });
    }

    public RemoveStudentEnrollment(student: IStudent, course: ICourse): void {
        let studentEnrollmentToRemove: IStudentEnrollment;
        this.StudentEnrollments$.subscribe(studentEnrollments => studentEnrollmentToRemove =
            (studentEnrollments as IStudentEnrollment[]).find(studentEnrollment => studentEnrollment.StudentId === student.Id && studentEnrollment.CourseId === course.Id));
        this.unitOfWork.StudentEnrollments.Remove(studentEnrollmentToRemove);
        this.StudentEnrollments$.subscribe(studentEnrollments =>
            this.StudentEnrollments$ = of((studentEnrollments.filter(studentEnrollment => studentEnrollment !== studentEnrollmentToRemove))));
    }

    public Load() {
        this.UnitOfWork.Teachers.fetchAll((results) => { this.Teachers$ = of(results); });
        this.UnitOfWork.Courses.fetchAll((results) => { this.Courses$ = of(results); });
        this.UnitOfWork.Students.fetchAll((results) => { this.Students$ = of(results); });
        this.UnitOfWork.TeacherAssignments.fetchAll((results) => this.TeacherAssignments$ = of(results));
        this.UnitOfWork.StudentEnrollments.fetchAll((results) => { this.StudentEnrollments$ = of(results); });
   }
}
