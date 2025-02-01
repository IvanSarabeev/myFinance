/* eslint-disable react-refresh/only-export-components */
import React from "react";
import useStore from "@/hooks/useStore";
import { forgottenPasswordStep1 } from "./schemas/formSchema";
import { useFormik } from "formik";
import PasswordForm from "./components/forms/PasswordForm";
import { ForgottenPassword } from "@/types/userTypes";
import RequestEmailValidationModal from "./components/RequestEmailValidationModal";
import { observer } from "mobx-react-lite";

const PasswordContainer: React.FC = () => {
  const { authStore } = useStore();
  const { errorFields, showRequestEmailValidationModal } = authStore;

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

  return (
    <React.Fragment>
      <PasswordForm formik={formik} errorFields={errorFields} />
      {showRequestEmailValidationModal && (
        <RequestEmailValidationModal
          isModalOpen={showRequestEmailValidationModal}
          message="Email send"
          onClose={() => authStore.closeRequestEmailValidationModal()}
        />
      )}
    </React.Fragment>
  );
};

export default observer(PasswordContainer);
