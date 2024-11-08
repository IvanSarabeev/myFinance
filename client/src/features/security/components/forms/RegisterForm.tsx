import React from "react";
import { RegisterFormData, registerSchema } from "../../schemas/register";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import useToggle from "@/hooks/useToggle";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import MemoErrorMessage from "@/components/ErrorMessage";

const RegisterForm: React.FC = () => {
  const [show, handleToggle] = useToggle();

  const initialValues: RegisterFormData = {
    name: "",
    email: "",
    password: "",
    terms: false,
  };

  const validationSchema = registerSchema;

  const formik = useFormik<RegisterFormData>({
    initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      console.log(values);
      console.log(actions, actions.resetForm);

      alert(values);
    },
  });

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
                "text-red-600": formik.touched.name && formik.errors.name,
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
            className={cn("rounded-2xl border border-slate-200", {
              "input-error": formik.touched.name && formik.errors.name,
            })}
            {...formik.getFieldProps("name")}
          />
          <MemoErrorMessage formik={formik} field="name" />
        </div>
        <div className="space-y-2">
          <div className="size-full flexBetween">
            <Label
              htmlFor="email"
              aria-label="Email Label"
              className={cn(
                "regular-14 lg:regular-16 2xl:regular-18 font-semibold",
                {
                  "text-red-600": formik.touched.email && formik.errors.email,
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
            className={cn("rounded-2xl border border-slate-200", {
              "input-error": formik.touched.email && formik.errors.email,
            })}
            {...formik.getFieldProps("email")}
          />
          <MemoErrorMessage formik={formik} field="email" />
        </div>

        <div className="flexColStart space-y-1">
          <span className="w-full h-fit flexBetween regular-14 lg:regular-16">
            <Label
              htmlFor="password"
              aria-label="Password input"
              className={cn(
                "regular-14 lg:regular-16 2xl:regular-18 font-semibold",
                {
                  "text-red-600":
                    formik.touched.password && formik.errors.password,
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
            className={cn("rounded-2xl border border-slate-200", {
              "input-error": formik.touched.password && formik.errors.password,
            })}
            disabled={formik.isSubmitting}
            {...formik.getFieldProps("password")}
          />
          <span className="absolute inset-y-1/3 right-[3%]">
            <Eye
              onClick={handleToggle}
              aria-label="toggle password input"
              className={cn(
                "size-4 stroke-slate-400 common-transition duration-150 hover:cursor-pointer hover:scale-105 hover:stroke-slate-600",
                {
                  "stroke-red-600":
                    formik.touched.password && formik.errors.password,
                }
              )}
            />
          </span>
        </div>
        <MemoErrorMessage formik={formik} field="password" />
      </div>
      <div className="flexColStart space-y-1 my-4 lg:my-5">
        <div className="inline-flex items-center gap-x-2">
          <Checkbox
            id="terms"
            title="terms"
            disabled={formik.isSubmitting}
            checked={formik.values.terms}
            className={cn("border-slate-700", {
              "border-slate-700": formik.touched.terms && formik.errors.terms,
            })}
            {...formik.getFieldProps("terms")}
          />
          <Label
            htmlFor="terms"
            aria-label="terms"
            className={cn(
              "regular-12 lg:regular-14 2xl:regular-16 text-slate-800",
              {
                "input-error": formik.touched.terms && formik.errors.terms,
              }
            )}
          >
            I agree to the <span className="underline">Terms & Policy</span>
          </Label>
        </div>
        <MemoErrorMessage formik={formik} field="terms" />
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
