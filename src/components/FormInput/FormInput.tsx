import React, { useState } from "react";
import { useForm, Controller, DefaultValues } from "react-hook-form";
import { IoEyeOffSharp, IoEyeOutline } from "react-icons/io5";
import { FaAngleLeft } from "react-icons/fa";
import { motion } from "framer-motion";

import {
  checkValidateProvince,
  checkValidateSchoolWithProvince,
  getListSchoolWithProvince,
  getProvince,
} from "../../data/list-school";
import { StudentType } from "../../redux/reducer";
import { useSelector } from "react-redux";
import { listStudentSelector } from "../../redux/selectors";

type Gender = "man" | "woman" | "other";

export type FormValues = {
  name: string;
  facebook: string;
  username: string;
  phone: string;
  email: string;
  password: string;
  passwordConfirm: string;
  dob: string;
  gender: Gender;
  province: string;
  school: string;
};

export const defaultFormValues: DefaultValues<FormValues> = {
  name: "",
  facebook: "",
  username: "",
  phone: "",
  email: "",
  password: "",
  passwordConfirm: "",
  dob: "",
  province: "",
  school: "",
  gender: "man",
};

const variants = {
  left: { rotate: 0, transition: { duration: 0.3 } },
  down: { rotate: -90, transition: { duration: 0.3 } },
};

const variantsDiv = {
  open: {
    scaleY: 1,
    y: ["-50%", "0%"],
    opacity: 1,
    transition: { duration: 0.3 },
  },
  close: {
    scaleY: 0,
    y: ["0%", "-50%"],
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const TagGender = React.memo(
  ({
    gender,
    value,
    title,
    onChange,
  }: {
    gender: Gender;
    value: Gender;
    title: string;
    onChange: (e: Gender) => void;
  }) => {
    return (
      <button
        type="button"
        className={`text-white ${
          value === gender ? "bg-yellow-600" : "bg-yellow-400"
        } hover:bg-yellow-600 font-medium rounded-xl text-sm px-5 py-1.5 me-2 mb-2`}
        onClick={() => onChange(gender)}
      >
        {title}
      </button>
    );
  }
);

interface FormInputInterface {
  handleSubmitForm: (student: StudentType) => void;
  id?: string;
  studentInfor?: StudentType;
}

export default function FormInput(props: FormInputInterface) {
  const { handleSubmitForm, studentInfor, id } = props;
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: id?  {...studentInfor, passwordConfirm: studentInfor?.password}: defaultFormValues,
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [focusProvinces, setFocusProvinces] = useState(false);
  const [focusSchool, setFocusSchool] = useState(false);

  const listStudent = useSelector(listStudentSelector);

  const onSubmit = (data: FormValues) => {
    const { passwordConfirm, ...dataPush } = data;
    if (id) {
      handleSubmitForm({ id, ...dataPush });
    } else {
      const maxId = listStudent.reduce((max, student) => {
        return Math.max(max, Number(student.id));
      }, 0);
      handleSubmitForm({ id: String(maxId + 1), ...dataPush });
    }
  };
  const handleChangePassword = (type: boolean) => {
    if (type) {
      setShowPassword((prev) => ({ ...prev, password: !prev.password }));
    } else {
      setShowPassword((prev) => ({
        ...prev,
        confirmPassword: !prev.confirmPassword,
      }));
    }
  };

  return (
    <div className="w-2/3 md:w-3/5 mx-auto">
      <div className="items-center my-[10vh] text-center relative">
        <h2 className="mb-5 text-gray-900 font-mono font-bold text-2xl">
          Đăng ký thành viên mới
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="name"
            rules={{
              required: { value: true, message: "Không để trống" },
              pattern: {
                value:
                  /[^a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/g,
                message: "Họ và tên chỉ bao gồm các chữ",
              },
            }}
            render={({ field, fieldState: { invalid } }) => {
              return (
                <div className="mb-4 w-full">
                  <div className="mb-1 flex gap-4 justify-between items-end">
                    Họ và tên
                  </div>
                  <div
                    className={`w-full h-11 rounded-lg bg-[#F2F5F9] border text-secondary-typo shadow-[0px_1px_1px_rgba(0,0,0,0.1)] flex items-center  ${
                      errors.name?.message && "border-red-500"
                    } `}
                  >
                    <input
                      type="text"
                      className="grow bg-transparent rounded-lg h-full placeholder:text-[#99AEBE] px-4 focus: outline-none"
                      placeholder="Họ và tên"
                      {...field}
                    />
                  </div>
                  <div className="shrink text-left mt-1 text-base text-red-500 font-medium">
                    {errors.name?.message}
                  </div>
                </div>
              );
            }}
          />

          <Controller
            control={control}
            name="username"
            rules={{
              required: { value: true, message: "Không để trống" },
              pattern: {
                value: /^[a-z0-9]+$/,
                message: "Username chỉ bao gồm chữ thường và số",
              },
            }}
            render={({ field }) => {
              return (
                <div className="mb-4 w-full">
                  <div className="mb-1 flex gap-4 justify-between items-end">
                    Tên tài khoản
                  </div>
                  <div
                    className={`w-full h-11 rounded-lg bg-[#F2F5F9] border text-secondary-typo shadow-[0px_1px_1px_rgba(0,0,0,0.1)] flex items-center  ${
                      errors.username?.message && "border-red-500"
                    } `}
                  >
                    <input
                      type="text"
                      className="grow bg-transparent rounded-lg h-full placeholder:text-[#99AEBE] px-4 focus: outline-none"
                      placeholder="Tên tài khoản"
                      {...field}
                    />
                  </div>
                  <div className="shrink text-left mt-1 text-base text-red-500 font-medium">
                    {errors.username?.message}
                  </div>
                </div>
              );
            }}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: { value: true, message: "Không để trống" } }}
            render={({ field }) => {
              return (
                <div className="mb-4 w-full">
                  <div className="mb-1 flex gap-4 justify-between items-end">
                    Mật khẩu
                  </div>
                  <div
                    className={`w-full h-11 rounded-lg bg-[#F2F5F9] border text-secondary-typo shadow-[0px_1px_1px_rgba(0,0,0,0.1)] flex items-center  ${
                      errors.password?.message && "border-red-500"
                    } `}
                  >
                    <input
                      type={showPassword.password ? "text" : "password"}
                      className="grow bg-transparent rounded-lg h-full placeholder:text-[#99AEBE] px-4 focus: outline-none"
                      placeholder="Mật khẩu"
                      {...field}
                    />
                    <div
                      className="w-12 h-full flex justify-center items-center cursor-pointer group text-xl opacity-50"
                      onClick={() => handleChangePassword(true)}
                    >
                      {showPassword.password ? (
                        <IoEyeOutline />
                      ) : (
                        <IoEyeOffSharp />
                      )}
                    </div>
                  </div>
                  <div className="shrink text-left mt-1 text-base text-red-500 font-medium">
                    {errors.password?.message}
                  </div>
                </div>
              );
            }}
          />

          <Controller
            control={control}
            name="passwordConfirm"
            rules={{
              required: { value: true, message: "Không để trống" },
              validate: (fieldValue) => {
                return (
                  fieldValue === watch("password") ||
                  "Mật khẩu không trùng khớp"
                );
              },
            }}
            render={({ field }) => {
              return (
                <div className="mb-4 w-full">
                  <div
                    className="mb-1 flex gap-4 justify-between items-end"
                    contentEditable={false}
                  >
                    Xác nhận mật khẩu
                  </div>
                  <div
                    className={`w-full h-11 rounded-lg bg-[#F2F5F9] border text-secondary-typo shadow-[0px_1px_1px_rgba(0,0,0,0.1)] flex items-center  ${
                      errors.passwordConfirm?.message && "border-red-500"
                    } `}
                  >
                    <input
                      type={showPassword.confirmPassword ? "text" : "password"}
                      className="grow bg-transparent rounded-lg h-full placeholder:text-[#99AEBE] px-4 focus:outline-none"
                      placeholder="Xác nhận lại mật khẩu"
                      {...field}
                    />
                    <div
                      className="w-12 h-full flex justify-center items-center cursor-pointer group text-xl opacity-50"
                      onClick={() => handleChangePassword(false)}
                    >
                      {showPassword.confirmPassword ? (
                        <IoEyeOutline />
                      ) : (
                        <IoEyeOffSharp />
                      )}
                    </div>
                  </div>
                  <div className="shrink text-left mt-1 text-base text-red-500 font-medium">
                    {errors.passwordConfirm?.message}
                  </div>
                </div>
              );
            }}
          />

          <Controller
            control={control}
            name="email"
            rules={{
              required: { value: true, message: "Không để trống" },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Nhập đúng định dạng email",
              },
            }}
            render={({ field }) => {
              return (
                <div className="mb-4 w-full">
                  <div className="mb-1 flex gap-4 justify-between items-end">
                    Email
                  </div>
                  <div
                    className={`w-full h-11 rounded-lg bg-[#F2F5F9] border text-secondary-typo shadow-[0px_1px_1px_rgba(0,0,0,0.1)] flex items-center  ${
                      errors.email?.message && "border-red-500"
                    } `}
                  >
                    <input
                      type="email"
                      className="grow bg-transparent rounded-lg h-full placeholder:text-[#99AEBE] px-4 focus:outline-none"
                      placeholder="Email"
                      {...field}
                    />
                  </div>
                  <div className="shrink text-left mt-1 text-base text-red-500 font-medium">
                    {errors.email?.message}
                  </div>
                </div>
              );
            }}
          />

          <Controller
            control={control}
            name="phone"
            rules={{
              required: { value: true, message: "Không để trống" },
              pattern: {
                value: /^\d{8,13}$/,
                message: "Nhập đúng định dạng số điện thoại từ 8 đến 13 số",
              },
            }}
            render={({ field }) => {
              return (
                <div className="mb-4 w-full">
                  <div className="mb-1 flex gap-4 justify-between items-end">
                    Số điện thoại
                  </div>
                  <div
                    className={`w-full h-11 rounded-lg bg-[#F2F5F9] border text-secondary-typo shadow-[0px_1px_1px_rgba(0,0,0,0.1)] flex items-center  ${
                      errors.phone?.message && "border-red-500"
                    } `}
                  >
                    <input
                      type="text"
                      className="grow bg-transparent rounded-lg h-full placeholder:text-[#99AEBE] px-4 focus:outline-none"
                      placeholder="Số điện thoại"
                      {...field}
                    />
                  </div>
                  <div className="shrink text-left mt-1 text-base text-red-500 font-medium">
                    {errors.phone?.message}
                  </div>
                </div>
              );
            }}
          />

          <Controller
            control={control}
            name="gender"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => {
              return (
                <div className="mb-4 w-full">
                  <div className="mb-1 flex gap-4 justify-between items-end">
                    Giới tính
                  </div>
                  <div className="w-full text-secondary-typo flex items-center5">
                    <TagGender
                      gender={"man"}
                      value={value}
                      title="Nam"
                      onChange={onChange}
                    />
                    <TagGender
                      gender={"woman"}
                      value={value}
                      title="Nữ"
                      onChange={onChange}
                    />
                    <TagGender
                      gender={"other"}
                      value={value}
                      title="Khác"
                      onChange={onChange}
                    />
                  </div>
                </div>
              );
            }}
          />

          <Controller
            control={control}
            name="dob"
            rules={{
              required: { value: true, message: "Không để trống" },
              pattern: {
                value: /^19\d{2}|20\d{2}$/,
                message: "Năm sinh không hợp lệ",
              },
            }}
            render={({ field }) => {
              return (
                <div className="mb-4 w-full">
                  <div className="mb-1 flex gap-4 justify-between items-end">
                    Năm sinh
                  </div>
                  <div
                    className={`w-full h-11 rounded-lg bg-[#F2F5F9] border text-secondary-typo shadow-[0px_1px_1px_rgba(0,0,0,0.1)] flex items-center  ${
                      errors.dob?.message && "border-red-500"
                    } `}
                  >
                    <input
                      type="number"
                      className="grow bg-transparent rounded-lg h-full placeholder:text-[#99AEBE] px-4 focus:outline-none"
                      placeholder="Năm sinh"
                      {...field}
                    />
                  </div>
                  <div className="shrink text-left mt-1 text-base text-red-500 font-medium">
                    {errors.dob?.message}
                  </div>
                </div>
              );
            }}
          />

          <div className="mb-4 w-full">
            <div className="mb-1 flex gap-4 justify-between items-end">
              Link Facebook
            </div>
            <div className="w-full h-11 rounded-lg bg-[#F2F5F9] border text-secondary-typo shadow-[0px_1px_1px_rgba(0,0,0,0.1)] flex items-center ">
              <Controller
                control={control}
                name="facebook"
                render={({ field }) => {
                  return (
                    <input
                      type="text"
                      className="grow bg-transparent rounded-lg h-full placeholder:text-[#99AEBE] px-4 focus:outline-none"
                      placeholder="Link Facebook"
                      {...field}
                    />
                  );
                }}
              />
            </div>
          </div>

          <Controller
            control={control}
            name="province"
            rules={{
              required: { value: true, message: "Không để trống" },
              validate: (filedValidate) => {
                return (
                  checkValidateProvince(filedValidate) || "Chọn đúng thành phố"
                );
              },
            }}
            render={({ field: { onChange, value } }) => {
              return (
                <div className="mb-4 w-full">
                  <div className="mb-1 flex gap-4 justify-between items-end">
                    Tỉnh thành
                  </div>
                  <div
                    className={`w-full h-11 rounded-lg bg-[#F2F5F9] border text-secondary-typo shadow-[0px_1px_1px_rgba(0,0,0,0.1)] flex items-center  ${
                      errors.province?.message && "border-red-500"
                    }`}
                  >
                    <input
                      type="text"
                      className="grow bg-transparent rounded-lg h-full placeholder:text-[#99AEBE] px-4 focus:outline-none"
                      placeholder="Tỉnh thành"
                      onFocus={() => setFocusProvinces(true)}
                      onBlur={() => setFocusProvinces(false)}
                      onChange={(e) => {
                        onChange(e);
                        setValue("school", "");
                      }}
                      value={value}
                    />
                    <motion.div
                      animate={focusProvinces ? "down" : "left"}
                      variants={variants}
                      className="w-12 h-full flex justify-center items-center group text-xl opacity-50"
                    >
                      <FaAngleLeft />
                    </motion.div>
                  </div>
                  <div className="shrink text-left mt-1 text-base text-red-500 font-medium">
                    {errors.province?.message}
                  </div>
                  <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={focusProvinces ? "open" : "close"}
                    variants={variantsDiv}
                    className="max-h-48 bg-white w-full absolute mt-1.5 shadow-md rounded-lg py-2 overflow-scroll z-20"
                  >
                    {getProvince(value).map((item, index) => (
                      <div
                        key={index}
                        className="w-full text-left px-4 py-2 hover:bg-slate-100 rounded-md"
                        onClick={() => onChange(item)}
                      >
                        {item}
                      </div>
                    ))}
                  </motion.div>
                </div>
              );
            }}
          />

          <Controller
            control={control}
            name="school"
            rules={{
              required: { value: true, message: "Không để trống" },
              validate: (filedValidate) => {
                return (
                  checkValidateSchoolWithProvince(
                    filedValidate,
                    watch("province")
                  ) || "Chọn đúng trường"
                );
              },
            }}
            render={({ field: { onChange, value } }) => {
              return (
                <div className="mb-4 w-full">
                  <div className="mb-1 flex gap-4 justify-between items-end">
                    Trường học
                  </div>
                  <div
                    className={`w-full h-11 rounded-lg  border text-secondary-typo shadow-[0px_1px_1px_rgba(0,0,0,0.1)] flex items-center  ${
                      watch("province") === ""
                        ? "bg-[#d7dade] cursor-not-allowed"
                        : "bg-[#F2F5F9]"
                    } ${errors.school?.message && "border-red-500"}`}
                  >
                    <input
                      type="text"
                      className={`grow bg-transparent rounded-lg h-full placeholder:text-[#99AEBE] px-4 focus:outline-none ${
                        watch("province") === "" && "cursor-not-allowed"
                      }`}
                      placeholder="Trường học"
                      onFocus={() => setFocusSchool(true)}
                      onBlur={() => setFocusSchool(false)}
                      onChange={onChange}
                      value={value}
                      disabled={watch("province") === ""}
                    />
                    <motion.div
                      animate={focusSchool ? "down" : "left"}
                      variants={variants}
                      className="w-12 h-full flex justify-center items-center group text-xl opacity-50 z-10"
                    >
                      <FaAngleLeft />
                    </motion.div>
                  </div>
                  <div className="shrink text-left mt-1 text-base text-red-500 font-medium">
                    {errors.school?.message}
                  </div>
                  <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={focusSchool ? "open" : "close"}
                    variants={variantsDiv}
                    className="max-h-48 bg-white w-full absolute mt-1.5 shadow-md rounded-lg py-2 overflow-scroll"
                  >
                    {getListSchoolWithProvince(value, watch("province")).map(
                      (item, index) => (
                        <div
                          key={index}
                          className="w-full text-left px-4 py-2 hover:bg-slate-100 rounded-md"
                          onClick={() => onChange(item)}
                        >
                          {item}
                        </div>
                      )
                    )}
                  </motion.div>
                </div>
              );
            }}
          />
          <input
            type="submit"
            className="mt-4 bg-slate-500 hover:bg-slate-700 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-full text-[19px]"
          />
        </form>
      </div>
    </div>
  );
}
