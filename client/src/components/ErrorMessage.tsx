import { memo } from "react";
import { FormikProps } from "formik";
import { RegisterFormData } from "@/features/security/schemas/register";

interface ErrorMessageProps {
  formik: FormikProps<RegisterFormData>;
  field: keyof RegisterFormData;
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
