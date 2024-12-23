import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useFormik } from "formik";
import { User } from "@/types/userTypes";
import { registerSchema } from "../schemas/register";
import { registerUser } from "@/app/api/auth";
import useStore from "@/hooks/useStore";
import RegisterForm from "./forms/RegisterForm";
import { NOTIFICATION_TYPES } from "@/types/commonTypes";
import { HTTP_RESPONSE_STATUS } from "@/defines";
import RequestEmailValidationModal from "./RequestEmailValidationModal";

type ResponseData = {
  status: boolean;
  showModal: boolean;
  message: string;
  token?: string;
  errorFields?: string[];
};

const RegisterContainer: React.FC = () => {
  const { userStore, commonStore } = useStore();
  const { openNotification } = commonStore;
  const { setUser } = userStore;

  const [isLoading, setIsLoading] = useState(false);
  const [errorFields, setErrorFields] = useState<Set<string>>(new Set());
  const [data, setData] = useState<ResponseData | null>(null);

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
      try {
        return await registerUser(values)
          .then((response) => {
            setErrorFields(new Set());
            setIsLoading(true);

            if (
              response.data.status &&
              response.status === HTTP_RESPONSE_STATUS.CREATED &&
              response.data.showModal
            ) {
              openNotification(
                NOTIFICATION_TYPES.SUCCESS,
                NOTIFICATION_TYPES.SUCCESS.toLocaleUpperCase(),
                response.data.message
              );

              setData(response.data);
              setUser(values); // TODO | Fix the User Store, currently not working
              actions.resetForm();
            }
          })
          .catch((error) => {
            setIsLoading(false);

            if (error.response) {
              const response = error.response;

              if (response) {
                openNotification(
                  NOTIFICATION_TYPES.DESTRUCTIVE,
                  NOTIFICATION_TYPES.ERROR.toLocaleUpperCase(),
                  response.message
                );

                setData(response);

                if (
                  Array.isArray(response.errorFields) &&
                  response.errorFields.length > 0
                ) {
                  actions.setErrors(response.errorFields); // Merge Error into Formik's
                  setErrorFields(new Set(response.errorFields));
                }
              }
            } else {
              // Network Error or Unexpected Error
              openNotification(
                NOTIFICATION_TYPES.DESTRUCTIVE,
                NOTIFICATION_TYPES.ERROR.toUpperCase(),
                error.message ||
                  "An unexpected error occurred. Please try again."
              );
            }
          });
      } catch (error) {
        openNotification(
          NOTIFICATION_TYPES.DESTRUCTIVE,
          NOTIFICATION_TYPES.ERROR.toLocaleUpperCase(),
          "Ops! Sorry for the trouble an employee will contact you as soon as possible"
        );

        console.error("Catch Clause", error);
        return Promise.reject(Error("Server Under Maintaince"));
      }
    },
  });

  return (
    <>
      <RegisterForm formik={formik} errorFields={errorFields} />
      <RequestEmailValidationModal
        showDialog={isLoading}
        message={data?.message ?? "Check me"}
      />
    </>
  );
};

export default observer(RegisterContainer);
