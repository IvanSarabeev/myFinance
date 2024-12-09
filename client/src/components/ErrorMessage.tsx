import { memo } from "react";
import { FormikProps } from "formik";
import { User } from "@/types/userTypes";

interface ErrorMessageProps {
  formik: FormikProps<User>;
  field: keyof User;
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
