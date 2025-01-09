import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CloudinaryImage from "@/components/CloudinaryImage";
import OtpInput from "@/components/OtpInput";
import { Button } from "@/components/ui/button";
import {
  HTTP_RESPONSE_STATUS,
  MAX_OTP_SLOTS,
  REDIRECT_ROUTES,
} from "@/defines";
import { NOTIFICATION_TYPES } from "@/types/commonTypes";

// Custom Hooks
import useStore from "@/hooks/useStore";
import useRedirect from "@/hooks/useRedirect";

type RequestEmailValidationModalProps = {
  isModalOpen: boolean;
  message: string;
  onClose: () => void;
};

const RequestEmailValidationModal: React.FC<
  RequestEmailValidationModalProps
> = ({ isModalOpen, message, onClose }) => {
  const { commonStore, userStore, otpStore } = useStore();

  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState(true);

  const user = userStore.getUser();
  const redirectToRoute = useRedirect();

  function handleOtpChange(value: string) {
    setOtp(value);
    setStatus(true);
  }

  async function handleEmailSubmit(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (!user) return;

    if (otp.length !== MAX_OTP_SLOTS) {
      commonStore.openNotification(
        NOTIFICATION_TYPES.DESTRUCTIVE,
        "Error",
        "Please enter the OTP sent to your email."
      );

      return;
    }

    try {
      commonStore.showLoader();

      const result = await otpStore.verifyEmail({
        email: user?.email,
        otpCode: Number(otp),
      });

      if (result.data.status && result.status === HTTP_RESPONSE_STATUS.OK) {
        onClose();

        redirectToRoute(REDIRECT_ROUTES.DASHBOARD);
      }
    } catch (error) {
      setStatus(false);
      console.error("OTP Error: ", error);

      throw error;
    } finally {
      commonStore.hideLoader();
    }
  }

  return (
    <Dialog open={isModalOpen}>
      <DialogContent className="h-fit w-80 sm:w-96 md:w-[440px] space-y-2 rounded-lg">
        <DialogHeader className="flexColCenter items-center justify-center">
          <CloudinaryImage
            imgName="logos/my-finance"
            imgFormamt="png"
            imgAltText="logo"
            imgAccessibility={false}
            className="size-10 md:size-12 lg:size-14 drop-shadow aspect-square object-cover object-center mb-2 md:mb-4"
          />
          <DialogTitle className="regular-18 lg:bold-20 2xl:bold-24">
            Authentication Step
          </DialogTitle>
          <DialogDescription className="max-w-xs text-justify regular-14 xl:regular-16 font-sans">
            {message}
          </DialogDescription>
        </DialogHeader>

        <div className="flexColCenter items-center space-x-2 mx-auto">
          <OtpInput
            slots={MAX_OTP_SLOTS}
            value={otp}
            onChange={handleOtpChange}
            errorField={status}
          />
        </div>

        <DialogFooter className="gap-x-4 flex flex-row items-center justify-center mx-auto">
          <Button
            type="button"
            variant="auth"
            title="Continue"
            onClick={handleEmailSubmit}
            disabled={otpStore.isLoading}
          >
            {otpStore.isLoading ? "Loading.." : "Submit"}
          </Button>
          <DialogClose
            type="button"
            title="Cancel Verification"
            aria-label="Close modal button"
            onClick={onClose}
            className="h-9 flexCenter px-4 py-2 rounded-md text-center border border-slate-200 bg-white shadow-sm hover:text-slate-900 hover:bg-red-500 hover:scale-105 transition-all ease-in-out duration-150"
          >
            Close
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RequestEmailValidationModal;
