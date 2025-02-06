/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { observer } from "mobx-react-lite";
import useStore from "@/hooks/useStore";
import { useFormik } from "formik";
import { RegisterUser } from "@/types/userTypes";
import { registerSchema } from "./schemas/formSchema";
import RegisterForm from "./components/forms/RegisterForm";

const RegisterContainer: React.FC = () => {
  const { authStore } = useStore();
  const { errorFields } = authStore;

  const initialValues: RegisterUser = {
    name: "",
    email: "",
    password: "",
    terms: false,
  };
  const validationSchema = registerSchema;

  const formik = useFormik<RegisterUser>({
    initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      await authStore.registerUser(values, actions.setErrors);

      if (authStore.authData?.status) {
        actions.resetForm();
      }
    },
  });

  return <RegisterForm formik={formik} errorFields={errorFields} />;
};

export default observer(RegisterContainer);
