import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import LoginForm from "./components/forms/LoginForm";
import { useFormik } from "formik";
import { LoginUser } from "@/types/userTypes";
import { loginSchema } from "./schemas/formSchema";

const LoginContainer: React.FC = observer(() => {
  const [errorFields, setErrorFields] = useState<Set<string>>(new Set());
  const initialValues: LoginUser = {
    email: "jacob@example.com",
    password: "Deverge@312",
  };

  const validationSchema = loginSchema;

  const formik = useFormik<LoginUser>({
    initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      console.log(values, actions);

      setErrorFields(new Set(values.email));
    },
  });

  return <LoginForm formik={formik} errorFields={errorFields} />;
});

export default LoginContainer;
