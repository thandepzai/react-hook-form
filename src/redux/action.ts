import { StudentType } from "./reducer";

export const addStudent = (data: StudentType) => {
  return {
    type: "studentManage/addStudent",
    payload: data,
  };
};

export const editStudent = (data: StudentType) => {
  return {
    type: "studentManage/editStudent",
    payload: data,
  };
}
export const deleteStudent = (id: String) => {
  return {
    type: "studentManage/deleteStudent",
    payload: id,
  };
}