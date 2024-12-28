import React, { memo } from "react";
import { FormikProps } from "formik";
import { LoginUser } from "@/types/userTypes";
import useToggle from "@/hooks/useToggle";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ErrorMessage from "@/components/ErrorMessage";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import isFieldValid from "@/utils/isFieldValid";
import { Button } from "@/components/ui/button";

type LoginFormProps = {
  formik: FormikProps<LoginUser>;
  errorFields: Set<string>;
};

const LoginForm: React.FC<LoginFormProps> = memo(({ formik, errorFields }) => {
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
          <ErrorMessage<LoginUser>
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
                  "text-red-600": isFieldValid("password", formik, errorFields),
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
        <ErrorMessage
          field="password"
          formik={formik}
          errorFields={errorFields}
        />
        <Button
          type="submit"
          title="Login"
          variant="submit"
          size="submitBtn"
          disabled={formik.isSubmitting}
          aria-label="Login button"
        >
          {formik.isSubmitting ? "Loading.." : "Login"}
        </Button>
      </div>
    </form>
  );
});

export default LoginForm;
