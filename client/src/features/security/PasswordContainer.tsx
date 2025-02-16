/* eslint-disable react-refresh/only-export-components */
import React from "react";
import useStore from "@/hooks/useStore";
import {
  forgottenPasswordStep1,
  forgottenPasswordStep2,
} from "./schemas/formSchema";
import { useFormik } from "formik";
import PasswordForm from "./components/forms/PasswordForm";
import { ForgottenPassword } from "@/types/userTypes";
import { observer } from "mobx-react-lite";
import { modalStore } from "@/stores";
import { MODAL_TYPES } from "@/defines";

const PasswordContainer: React.FC = () => {
  const { authStore, otpStore } = useStore();
  const { isVerified } = otpStore;
  const { errorFields } = authStore;

  const initialValues: ForgottenPassword = {
    email: "jacob@example.com",
    password: "",
    confirm_password: "",
  };

  const validationSchema = isVerified
    ? forgottenPasswordStep2
    : forgottenPasswordStep1;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      if (isVerified === false) {
        const response = await authStore.forgottenPassword(
          values.email,
          actions.setErrors
        );

        console.log("Response: ", response);
      } else {
        const response = await authStore.forgottenPassword(
          values.email,
          actions.setErrors
        );

        console.log("Confirmation: ", response);
      }
    },
  });

  return (
    <>
      <PasswordForm
        formik={formik}
        errorFields={errorFields}
        isVerified={isVerified}
      />
      <button
        onClick={() => modalStore.openModal(MODAL_TYPES.FORGOTTEN_PASSWORD)}
      >
        Open Modal
      </button>
    </>
  );
};

export default observer(PasswordContainer);
