import React from "react";
import LoginForm from "./components/forms/LoginForm";
import { loginSchema } from "./schemas/formSchema";
import { REDIRECT_ROUTES } from "@/defines";

// Libraries
import { observer } from "mobx-react-lite";
import { useFormik } from "formik";

// Hooks
import useStore from "@/hooks/useStore";
import useRedirect from "@/hooks/useRedirect";

// Types
import { LoginUser } from "@/types/userTypes";

const LoginContainer: React.FC = observer(() => {
  const { authStore } = useStore();
  const redirectToRoute = useRedirect();

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

      if (authStore.data?.status) {
        actions.resetForm();

        return redirectToRoute(REDIRECT_ROUTES.DASHBOARD);
      }
    },
  });

  return <LoginForm formik={formik} errorFields={authStore.errorFields} />;
});

export default LoginContainer;
