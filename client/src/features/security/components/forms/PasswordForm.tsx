/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { FormikProps } from "formik";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import isFieldValid from "@/utils/validateFormField";
import { Input } from "@/components/ui/input";
import ErrorMessage from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import { ConfirmForgottenPasswordData } from "@/types/auth";
import useToggle from "@/hooks/useToggle";
import { Eye } from "lucide-react";
import { observer } from "mobx-react-lite";

type ForggotenPasswordFormProps = {
  formik: FormikProps<ConfirmForgottenPasswordData>;
  errorFields: Set<string>;
  isActive: boolean;
};

const PasswordForm: React.FC<ForggotenPasswordFormProps> = ({
  formik,
  errorFields,
  isActive,
}) => {
  const [show, handleToggle] = useToggle();

  const handleInvalidData =
    (field: string) => (event: React.FormEvent<HTMLInputElement>) => {
      if (errorFields.has(field)) {
        event.preventDefault();
      }
    };

  const { password, confirm_password } = formik.values;

  const isButtonDisabled =
    formik.values.email.length === 0 ||
    (isActive &&
      (password.length === 0 ||
        confirm_password.length === 0 ||
        confirm_password.length !== password.length)) ||
    formik.isSubmitting;

  return (
    <form
      method="POST"
      onSubmit={formik.handleSubmit}
      className="regular-12 lg:regular-14 font-sans"
    >
      <div className="flexCol gap-y-2 lg:gap-y-3">
        <div className="size-full flexColStart gap-y-2">
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
          <ErrorMessage<ConfirmForgottenPasswordData>
            formik={formik}
            field="email"
            errorFields={errorFields}
          />
        </div>

        {isActive && (
          <React.Fragment>
            <div className="space-y-2">
              <div className="size-full flexColStart gap-y-2">
                <Label
                  htmlFor="password"
                  aria-label="Password"
                  className={cn(
                    "regular-14 lg:regular-16 2xl:regular-18 font-semibold",
                    {
                      "text-red-600": isFieldValid(
                        "password",
                        formik,
                        errorFields
                      ),
                    }
                  )}
                >
                  Password
                </Label>
                <div className="relative w-full h-fit my-2">
                  <Input
                    id="password"
                    type={show ? "text" : "password"}
                    title="Enter your new Password"
                    placeholder="Enter your password"
                    disabled={formik.isSubmitting}
                    onInvalid={handleInvalidData("password")}
                    className={cn("rounded-2xl border border-slate-200", {
                      "input-error": isFieldValid(
                        "password",
                        formik,
                        errorFields
                      ),
                    })}
                    {...formik.getFieldProps("password")}
                  />
                  <span className="absolute inset-y-1/3 right-[3%]">
                    <Eye
                      onClick={handleToggle}
                      aria-label="toggle password input"
                      className={cn(
                        "size-4 stroke-slate-400 common-transition duration-150 hover:cursor-pointer hover:scale-110 hover:stroke-slate-600",
                        {
                          "stroke-red-600": isFieldValid(
                            "password",
                            formik,
                            errorFields
                          ),
                        }
                      )}
                    />
                  </span>
                </div>
                <ErrorMessage<ConfirmForgottenPasswordData>
                  formik={formik}
                  field="password"
                  errorFields={errorFields}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="size-full flexColStart gap-y-2">
                <Label
                  htmlFor="confirm_password"
                  aria-label="Confirm password"
                  className={cn(
                    "regular-14 lg:regular-16 2xl:regular-18 font-semibold",
                    {
                      "text-red-600": isFieldValid(
                        "confirm_password",
                        formik,
                        errorFields
                      ),
                    }
                  )}
                >
                  Confirm Password
                </Label>
                <div className="relative w-full h-fit my-2">
                  <Input
                    id="confirm_password"
                    type={show ? "text" : "password"}
                    title="Confirm Password"
                    placeholder="Confirm your password"
                    disabled={formik.isSubmitting}
                    onInvalid={handleInvalidData("confirm_password")}
                    className={cn("rounded-2xl border border-slate-200", {
                      "input-error": isFieldValid(
                        "confirm_password",
                        formik,
                        errorFields
                      ),
                    })}
                    {...formik.getFieldProps("confirm_password")}
                  />
                  <span className="absolute inset-y-1/3 right-[3%]">
                    <Eye
                      onClick={handleToggle}
                      aria-label="toggle password input"
                      className={cn(
                        "size-4 stroke-slate-400 common-transition duration-150 hover:cursor-pointer hover:scale-110 hover:stroke-slate-600",
                        {
                          "stroke-red-600": isFieldValid(
                            "confirm_password",
                            formik,
                            errorFields
                          ),
                        }
                      )}
                    />
                  </span>
                </div>
                <ErrorMessage
                  field="confirm_password"
                  formik={formik}
                  errorFields={errorFields}
                />
              </div>
            </div>
          </React.Fragment>
        )}

        <Button
          type="submit"
          title="password reset"
          variant="submit"
          size="submitBtn"
          disabled={isButtonDisabled}
          aria-label="Password reset button"
          className="mt-2 lg:mt-4"
        >
          {formik.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default observer(PasswordForm);
