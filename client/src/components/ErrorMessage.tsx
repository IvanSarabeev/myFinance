import React, { memo } from "react";
import { FormikProps } from "formik";
import { User } from "@/types/userTypes";
import { capitalizeFirstLetter } from "@/lib/utils";

interface ErrorMessageProps {
  formik: FormikProps<User>;
  field: keyof User;
  errorFields: Set<string>;
}

export const isFieldInvalid = (
  field: keyof User,
  formik: FormikProps<User>,
  errorFields: Set<string>
) => {
  return (
    formik.touched[field] && (formik.errors[field] || errorFields.has(field))
  );
};

const ErrorMessage = memo(
  ({ formik, field, errorFields }: ErrorMessageProps) => {
    const errorValues = errorFields.values().next().value;

    return (
      <React.Fragment>
        {formik.touched[field] &&
          (formik.errors[field] || errorFields.has(field)) && (
            <div className="text-red-600">
              {formik.errors[field] ??
                `Existing ${capitalizeFirstLetter(errorValues ?? "")}`}
              <span
                title={`required ${field}`}
                aria-label={`Required ${field} input`}
              >
                *
              </span>
            </div>
          )}
      </React.Fragment>
    );
  }
);

export default ErrorMessage;
