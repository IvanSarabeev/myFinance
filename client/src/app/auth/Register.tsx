import React, { memo } from "react";
import RegisterForm from "@/features/security/components/forms/RegisterForm";
import { Link } from "react-router-dom";
import MemoLayout from "@/components/layouts/Layout";
import ThirdPartyProvider from "@/components/ThirdPartyProvider";
import MemoSideBackgroundSection from "@/components/SideBackgroundSection";
import MemoCloudinaryImage from "@/components/CloudinaryImage";
import MemoBrandSlider from "@/features/security/components/BrandSlider";

const Register: React.FC = () => {
  return (
    <MemoLayout>
      {/* Maybe remove: flexCol from the <section> */}
      <section className="size-full flexCenter md:items-start padding-container max-container">
        <div className="size-full flexCol max-w-xl">
          <MemoCloudinaryImage
            imgName="logos/my-finance"
            imgFormamt="png"
            imgAltText="logo"
            imgAccessibility={false}
            className="size-14 drop-shadow aspect-square object-cover object-center mb-8 md:mb-12 lg:mb-14"
          />
          <div className="flexColStart space-y-2">
            <h1 className="regular-18 lg:bold-20 xl:bold-24 font-semibold">
              Get Started Now
            </h1>
            <p className="regular-12 md:regular-14 xl:regular-16 font-medium">
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
          <p className="size-full regular-12 lg:regular-14 text-center pt-8 md:pt-12 lg:pt-14 text-slate-900/60">
            &copy; 2024 Acme, All right Reserved
          </p>
        </div>
        <MemoSideBackgroundSection>
          <div className="flexColStart space-y-2">
            <h2 className="bold-24 font-semibold">
              The simplest way to manage <br /> your workforce
            </h2>
            <p className="regular-14 xl:regular-16 font-medium">
              Access your account
            </p>
          </div>
          <MemoCloudinaryImage
            imgName="image/dashboard-preview"
            imgFormamt="png"
            imgAltText="dashbord-preview"
            className="size-full rounded-xl my-4 shadow-sm aspect-auto object-cover object-center"
            imgAccessibility={false}
          />
          <MemoBrandSlider />
        </MemoSideBackgroundSection>
      </section>
    </MemoLayout>
  );
};

const MemoRegister = memo(Register);

export default MemoRegister;
