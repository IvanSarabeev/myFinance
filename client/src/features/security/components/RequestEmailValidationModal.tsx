import React, { useState } from "react";
import useStore from "@/hooks/useStore";
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
import InputOTP from "@/components/CommonOTP";
import { Button } from "@/components/ui/button";
import { MAX_OTP_SLOTS } from "@/defines";

type RequestEmailValidationModalProps = {
  showDialog: boolean;
  message: string;
};

const RequestEmailValidationModal: React.FC<
  RequestEmailValidationModalProps
> = ({ showDialog, message }) => {
  const { commonStore } = useStore();

  const [otp, setOtp] = useState("");

  function handleOtpChange(inputOtp: string) {
    setOtp(inputOtp);
  }

  // TODO: Add the LOGIC for actually sending OTP to the Server

  return (
    <Dialog open={showDialog}>
      <DialogContent className="h-fit w-80 sm:w-96 md:w-[440px] space-y-2 rounded-lg">
        <DialogHeader className="flexColCenter items-center">
          <CloudinaryImage
            imgName="logos/my-finance"
            imgFormamt="png"
            imgAltText="logo"
            imgAccessibility={false}
            className="size-10 md:size-12 lg:size-14 drop-shadow aspect-square object-cover object-center mb-8 md:mb-12 lg:mb-14"
          />
          <DialogTitle className="regular-18 xl:bold-24">
            Authentication Step
          </DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>

        <div className="flexColCenter items-center space-x-2 mx-auto">
          <InputOTP
            slots={MAX_OTP_SLOTS}
            value={otp}
            onChange={handleOtpChange}
          />
        </div>

        <DialogFooter className="gap-x-4 flex flex-row items-center justify-center mx-auto">
          <Button
            type="button"
            variant="submit"
            title="Continue"
            onClick={() => {
              console.log("OTP Cliked");
            }}
            disabled={commonStore.isLoading}
          >
            {commonStore.isLoading ? "Loading.." : "Submit"}
          </Button>
          <DialogClose
            type="button"
            title="Cancel Verification"
            aria-label="Close modal button"
            onClick={() => {
              console.log("Dialog Closed");
            }}
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
