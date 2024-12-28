import React from "react";
import { observer } from "mobx-react-lite";
import LoginForm from "./components/forms/LoginForm";
import { useFormik } from "formik";
import { LoginUser } from "@/types/userTypes";
import { loginSchema } from "./schemas/formSchema";
import useStore from "@/hooks/useStore";
import useRedirect from "@/hooks/useRedirect";

const LoginContainer: React.FC = observer(() => {
  const { authStore } = useStore();
  const redirectToRoute = useRedirect("/");

  const initialValues: LoginUser = {
    email: "jacob@example.com",
    password: "Deverge@312",
  };

  const validationSchema = loginSchema;

  const formik = useFormik<LoginUser>({
    initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      await authStore.loginUser(values, actions.setErrors);

      console.log("Check the data", authStore.data);

      if (authStore.data?.status) {
        actions.resetForm();
        if (redirectToRoute) {
          return redirectToRoute();
        }
      }
    },
  });

  return <LoginForm formik={formik} errorFields={authStore.errorFields} />;
});

export default LoginContainer;
