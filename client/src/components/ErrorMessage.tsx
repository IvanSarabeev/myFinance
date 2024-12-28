import React from "react";
import { FormikProps } from "formik";
import { capitalizeFirstLetter } from "@/lib/utils";

interface ErrorMessageProps<T extends object> {
  field: keyof T;
  formik: FormikProps<T>;
  errorFields: Set<string>;
}

// Genereic Type Component in order to make the component reusable across the application
const ErrorMessage = <T extends object>({
  formik,
  field,
  errorFields,
}: ErrorMessageProps<T>): JSX.Element => {
  const errorValues = Array.from(errorFields.values())[0];
  const errorMessage =
    typeof formik.errors[field] === "string" ? formik.errors[field] : undefined;
  // errorMessage, has a Type Guard, because otherwise it doesn't read the [field] as string, before rendering

  return (
    <React.Fragment>
      {formik.touched[field] &&
        (formik.errors[field] || errorFields.has(field as string)) && (
          <div className="text-red-600">
            {errorMessage ??
              `Existing ${capitalizeFirstLetter(errorValues ?? "")}`}
            <span
              title={`required ${String(field)}`}
              aria-label={`Required ${String(field)} input`}
            >
              *
            </span>
          </div>
        )}
    </React.Fragment>
  );
};

export default ErrorMessage;
