import { NgrxDemoState } from '../ngrx/interfaces';

export const state: NgrxDemoState = {
    teachers: [
        { id: 1, firstName: "Arthur", lastName: "Clarke" },
        { id: 2, firstName: "George", lastName: "Orwell" },
        { id: 3, firstName: "Niccolò", lastName: "Machiavelli" },
        { id: 4, firstName: "Jane", lastName: "Austen" },
    ],
    selectedTeacherToRemove: null,
    courses: [
        { id: 1, title: "English", credits: 4 },
        { id: 2, title: "Math", credits: 4 },
        { id: 3, title: "History", credits: 4 },
    ],
    selectedCourseToRemove: null,
    students: [
        { id: 1, firstName: "Michael", lastName: "Faraday", enrollmentDate: new Date() },
        { id: 2, firstName: "Issac", lastName: "Newton", enrollmentDate: new Date() },
        { id: 3, firstName: "Albert", lastName: "Einstein", enrollmentDate: new Date() },
        { id: 4, firstName: "Niels", lastName: "Bohr", enrollmentDate: new Date() },
    ],
    selectedStudentToRemove: null,
    teachingAssignments: [
        { teacherId: 1, courseId: 2 },
        { teacherId: 1, courseId: 3 },
        { teacherId: 2, courseId: 1 },
        { teacherId: 2, courseId: 2 },
        { teacherId: 2, courseId: 3 },
        { teacherId: 3, courseId: 1 },
    ],
    selectedTeacherForAssignment: null,
    selectedAssignedCourse: null,
    selectedUnassignedCourse: null,
    enrollments: [
        { studentId: 1, courseId: 2 },
        { studentId: 2, courseId: 3 },
        { studentId: 2, courseId: 1 },
        { studentId: 3, courseId: 2 },
    ],
    selectedStudentForEnrollment: null,
    selectedEnrolledCourse: null,
    selectedUnenrolledCourse: null,
};
