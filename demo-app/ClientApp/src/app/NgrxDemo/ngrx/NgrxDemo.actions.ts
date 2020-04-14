import { Observable, of } from 'rxjs';
import { NgrxDemoState } from './interfaces';


import { createAction, props } from '@ngrx/store';
import { Teacher, Student, Course } from './interfaces';

export const addTeacher = createAction('[AddRemoveTeacher Component] add teacher', props<{ teacherToAdd: Teacher }>());
export const removeTeacher = createAction('[AddRemoveTeacher Component] remove teacher', props<{ teacherToRemove: Teacher }>());
export const setSelectedTeacherToRemove = createAction('[AddRemoveStudent Component] setSelectedTeacherToRemove', props<{ selectedTeacher: Teacher }>());

export const addCourse = createAction('[AddRemoveCourse Component] Add Course', props<{ courseToAdd: Course }>());
export const removeCourse = createAction('[AddRemoveCourse Component] Remove Course', props<{ courseToRemove: Course }>());
export const setSelectedCourseToRemove = createAction('[AddRemoveStudent Component] setSelectedCourseToRemove', props<{ selectedCourse: Course }>());

export const addStudent = createAction('[AddRemoveStudent Component] Add Student', props<{ studentToAdd: Student }>());
export const removeStudent = createAction('[AddRemoveStudent Component] Remove Student', props<{ studentToRemove: Student }>());
export const setSelectedStudentToRemove = createAction('[AddRemoveStudent Component] setSelectedStudentToRemove', props<{ selectedStudent: Student }>());

export const setSelectedTeacherForAssignment = createAction('[TeacherAssignment Component] setSelectedTeacherForAssignment', props<{ selectedTeacher: Teacher }>());
export const setSelectedAssignedCourse = createAction('[TeacherAssignment Component] setSelectedAssignedCourse', props<{ selectedCourse: Course }>());
export const setSelectedUnassignedCourse = createAction('[TeacherAssignment Component] setSelectedUnassignedCourse', props<{ selectedCourse: Course }>());
export const addTeacherAssignment = createAction('[TeacherAssignment Component] addTeacherAssignment', props<{ selectedTeacher: Teacher, selectedCourse: Course }>());
export const removeTeacherAssignment = createAction('[TeacherAssignment Component] removeTeacherAssignment', props<{ selectedTeacher: Teacher, selectedCourse: Course }>());

export const setSelectedStudentForEnrollment = createAction('[StudentEnrollment Component] setSelectedStudentForEnrollment', props<{ selectedStudent: Student }>());
export const setSelectedEnrolledCourse = createAction('[StudentEnrollment Component] setSelectedEnrolledCourse', props<{ selectedCourse: Course }>());
export const setSelectedUnenrolledCourse = createAction('[StudentEnrollment Component] setSelectedUnenrolledCourse', props<{ selectedCourse: Course }>());
export const addStudentEnrollment = createAction('[StudentEnrollment Component] addStudentEnrollment', props<{ selectedStudent: Student, selectedCourse: Course }>());
export const removeStudentEnrollment = createAction('[StudentEnrollment Component] removeStudentEnrollment', props<{ selectedStudent: Student, selectedCourse: Course }>());

export const loadData = createAction('[NgrxDemoRoot Component] load data');
export const loadedData = createAction('[NgrxDemoRoot Component] loaded data', props<{ data: NgrxDemoState }>());
