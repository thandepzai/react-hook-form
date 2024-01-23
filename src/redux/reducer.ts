import { FormValues } from "../components/FormInput/FormInput";

export type StudentType = Omit<FormValues, "passwordConfirm"> & {id:string};

const initState: StudentType[] = [
  {
    id: "1",
    name: "Trần Văn Thân 1",
    facebook: "https://www.facebook.com/than.tran.5249",
    username: "cuthan2k1",
    phone: "0862403314",
    email: "cuthan2k1@gmail.com",
    password: "123456",
    dob: "2001",
    province: "Thành phố Hà Nội",
    school: "THCS Sơn Đà",
    gender: "man",
  },
  {
    id: "2",
    name: "Trần Văn Thân 2",
    facebook: "https://www.facebook.com/than.tran.5249",
    username: "cuthan2k1",
    phone: "0862403314",
    email: "cuthan2k1@gmail.com",
    password: "123456",
    dob: "2001",
    province: "Thành phố Hà Nội",
    school: "THCS Sơn Đà",
    gender: "man",
  },
  {
    id: "3",
    name: "Trần Văn Thân 3",
    facebook: "https://www.facebook.com/than.tran.5249",
    username: "cuthan2k1",
    phone: "0862403314",
    email: "cuthan2k1@gmail.com",
    password: "123456",
    dob: "2001",
    province: "Thành phố Hà Nội",
    school: "THCS Sơn Đà",
    gender: "man",
  },
  {
    id: "4",
    name: "Trần Văn Thân 4",
    facebook: "https://www.facebook.com/than.tran.5249",
    username: "cuthan2k1",
    phone: "0862403314",
    email: "cuthan2k1@gmail.com",
    password: "123456",
    dob: "2001",
    province: "Thành phố Hà Nội",
    school: "THCS Sơn Đà",
    gender: "man",
  },
  {
    id: "5",
    name: "Trần Văn Thân 5",
    facebook: "https://www.facebook.com/than.tran.5249",
    username: "cuthan2k1",
    phone: "0862403314",
    email: "cuthan2k1@gmail.com",
    password: "123456",
    dob: "2001",
    province: "Thành phố Hà Nội",
    school: "THCS Sơn Đà",
    gender: "man",
  },
];

const rootReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "studentManage/addStudent":
      console.log(action.payload)
      return [...state, action.payload];
    case "studentManage/editStudent":
      return state.map(student =>
        student.id === action.payload.id? action.payload : student
      );
    case "studentManage/deleteStudent": 
    return state.filter(student => student.id!== action.payload);
    default:
      return state;
  }
}

export default rootReducer;