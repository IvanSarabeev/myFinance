import React from "react";
import useToggle from "@/hooks/useToggle";
import { FormikProps } from "formik";
import { User } from "@/types/userTypes";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import ErrorMessage, { isFieldInvalid } from "@/components/ErrorMessage";

type RegisterFormProps = {
  formik: FormikProps<User>;
  errorFields: Set<string>;
};

const RegisterForm: React.FC<RegisterFormProps> = ({ formik, errorFields }) => {
  const [show, handleToggle] = useToggle();

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
          <Label
            htmlFor="name"
            aria-label="Name Label"
            className={cn(
              "regular-14 lg:regular-16 2xl:regular-18 font-semibold",
              {
                "text-red-600": isFieldInvalid("name", formik, errorFields),
              }
            )}
          >
            Name
          </Label>
          <Input
            id="name"
            type="text"
            title="Name input"
            placeholder="Your name"
            disabled={formik.isSubmitting}
            onInvalid={handleInvalidData("name")}
            className={cn("rounded-2xl border border-slate-200", {
              "input-error": isFieldInvalid("name", formik, errorFields),
            })}
            {...formik.getFieldProps("name")}
          />
          <ErrorMessage
            formik={formik}
            field="name"
            errorFields={errorFields}
          />
        </div>
        <div className="space-y-2">
          <div className="size-full flexBetween">
            <Label
              htmlFor="email"
              aria-label="Email Label"
              className={cn(
                "regular-14 lg:regular-16 2xl:regular-18 font-semibold",
                {
                  "text-red-600": isFieldInvalid("email", formik, errorFields),
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
              "input-error": isFieldInvalid("email", formik, errorFields),
            })}
            {...formik.getFieldProps("email")}
          />
          <ErrorMessage
            formik={formik}
            field="email"
            errorFields={errorFields}
          />
        </div>

        <div className="flexColStart space-y-1">
          <span className="w-full h-fit flexBetween regular-14 lg:regular-16">
            <Label
              htmlFor="password"
              aria-label="Password input"
              className={cn(
                "regular-14 lg:regular-16 2xl:regular-18 font-semibold",
                {
                  "text-red-600": isFieldInvalid(
                    "password",
                    formik,
                    errorFields
                  ),
                }
              )}
            >
              Password
            </Label>
            <Link
              to={"/forgotten-password"}
              title="Forgotten password link"
              aria-label="fogotten password link"
              className="text-blue-600 common-transition hover:blue-700 hover:underline focus:underline focus-visible:outline-none"
            >
              Forgot password?
            </Link>
          </span>
        </div>

        <div className="relative w-full h-fit my-2">
          <Input
            id="password"
            title="Password input"
            type={show ? "text" : "password"}
            placeholder="Your password"
            disabled={formik.isSubmitting}
            className={cn("rounded-2xl border border-slate-200", {
              "input-error": formik.touched.password && formik.errors.password,
            })}
            {...formik.getFieldProps("password")}
          />
          <span className="absolute inset-y-1/3 right-[3%]">
            <Eye
              onClick={handleToggle}
              aria-label="toggle password input"
              className={cn(
                "size-4 stroke-slate-400 common-transition duration-150 hover:cursor-pointer hover:scale-105 hover:stroke-slate-600",
                {
                  "stroke-red-600": isFieldInvalid(
                    "password",
                    formik,
                    errorFields
                  ),
                }
              )}
            />
          </span>
        </div>
        <ErrorMessage
          formik={formik}
          field="password"
          errorFields={errorFields}
        />
      </div>
      <div className="flexColStart space-y-1 my-4 lg:my-5">
        <div className="inline-flex items-center gap-x-2">
          <Checkbox
            id="terms"
            title="terms"
            disabled={formik.isSubmitting}
            checked={formik.values.terms}
            className={cn("border-slate-700", {
              "border-slate-700": isFieldInvalid("terms", formik, errorFields),
            })}
            {...formik.getFieldProps("terms")}
          />
          <Label
            htmlFor="terms"
            aria-label="terms"
            className={cn(
              "regular-12 lg:regular-14 2xl:regular-16 text-slate-800",
              {
                "input-error": isFieldInvalid("terms", formik, errorFields),
              }
            )}
          >
            I agree to the <span className="underline">Terms & Policy</span>
          </Label>
        </div>
        <ErrorMessage formik={formik} field="terms" errorFields={errorFields} />
      </div>
      <Button
        type="submit"
        title="Register"
        variant="submit"
        size="submitBtn"
        disabled={formik.isSubmitting}
        aria-label="Register button"
      >
        {formik.isSubmitting ? "Loading.." : "Register"}
      </Button>
    </form>
  );
};

export default RegisterForm;
