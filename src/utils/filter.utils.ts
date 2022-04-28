import { IStudent } from "../models";

export type Getter = (student: IStudent) => string
export type GetStudentsTagged = (
  students: IStudent[],
  filteredStudents: IStudent[],
  tag: string,
  id: string) => {
    newStudents: IStudent[],
    newFilteredStudents: IStudent[]
  }

export const addStudentTag: GetStudentsTagged = (students: IStudent[],
  filteredStudents: IStudent[],
  tag: string,
  id: string) => {
  let index = 0;
  const found = students.find((student: IStudent) => student.id === id);
  let filteredIndex = 0;
  if (found) {
    index = students.indexOf(found);
    filteredIndex = filteredStudents.indexOf(found);
    found.tags.push(tag);
    students[index] = found;
    filteredStudents[filteredIndex] = found;
    return { newStudents: students, newFilteredStudents: filteredStudents };
  }
  return { newStudents: [], newFilteredStudents: [] };
};

export const filterStudent = (students: IStudent[],
  getter: Getter,
  value: string,) => {
  if (value === "") return students;

  const filtered = students.filter((student) => {
    const pattern = new RegExp(value, "i");
    const stringToFilter = getter(student)
    return stringToFilter.match(pattern)?.length;
  });
  return filtered;
};

export const getName = (student: IStudent) => {
  return `${student.firstName} ${student.lastName}`;
}

export const getTag = (student: IStudent) => {
  return `${student.tags.join(" ")}`;
}

export const filterByNameAndTag = (
  students: IStudent[],
  name: string,
  tag: string) => {
  const filteredByName = filterStudent(students, getName, name);
  return filterStudent(filteredByName, getTag, tag);
}
