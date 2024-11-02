import React, { memo } from "react";
import RegisterForm from "@/features/security/components/forms/RegisterForm";
import { Link } from "react-router-dom";
import MemoLayout from "@/components/layouts/Layout";
import ThirdPartyProvider from "@/components/ThirdPartyProvider";
import MemoSideBackgroundSection from "@/components/SideBackgroundSection";
import MemoCloudinaryImage from "@/components/CloudinaryImage";

const Register: React.FC = () => {
  return (
    <MemoLayout>
      <section className="w-full h-fit flexCol md:items-start flexCenter padding-container max-container">
        <div className="size-full max-w-xl">
          <div className="flexColStart space-y-2">
            <h1 className="regular-18 lg:bold-20 2xl:bold-24 font-semibold">
              Get Started Now
            </h1>
            <p className="regular-12 md:regular-14 2xl:regular-16 font-medium">
              Enter your credentials to access your account
            </p>
          </div>
          <ThirdPartyProvider />
          <RegisterForm />
          <p className="regular-12 lg:regular-14 font-medium font-sans mt-4 lg:mt-6">
            Have an account ?
            <Link
              to={"/login"}
              title="Login link"
              aria-label="Login link"
              className="ml-1 text-blue-700 transition-colors duration-150 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
        <MemoSideBackgroundSection>
          <div className="flexColStart space-y-2">
            <h2 className="bold-20 2xl:bold-24 font-semibold">
              The simplest way to manage <br /> your workforce
            </h2>
            <p className="regular-14 2xl:regular-16 font-medium">
              Access your account
            </p>
          </div>
          <MemoCloudinaryImage
            imgName="image/dashboard"
            imgFormamt="png"
            imgAltText="dashbord-preview"
            className=""
            imgAccessibility={false}
          />
          {/* Add Dashboard Image from Cloudinary */}
          <div>{/* Add Logos */}</div>
        </MemoSideBackgroundSection>
      </section>
    </MemoLayout>
  );
};

const MemoRegister = memo(Register);

export default MemoRegister;
