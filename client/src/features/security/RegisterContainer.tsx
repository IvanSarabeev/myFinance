import React from "react";
import { observer } from "mobx-react-lite";
import useStore from "@/hooks/useStore";
import { useFormik } from "formik";
import { RegisterUser } from "@/types/userTypes";
import { registerSchema } from "./schemas/formSchema";
import RegisterForm from "./components/forms/RegisterForm";
import RequestEmailValidationModal from "./components/RequestEmailValidationModal";

const RegisterContainer: React.FC = observer(() => {
  const { authStore } = useStore();

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

  return (
    <React.Fragment>
      <RegisterForm formik={formik} errorFields={authStore.errorFields} />
      {authStore.showRequestEmailValidationModal && (
        <RequestEmailValidationModal
          isModalOpen={authStore.showRequestEmailValidationModal}
          message={authStore.authData?.message ?? ""}
          onClose={() => authStore.closeRequestEmailValidationModal()}
        />
      )}
    </React.Fragment>
  );
});

export default RegisterContainer;
