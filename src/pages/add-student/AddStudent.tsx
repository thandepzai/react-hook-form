import React from "react";
import FormInput from "../../components/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { StudentType } from "../../redux/reducer";
import { getStudentSelector } from "../../redux/selectors";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addStudent, editStudent } from "../../redux/action";
import { Slide, toast } from "react-toastify";

export default function AddStudent() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const getStudent = useSelector((state: StudentType[]) =>
    getStudentSelector(state, id as string)
  );

  const handleUpdateStudent = (student: StudentType) => {
    dispatch(editStudent(student));
    toast('🦄 Chỉnh sửa thành viên thành công', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
      });
    setTimeout(() => {
      navigate('/')
    }, 1500);
  };

  const handleAddStudent = (student: StudentType) => {
    dispatch(addStudent(student));
    toast('🦄 Thêm thành viên thành công', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
      });
    setTimeout(() => {
      navigate('/')
    }, 1500);
  };
  return (
    <div>
      <div className="w-2/3 md:w-3/5 mt-2 mx-auto">
        <Link
          to={"/"}
          className="rounded-lg bg-blue-400 hover:bg-blue-500 px-4 py-2 mt-20"
        >
          Quay lại
        </Link>
      </div>
      {id ? (
        <FormInput
          handleSubmitForm={handleUpdateStudent}
          id={id}
          studentInfor={getStudent}
        />
      ) : (
        <FormInput handleSubmitForm={handleAddStudent} />
      )}
    </div>
  );
}
