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
    onSubmit: async (values) => {
      console.log(values);

      alert(values);
    },
  });

  return (
    <form
      method="POST"
      onSubmit={formik.handleSubmit}
      className="regular-12 lg:regular-14 font-sans"
    >
      <div className="space-y-2 lg:space-y-4">
        <Label
          htmlFor="name"
          aria-label="Name Label"
          className="regular-14 lg:regular-16 font-semibold"
        >
          Name
        </Label>
        <Input
          id="name"
          type="text"
          title="Name input"
          placeholder="Your name"
          disabled={false} // TODO: Disable when the form is submitted or it's loading
          className="px-4 py-2 rounded-2xl border border-slate-200"
          {...formik.getFieldProps("name")}
        />
      </div>
      <div className="space-y-2 lg:space-y-4">
        <Label
          htmlFor="email"
          aria-label="Email Label"
          className="regular-14 lg:regular-16 font-semibold"
        >
          Email address
        </Label>
        <Input
          id="email"
          type="email"
          title="Email input"
          placeholder="Your email address"
          disabled={false} // TODO: Disable when the form is submitted or it's loading
          className="px-4 py-2 rounded-2xl border border-slate-200"
          {...formik.getFieldProps("email")}
        />
      </div>

      <div className="flexColStart space-y-1 md:space-y-2">
        <div className="w-full h-fit flexCol md:flex-row flexBetween">
          <Label
            htmlFor="password"
            aria-label="Password input"
            className="regular-14 lg:regular-16 font-semibold"
          >
            Password
          </Label>
          <Link
            title="Forgotten password link"
            aria-label="fogotten password link"
            className="text-blue-600 underline common-transition hover:blue-700"
            to={"/forgotten-password"}
          >
            Forgot password?
          </Link>
        </div>

        <div className="relative w-full h-fit">
          <Input
            id="password"
            title="Password input"
            type={show ? "text" : "password"}
            placeholder="Minimum 8 characters"
            className="px-4 py-2 rounded-2xl border border-slate-200"
            disabled={false} // TODO: Disable when the form is submitted or it's loading
            {...formik.getFieldProps("password")}
          />
          <span className="absolute inset-y-1/3 right-[3%]">
            <Eye
              aria-label="toggle password input"
              className="size-4 common-transition duration-150 hover:cursor-pointer hover:scale-105"
              onClick={handleToggle}
            />
          </span>
        </div>
      </div>

      <div className="inline-flex gap-x-2 mt-6">
        <Checkbox
          id="terms"
          title="terms"
          className="border-slate-900"
          {...formik.getFieldProps("terms")}
        />
        <Label
          htmlFor="terms"
          aria-label="terms"
          className="regular-12 lg:regular-14 font-semibold"
        >
          I agree to the <strong className="underline">Terms & Policy</strong>
        </Label>
      </div>

      <Button
        type="submit"
        title="Register"
        variant="submit"
        aria-label="Register button"
      >
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
