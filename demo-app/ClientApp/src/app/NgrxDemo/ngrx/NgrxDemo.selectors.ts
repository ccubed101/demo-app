import { createSelector, createFeatureSelector } from '@ngrx/store';

import { AppState, NgrxDemoState, Teacher, Course, Student, TeachingAssignment, Enrollment } from './interfaces';


//export const selectTeachers = (state: any) => state.NgrxDemo.Teachers;

export const getNgrxDemoState = createFeatureSelector<AppState, NgrxDemoState>('NgrxDemo');

export const getTeachers = createSelector(
    getNgrxDemoState,
    (state: NgrxDemoState) => state.teachers
)

export const getSelectedTeacherToRemove = createSelector(
    getNgrxDemoState,
    (state: NgrxDemoState) => state.selectedTeacherToRemove
)

export const getCourses = createSelector(
    getNgrxDemoState,
    (state: NgrxDemoState) => state.courses
)

export const getSelectedCourseToRemove = createSelector(
    getNgrxDemoState,
    (state: NgrxDemoState) => state.selectedCourseToRemove
)

export const getStudents = createSelector(
    getNgrxDemoState,
    (state: NgrxDemoState) => state.students
)

export const getSelectedStudentToRemove = createSelector(
    getNgrxDemoState,
    (state: NgrxDemoState) => state.selectedStudentToRemove
)

export const getTeachingAssignments = createSelector(
    getNgrxDemoState,
    (state: NgrxDemoState) => state.teachingAssignments
)

export const getSelectedTeacherForAssignment = createSelector(
    getNgrxDemoState,
    (state: NgrxDemoState) => state.selectedTeacherForAssignment
)

export const getSelectedEnrolledCourse = createSelector(
    getNgrxDemoState,
    (state: NgrxDemoState) => state.selectedEnrolledCourse
)

export const getSelectedUnenrolledCourse = createSelector(
    getNgrxDemoState,
    (state: NgrxDemoState) => state.selectedUnenrolledCourse
)

export const getEnrollments = createSelector(
    getNgrxDemoState,
    (state: NgrxDemoState) => state.enrollments
)

export const getSelectedStudentForEnrollment = createSelector(
    getNgrxDemoState,
    (state: NgrxDemoState) => state.selectedStudentForEnrollment
)

export const getSelectedAssignedCourse = createSelector(
    getNgrxDemoState,
    (state: NgrxDemoState) => state.selectedAssignedCourse
)

export const getSelectedUnassignedCourse = createSelector(
    getNgrxDemoState,
    (state: NgrxDemoState) => state.selectedUnassignedCourse
)

export const getAssignedCourses = createSelector(
    getSelectedTeacherForAssignment,
    getTeachingAssignments,
    getCourses,
    (selectedTeacherForAssignment: Teacher, teachingAssignments: TeachingAssignment[], courses: Course[]) => {
        if (selectedTeacherForAssignment && teachingAssignments && courses) {
            // Only want teaching assignments that apply to selected teacher.
            let teachingAssignmentForSelectedTeacher: TeachingAssignment[] =
                teachingAssignments.filter((teachingAssignment: TeachingAssignment) => teachingAssignment.teacherId === selectedTeacherForAssignment.id);
            // Only want courses that apply to selected teacher.
            return courses.filter((course: Course) =>
                teachingAssignmentForSelectedTeacher.find((teachingAssignment: TeachingAssignment) => teachingAssignment.courseId === course.id));
        }
    }
)

export const getUnassignedCourses = createSelector(
    getSelectedTeacherForAssignment,
    getTeachingAssignments,
    getCourses,
    (selectedTeacherForAssignment: Teacher, teachingAssignments: TeachingAssignment[], courses: Course[]) => {
        if (selectedTeacherForAssignment && teachingAssignments && courses) {
            return courses.filter((course: Course) =>
                !teachingAssignments.find((teachingAssignment: TeachingAssignment) =>
                    teachingAssignment.teacherId === selectedTeacherForAssignment.id && teachingAssignment.courseId === course.id)
            );
        }
    }
)

export const getEnrolledCourses = createSelector(
    getSelectedStudentForEnrollment,
    getEnrollments,
    getCourses,
    (selectedStudentForEnrollment: Student, enrollments: Enrollment[], courses: Course[]) => {
        if (selectedStudentForEnrollment && enrollments && courses) {
            // Only want enrollments that apply to selected student.
            let enrollmentsForSelectedStudent: Enrollment[] =
                enrollments.filter((enrollment: Enrollment) => enrollment.studentId === selectedStudentForEnrollment.id);
            // Only want courses that selected student is enrolled in.
            return courses.filter((course: Course) =>
                enrollmentsForSelectedStudent.find((enrollment: Enrollment) => enrollment.courseId === course.id));
        }
    }
)

export const getUnenrolledCourses = createSelector(
    getSelectedStudentForEnrollment,
    getEnrollments,
    getCourses,
    (selectedStudentForEnrollment: Student, enrollments: Enrollment[], courses: Course[]) => {
        if (selectedStudentForEnrollment && enrollments && courses) {
            return courses.filter((course: Course) =>
                !enrollments.find((enrollment: Enrollment) =>
                    enrollment.studentId === selectedStudentForEnrollment.id && enrollment.courseId === course.id)
            );
        }
    }
)



