export interface page {
    pageNumber: number;
    waterMark: string;
}

export interface Teacher {
    id: number;
    firstName: string;
    lastName: string;
}

export interface Course {
    id: number;
    title: string;
    credits: number;
}

export interface Student {
    id: number;
    firstName: string;
    lastName: string
    enrollmentDate: Date;
}

// Many-to-many relationship.
export interface TeachingAssignment {
    teacherId: number;
    courseId: number;
}

// Many-to-many relationship.
export interface Enrollment {
    studentId: number;
    courseId: number;
}

export interface NgrxDemoState {
    teachers: Teacher[];
    selectedTeacherToRemove: Teacher;
    courses: Course[];
    selectedCourseToRemove: Course;
    students: Student[];
    selectedStudentToRemove: Student;
    teachingAssignments: TeachingAssignment[];
    selectedTeacherForAssignment: Teacher;
    selectedAssignedCourse: Course;
    selectedUnassignedCourse: Course;
    enrollments: Enrollment[];
    selectedStudentForEnrollment: Student;
    selectedEnrolledCourse: Course;
    selectedUnenrolledCourse: Course;
}

export interface AppState {
    NgrxDemo: NgrxDemoState;
}
