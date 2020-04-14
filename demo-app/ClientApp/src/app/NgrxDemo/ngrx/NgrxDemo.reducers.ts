import { createReducer, on, props } from '@ngrx/store';
import { NgrxDemoState, Teacher, TeachingAssignment, Enrollment } from './interfaces';
import {
    addTeacher,
    removeTeacher,
    setSelectedTeacherToRemove,
    addCourse,
    removeCourse,
    setSelectedCourseToRemove,
    addStudent,
    removeStudent,
    setSelectedStudentToRemove,
    setSelectedTeacherForAssignment,
    setSelectedAssignedCourse,
    setSelectedUnassignedCourse,
    setSelectedStudentForEnrollment,
    setSelectedEnrolledCourse,
    setSelectedUnenrolledCourse,
    addTeacherAssignment,
    removeTeacherAssignment,
    addStudentEnrollment,
    removeStudentEnrollment,
    loadData,
    loadedData,
} from './NgrxDemo.actions';


export const initialState: NgrxDemoState = {
    teachers: [
    ],
    selectedTeacherToRemove: null,
    courses: [
    ],
    selectedCourseToRemove: null,
    students: [
    ],
    selectedStudentToRemove: null,
    teachingAssignments: [
    ],
    selectedTeacherForAssignment: null,
    selectedAssignedCourse: null,
    selectedUnassignedCourse: null,
    enrollments: [
    ],
    selectedStudentForEnrollment: null,
    selectedEnrolledCourse: null,
    selectedUnenrolledCourse: null,
};

const _ngrxDemoReducer = createReducer(initialState,

    on(addCourse, (state, { courseToAdd }) => ({ ...state, courses: [...state.courses, courseToAdd] })),
    on(removeCourse, (state, { courseToRemove }) => (
        {
            ...state,
            courses: [
                ...state.courses.slice(0, state.courses.indexOf(courseToRemove)),
                ...state.courses.slice(state.courses.indexOf(courseToRemove) + 1)
            ]
        }
    )),
    on(setSelectedCourseToRemove, (state, { selectedCourse }) => ({ ...state, selectedCourseToRemove: selectedCourse })),


    on(addStudent, (state, { studentToAdd }) => ({ ...state, students: [...state.students, studentToAdd] })),
    on(removeStudent, (state, { studentToRemove }) => (
        {
            ...state,
            students: [
                ...state.students.slice(0, state.students.indexOf(studentToRemove)),
                ...state.students.slice(state.students.indexOf(studentToRemove) + 1)
            ]
        }
    )),
    on(setSelectedStudentToRemove, (state, { selectedStudent }) => ({ ...state, selectedStudentToRemove: selectedStudent })),

    on(addTeacher, (state, { teacherToAdd }) => ({ ...state, teachers: [...state.teachers, teacherToAdd] })),
    on(removeTeacher, (state, { teacherToRemove }) => {
        return {
            ...state,
            teachers: [
                ...state.teachers.slice(0, state.teachers.indexOf(teacherToRemove)),
                ...state.teachers.slice(state.teachers.indexOf(teacherToRemove) + 1)
            ]
        }
    }
    ),
    on(setSelectedTeacherToRemove, (state, { selectedTeacher }) => ({ ...state, selectedTeacherToRemove: selectedTeacher })),

    on(setSelectedTeacherForAssignment, (state, { selectedTeacher }) => ({ ...state, selectedTeacherForAssignment: selectedTeacher })),
    on(setSelectedAssignedCourse, (state, { selectedCourse }) => ({ ...state, selectedAssignedCourse: selectedCourse })),
    on(setSelectedUnassignedCourse, (state, { selectedCourse }) => ({ ...state, selectedUnassignedCourse: selectedCourse })),
    on(addTeacherAssignment, (state, { selectedTeacher, selectedCourse }) => ({ ...state, teachingAssignments: [...state.teachingAssignments, { teacherId: selectedTeacher.id, courseId: selectedCourse.id }] })),
    on(removeTeacherAssignment, (state, { selectedTeacher, selectedCourse }) => {
        let teachingAssignment: TeachingAssignment = state.teachingAssignments.find((teachingAssignment) => teachingAssignment.teacherId === selectedTeacher.id && teachingAssignment.courseId === selectedCourse.id);
        return {
            ...state,
            teachingAssignments: [
                ...state.teachingAssignments.slice(0, state.teachingAssignments.indexOf(teachingAssignment)),
                ...state.teachingAssignments.slice(state.teachingAssignments.indexOf(teachingAssignment) + 1)
            ]
        }
    }),

    on(setSelectedStudentForEnrollment, (state, { selectedStudent }) => ({ ...state, selectedStudentForEnrollment: selectedStudent })),
    on(setSelectedEnrolledCourse, (state, { selectedCourse }) => ({ ...state, selectedEnrolledCourse: selectedCourse })),
    on(setSelectedUnenrolledCourse, (state, { selectedCourse }) => ({ ...state, selectedUnenrolledCourse: selectedCourse })),
    on(addStudentEnrollment, (state, { selectedStudent, selectedCourse }) => ({ ...state, enrollments: [...state.enrollments, { studentId: selectedStudent.id, courseId: selectedCourse.id }] })),
    on(removeStudentEnrollment, (state, { selectedStudent, selectedCourse }) => {
        let enrollment: Enrollment = state.enrollments.find((enrollment) => enrollment.studentId == selectedStudent.id && enrollment.courseId == selectedCourse.id);
        console.log(enrollment);
        console.log(state.enrollments.indexOf(enrollment));
        console.log(state.enrollments.slice(0, state.enrollments.indexOf(enrollment)));
        console.log(state.enrollments.slice(state.enrollments.indexOf(enrollment) + 1));
        return {
            ...state,
            enrollments: [
                ...state.enrollments.slice(0, state.enrollments.indexOf(enrollment)),
                ...state.enrollments.slice(state.enrollments.indexOf(enrollment) + 1)
            ]
        }
    }),

    on(loadData, (state) => {
        return state;
    }),
    on(loadedData, (state, { data }) => {
        return data;
    })
);



export function ngrxDemoReducer(state, action) {
    return _ngrxDemoReducer(state, action);
}
