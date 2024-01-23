import { ReactNode } from "react";

export interface FormInputModal {
  placeholder: string;
  type: React.HTMLInputTypeAttribute | undefined;
  key: string;
  value: string;
}

export type FormModalProps = {
  listFormInput: FormInputModal[];
  setListFormInput: React.Dispatch<React.SetStateAction<FormInputModal[]>>;
  actionModal: () => void;
  buttonNameModal: string;
};

export type ChooseModalProps = {
  actionFirst: () => void;
  actionSecond: () => void;
  nameActionFirst: string;
  nameActionSecond: string;
};

type ModalProps = {
  open: boolean;
  changeOpen: () => void;
  title: string;
  status: "form" | "choose" | "custom";
};

type FormModalPropsForm = ModalProps &
  FormModalProps & {
    status: "form";
  };

type FormModalPropsChoose = ModalProps &
  ChooseModalProps & {
    status: "choose";
  };

type FormModalPropsCustom = ModalProps & {
  status: "custom";
  children: ReactNode;
};

export type ModalPropsUnion =
  | FormModalPropsForm
  | FormModalPropsChoose
  | FormModalPropsCustom;
