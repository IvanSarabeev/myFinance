import { memo } from "react";
import { FormikProps } from "formik";
import { UserSignUpData } from "@/types/userTypes";

interface ErrorMessageProps {
  formik: FormikProps<UserSignUpData>;
  field: keyof UserSignUpData;
}

const ErrorMessage = ({ formik, field }: ErrorMessageProps) => {
  return (
    <>
      {formik.touched[field] && formik.errors[field] ? (
        <div className="text-red-600">
          {formik.errors[field]}
          <span
            title={`required ${field}`}
            aria-label={`Required ${field} input`}
          >
            *
          </span>
        </div>
      ) : null}
    </>
  );
};

const MemoErrorMessage = memo(ErrorMessage);

export default MemoErrorMessage;
