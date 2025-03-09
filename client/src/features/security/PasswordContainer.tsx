/* eslint-disable react-refresh/only-export-components */
import React from "react";
import useStore from "@/hooks/useStore";
import {
  initialForgottenPasswordStep1,
  confirmForgottenPasswordStep2,
} from "./schemas/formSchema";
import { useFormik } from "formik";
import PasswordForm from "./components/forms/PasswordForm";
import { observer } from "mobx-react-lite";
import { ForgottenPasswordFlow } from "@/types/auth";
import { sessionStore } from "@/stores";

const PasswordContainer: React.FC = () => {
  const { authStore } = useStore();
  const { errorFields } = authStore;

  const initialValues: ForgottenPasswordFlow = {
    email: "",
    password: "",
    confirm_password: "",
  };

  const isActive = sessionStore.isForgottenPasswordActive;

  const validationSchema =
    isActive === false
      ? initialForgottenPasswordStep1
      : confirmForgottenPasswordStep2;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      if (isActive === false) {
        await authStore.forgottenPassword(values.email, actions.setErrors);
      } else {
        await authStore.confirmForgottenPassword(values, actions.setErrors);
      }
    },
  });

  return (
    <PasswordForm
      formik={formik}
      errorFields={errorFields}
      isActive={isActive}
    />
  );
};

export default observer(PasswordContainer);
