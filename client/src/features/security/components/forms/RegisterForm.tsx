import React from "react";
import { RegisterFormData, registerSchema } from "../../schemas/register";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const RegisterForm: React.FC = () => {
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
    <form method="POST" onSubmit={formik.handleSubmit}>
      <div>
        <Label>Name</Label>
        <Input {...formik.getFieldProps("name")} />
      </div>
      <div>
        <Label>Email address</Label>
        <Input {...formik.getFieldProps("email")} />
      </div>

      <div>
        <Label>Password</Label>
        <Input {...formik.getFieldProps("password")} />
      </div>

      <span>
        <Checkbox {...formik.getFieldProps("terms")} />
        <Label>
          I agree to the <strong>Terms & Policy</strong>
        </Label>
      </span>

      <Button
        type="submit"
        title="Register"
        aria-label="Register button"
        className="block"
      >
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
