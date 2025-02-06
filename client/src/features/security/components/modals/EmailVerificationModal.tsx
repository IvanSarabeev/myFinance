/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import BaseModal from "@/components/BaseModal";
import useStore from "@/hooks/useStore";
import OtpInput from "@/components/OtpInput";
import {
  HTTP_RESPONSE_STATUS,
  MAX_OTP_SLOTS,
  REDIRECT_ROUTES,
} from "@/defines";
import { Button } from "@/components/ui/button";
import { observer } from "mobx-react-lite";
import { NOTIFICATION_TYPES } from "@/types/commonTypes";
import useRedirect from "@/hooks/useRedirect";
import { ShieldCheck } from "lucide-react";
import { EmailVerificationModalProps } from "@/types/modal";

const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({
  email,
  message,
  onClose,
}) => {
  const { commonStore, otpStore, modalStore } = useStore();
  const { openNotification } = commonStore;
  const { isLoading, otpCode } = otpStore;

  const redirectRoute = useRedirect();
  const [errorStatus, setErrorStatus] = useState(false);

  const handleChange = (value: string) => {
    otpStore.setOtpCode(value);
  };

  const handleEmailSubmit = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (otpCode.length !== MAX_OTP_SLOTS) {
      openNotification(
        NOTIFICATION_TYPES.DESTRUCTIVE,
        "Bad Request",
        "Invalid code, please feel free to contact our support service."
      );
      return;
    }

    try {
      setErrorStatus(false);
      commonStore.showLoader();

      const data = { email: email, otpCode: Number(otpCode) };
      const response = await otpStore.verifyEmail(data);

      if (response) {
        const { status, statusCode } = response.data;

        if (status && statusCode === HTTP_RESPONSE_STATUS.OK) {
          return Promise.allSettled([
            onClose(),
            otpStore.clearData(),
            redirectRoute(REDIRECT_ROUTES.LOGIN),
          ]);
        }
      } else {
        setErrorStatus(true);
      }
    } catch (error) {
      setErrorStatus(true);
      throw error;
    } finally {
      commonStore.hideLoader();
    }

    setErrorStatus(true);
  };

  return (
    <BaseModal
      isOpen
      onClose={onClose}
      className="group w-80 sm:w-96 md:w-[440px] xl:w-[480px] space-y-2 rounded-lg group-hover:shadow-md"
    >
      <div className="flexCol items-center font-serif space-y-2 lg:space-y-2.5 px-2">
        <div className="bg-primary rounded-full p-2 lg:p-3.5">
          <ShieldCheck className="size-12 2xl:size-14 text-white -rotate-2" />
        </div>
        <h2 className="bold-20 2xl:bold-24 whitespace-normal text-balance">
          Verify your code
        </h2>
        <p className="text-slate-600 regular-16 text-center text-balance">
          {message ?? "We have sent a code to your email"}
          <br />
          <strong>{email}</strong>
        </p>

        <OtpInput
          value={otpCode}
          slots={MAX_OTP_SLOTS}
          onChange={handleChange}
          errorField={errorStatus}
          style="my-2.5 lg:my-3"
        />

        <div className="size-full flexCol justify-center gap-y-2">
          <Button
            type="button"
            variant="default"
            title="Verifiy Code"
            disabled={otpCode.length < MAX_OTP_SLOTS || isLoading}
            onClick={handleEmailSubmit}
            className="w-full rounded-md py-6 text-center"
          >
            {isLoading ? "Verifing.." : "Continue"}
          </Button>
          <span className="flexCenter">
            {/* TODO: Add resend functionalitty */}
            <p>Didn't receve code? </p>
            <Button
              title="Resend code"
              aria-label="Resend code"
              variant="link"
              className="text-blue-600"
              onClick={() => modalStore.closeModal()}
            >
              Resend
            </Button>
          </span>
        </div>
      </div>
    </BaseModal>
  );
};

export default observer(EmailVerificationModal);
