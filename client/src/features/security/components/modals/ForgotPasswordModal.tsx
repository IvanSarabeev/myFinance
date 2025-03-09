/* eslint-disable react-refresh/only-export-components */
import React from "react";
import BaseModal from "@/components/BaseModal";
import { StandardVerificationProps } from "@/types/modal";
import useStore from "@/hooks/useStore";
import { ShieldHalf } from "lucide-react";
import OtpInput from "@/components/OtpInput";
import { HTTP_RESPONSE_STATUS, MAX_OTP_SLOTS } from "@/defines";
import { Button } from "@/components/ui/button";
import { NOTIFICATION_TYPES } from "@/types/defaults";
import { observer } from "mobx-react-lite";

const ForgotPasswordModal: React.FC<StandardVerificationProps> = ({
  email,
  message,
  onClose,
}) => {
  const { commonStore, otpStore, modalStore } = useStore();
  const { openNotification } = commonStore;
  const { isLoading, otpCode } = otpStore;

  const handleChange = (value: string) => {
    otpStore.setOtpCode(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (otpCode.length !== MAX_OTP_SLOTS) {
      openNotification(
        NOTIFICATION_TYPES.WARNING,
        "You've entered less data",
        "Invalid code, the code length must be minimum of 6 characters."
      );
      return;
    }

    try {
      commonStore.showLoader();

      const data = { email, otpCode: Number(otpCode) };
      const response = await otpStore.emailConfirmation(data);

      const { status, statusCode, message } = response.data;

      if (status && statusCode === HTTP_RESPONSE_STATUS.OK) {
        return Promise.allSettled([onClose(), otpStore.clearData()]);
      } else {
        const error = new Error(message);

        throw error;
      }
    } catch (error: unknown) {
      console.error("Promise Error: ", error);
      throw error;
    } finally {
      commonStore.hideLoader();
    }
  };

  return (
    <BaseModal
      isOpen
      onClose={onClose}
      className="group w-80 sm:w-96 md:w-[440px] xl:w-[480px] space-y-2 rounded-lg group-hover:shadow-md"
    >
      <div className="flexCol items-center font-serif space-y-2 lg:space-y-2.5 px-2">
        <div className="bg-primary rounded-full p-2 lg:p-3.5">
          <ShieldHalf className="size-12 2xl:size-14 text-white -rotate-2" />
        </div>
        <h2 className="bold-20 2xl:bold-24 whitespace-normal text-balance">
          Verify your code
        </h2>
        <p className="text-slate-600 regular-16 text-center text-balance">
          {message ??
            "We have sent a verification code to your email in order to proceed"}
          <br />
          <strong>{email}</strong>
        </p>

        <OtpInput
          value={otpCode}
          slots={MAX_OTP_SLOTS}
          onChange={handleChange}
          style="gap-x-2 my-2.5 lg:my-3"
        />

        <div className="size-full flexCol justify-center gap-y-2">
          <Button
            type="button"
            variant="default"
            title="Verifiy Code"
            disabled={otpCode.length < MAX_OTP_SLOTS || isLoading}
            onClick={handleSubmit}
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

export default observer(ForgotPasswordModal);
