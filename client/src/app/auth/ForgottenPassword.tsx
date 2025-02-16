import React from "react";
import Layout from "@/components/layouts/Layout";
import CloudinaryImage from "@/components/CloudinaryImage";
import PasswordContainer from "@/features/security/PasswordContainer";
import SideBackgroundSection from "@/components/SideBackgroundSection";
import ThirdPartyProvider from "@/components/ThirdPartyProvider";
import { Link } from "react-router";
import BrandSlider from "@/features/security/components/BrandSlider";

const ForgottenPassword: React.FC = () => {
  return (
    <Layout>
      <section className="size-full flexCenter lg:justify-around md:items-start padding-container max-container">
        <div className="size-full flexCol max-w-xl my-auto">
          <CloudinaryImage
            imgName="logos/my-finance"
            imgFormamt="png"
            imgAltText="logo"
            imgAccessibility={false}
            className="size-10 md:size-12 lg:size-14 drop-shadow aspect-square object-cover object-center mb-8 md:mb-12 lg:mb-14"
          />
          <div className="flexColStart gap-y-2 xl:gap-y-2.5">
            <h1 className="regular-18 lg:bold-20 xl:bold-24 2xl:bold-30 font-semibold">
              Reset your password
            </h1>
            <p className="text-ellipsis regular-12 md:regular-14 xl:regular-16 font-medium mb-2.5 lg:mb-3.5">
              Do not worry, just enter your email address below and we will send
              you a link to reset your password.
            </p>
          </div>
          <ThirdPartyProvider />
          <PasswordContainer />
          <p className="regular-12 lg:regular-14 xl:regular-16 font-medium font-sans mt-4 lg:mt-6">
            Not sure if you have an account?
            <Link
              to={"/"}
              title="Sign Up"
              aria-label="Sign Up link"
              className="ml-1 text-blue-700 transition-colors duration-150 hover:underline"
            >
              Sign Up
            </Link>
          </p>
          <p className="size-full regular-12 lg:regular-14 text-center pt-8 md:pt-12 lg:pt-14 text-slate-900/60">
            &copy; 2025 Acme, All right Reserved
          </p>
        </div>
        <SideBackgroundSection>
          <div className="flexColStart space-y-2">
            <h2 className="bold-24 2xl:bold-30 font-semibold">
              The simplest way to manage <br /> your workforce
            </h2>
            <p className="regular-14 xl:regular-16 2xl:regular-18 font-medium">
              Access your account features, instantaneously
            </p>
          </div>
          <CloudinaryImage
            imgName="image/auth-dashboard"
            imgFormamt="png"
            imgAltText="auth-dashbord"
            className="w-full h-max rounded-xl my-4 xl:mt-8 2xl:mt-12 2xl:mb-8 shadow-sm aspect-auto object-cover object-center"
            imgAccessibility={false}
          />
          <BrandSlider />
        </SideBackgroundSection>
      </section>
    </Layout>
  );
};

export default ForgottenPassword;
