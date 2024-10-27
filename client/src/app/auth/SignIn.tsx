import React from "react";
import Layout from "../Layout";
import RegisterForm from "@/features/security/components/forms/RegisterForm";
import { Link } from "react-router-dom";

const SignIn: React.FC = () => {
  return (
    <Layout>
      <section className="flexColStart items-start flexCenter padding-container max-container">
        <h1 className="regular-18 lg:bold-20">Get Started Now</h1>
        <p className="regular-12 md:regular-14">
          Enter your credentials to access your account
        </p>
        <RegisterForm />
        <p>
          Have an account ? <Link to={"/login"}>Sign in</Link>
        </p>
      </section>
    </Layout>
  );
};

export default SignIn;
