/* eslint-disable react-refresh/only-export-components */
import React from "react";
import useStore from "@/hooks/useStore";
import { forgottenPasswordStep1 } from "./schemas/formSchema";
import { useFormik } from "formik";
import PasswordForm from "./components/forms/PasswordForm";
import { ForgottenPassword } from "@/types/userTypes";
import { observer } from "mobx-react-lite";

const PasswordContainer: React.FC = () => {
  const { authStore } = useStore();
  const { errorFields } = authStore;

  const initialValues: ForgottenPassword = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = forgottenPasswordStep1;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      const response = await authStore.forgottenPassword(
        values.email,
        actions.setErrors
      );

      if (response) {
        console.log("Alright, we");
      }
    },
  });

  return <PasswordForm formik={formik} errorFields={errorFields} />;
};

export default observer(PasswordContainer);
