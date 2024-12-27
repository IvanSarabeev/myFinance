import React from "react";
import { observer } from "mobx-react-lite";
import useStore from "@/hooks/useStore";
import { useFormik } from "formik";
import { User } from "@/types/userTypes";
import { registerSchema } from "./schemas/register";
import RegisterForm from "./components/forms/RegisterForm";
import RequestEmailValidationModal from "./components/RequestEmailValidationModal";

const TestContainer: React.FC = observer(() => {
  const { authStore, userStore, commonStore } = useStore();
  const { openNotification } = commonStore;
  const {
    showRequestEmailValidationModal,
    errorFields,
    data,
    registerUser,
    closeRequestEmailValidationModal,
  } = authStore;

  const initialValues: User = {
    name: "Jacob Smith",
    email: "jacob@example.com",
    password: "Deverge@312",
    terms: true,
  };
  const validationSchema = registerSchema;

  const formik = useFormik<User>({
    initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      await registerUser(
        values,
        userStore,
        openNotification,
        actions.setErrors
      );

      if (data?.status) {
        actions.resetForm();
      }
    },
  });
  return (
    <>
      <RegisterForm formik={formik} errorFields={errorFields} />
      {showRequestEmailValidationModal && (
        <RequestEmailValidationModal
          isModalOpen={showRequestEmailValidationModal}
          message={data?.message ?? ""}
          onClose={() => closeRequestEmailValidationModal()}
        />
      )}
    </>
  );
});

export default TestContainer;
