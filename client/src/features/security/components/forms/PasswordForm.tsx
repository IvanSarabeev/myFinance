import React from "react";
import { FormikProps } from "formik";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import isFieldValid from "@/utils/isFieldValid";
import { Input } from "@/components/ui/input";
import ErrorMessage from "@/components/ErrorMessage";
import { ForgottenPassword } from "@/types/userTypes";
import { Button } from "@/components/ui/button";

type ForggotenPasswordFormProps = {
  formik: FormikProps<ForgottenPassword>;
  errorFields: Set<string>;
};

const PasswordForm: React.FC<ForggotenPasswordFormProps> = ({
  formik,
  errorFields,
}) => {
  const handleInvalidData =
    (field: string) => (event: React.FormEvent<HTMLInputElement>) => {
      if (errorFields.has(field)) {
        event.preventDefault();
      }
    };

  return (
    <form
      method="POST"
      onSubmit={formik.handleSubmit}
      className="regular-12 lg:regular-14 font-sans"
    >
      <div className="space-y-2 lg:space-y-3">
        <div className="space-y-2">
          <div className="size-full flexBetween">
            <Label
              htmlFor="email"
              aria-label="Email Label"
              className={cn(
                "regular-14 lg:regular-16 2xl:regular-18 font-semibold",
                {
                  "text-red-600": isFieldValid("email", formik, errorFields),
                }
              )}
            >
              Email address
            </Label>
          </div>
          <Input
            id="email"
            type="email"
            title="Email input"
            placeholder="Your email address"
            disabled={formik.isSubmitting}
            onInvalid={handleInvalidData("email")}
            className={cn("rounded-2xl border border-slate-200", {
              "input-error": isFieldValid("email", formik, errorFields),
            })}
            {...formik.getFieldProps("email")}
          />
          <ErrorMessage<ForgottenPassword>
            formik={formik}
            field="email"
            errorFields={errorFields}
          />
        </div>
        <Button
          type="submit"
          title="password reset"
          variant="submit"
          size="submitBtn"
          disabled={formik.isSubmitting}
          aria-label="Password reset button"
        >
          {formik.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PasswordForm;
