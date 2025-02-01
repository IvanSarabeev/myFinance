import React from "react";
import Layout from "@/components/layouts/Layout";
import CloudinaryImage from "@/components/CloudinaryImage";
import PasswordContainer from "@/features/security/PasswordContainer";
import SideBackgroundSection from "@/components/SideBackgroundSection";

const ForgottenPassword: React.FC = () => {
  return (
    <Layout>
      <section className="size-full flexCenter lg:justify-around md:items-start padding-container max-container">
        <div className="size-full flexCol max-w-xl">
          <CloudinaryImage
            imgName="logos/my-finance"
            imgFormamt="png"
            imgAltText="logo"
            imgAccessibility={false}
            className="size-10 md:size-12 lg:size-14 drop-shadow aspect-square object-cover object-center mb-8 md:mb-12 lg:mb-14"
          />
          <div className="flexColStart space-y-2">
            <h1 className="regular-18 lg:bold-20 xl:bold-24 2xl:bold-30 font-semibold">
              Get Onboarded Now
            </h1>
            <p className="regular-12 md:regular-14 xl:regular-16 2xl:regular-18 font-medium">
              Get access to your account seemlessly
            </p>
          </div>
          <PasswordContainer />
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
        </SideBackgroundSection>
      </section>
    </Layout>
  );
};

export default ForgottenPassword;
