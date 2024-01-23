import { StudentType } from "./reducer";

export const listStudentSelector = (state: StudentType[]) => state;
export const getStudentSelector = (state: StudentType[], idStudent: string) => state.find(student => student.id === idStudent);

