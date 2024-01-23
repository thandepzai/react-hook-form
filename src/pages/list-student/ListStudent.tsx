import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listStudentSelector } from "../../redux/selectors";
import { Link } from "react-router-dom";
import ModalRef from "../../components/modalRef";
import { RefForModal } from "../../components/modalRef/ModalRef";
import { deleteStudent } from "../../redux/action";
import { toast } from "react-toastify";

export default function ListStudent() {
  const [idFocus, setIdFocus] = useState("");
  const dispatch = useDispatch();
  const listStudent = useSelector(listStudentSelector);

  const funcInputRef = useRef<RefForModal>({
    handleOpenAnimate: () => {},
    handleCloseAnimate: () => {},
  });
  const handleOpenModelDelete = (id: string) => {
    funcInputRef.current.handleOpenAnimate();
    setIdFocus(id);
  };
  const handleCloseModelDelete = () => {
    funcInputRef.current.handleCloseAnimate();
    setIdFocus("");
  };
  const handleDelete = () => {
    dispatch(deleteStudent(idFocus));
    funcInputRef.current.handleCloseAnimate();
    toast("🦄 Delete thành công!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="my-4 text-3xl font-bold w-full text-center text-pink-400">
          List Students
        </div>
        <div className="my-4">
          <Link
            to={"/add-student"}
            className="rounded-lg bg-blue-400 hover:bg-blue-500 px-4 py-2"
          >
            Add student
          </Link>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Dob
              </th>
              <th scope="col" className="px-6 py-3">
                Province
              </th>
              <th scope="col" className="px-6 py-3">
                School
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {listStudent.map((item, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-6 py-4">{item.id}</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.name}
                </th>
                <td className="px-6 py-4">{item.phone}</td>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.dob}</td>
                <td className="px-6 py-4">{item.province}</td>
                <td className="px-6 py-4">{item.school}</td>
                <td className="px-6 py-4">
                  <Link
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4"
                    to={`/add-student/${item.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    onClick={() => handleOpenModelDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalRef ref={funcInputRef} onBackdropPress={handleCloseModelDelete}>
        <div className="text-xl font-bold text-purple-400">
          Xác nhận xoá sinh viên này
        </div>
        <div className="flex justify-around mt-3">
          <button
            className="px-4 py-2 bg-slate-500 hover:bg-slate-600 font-bold rounded-lg text-white"
            onClick={handleCloseModelDelete}
          >
            Không
          </button>
          <button
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-bold"
            onClick={handleDelete}
          >
            Có
          </button>
        </div>
      </ModalRef>
    </div>
  );
}
