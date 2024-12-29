import React, { memo } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { MAX_OTP_SLOTS, MIN_OTP_SLOTS } from "@/defines";

type OtpInputProps = {
  slots: typeof MAX_OTP_SLOTS | typeof MIN_OTP_SLOTS;
  value?: string;
  onChange?: (otpCode: string) => void;
  errorField?: boolean;
};

const OtpInput: React.FC<OtpInputProps> = memo(
  ({ slots, value = "", onChange, errorField }) => {
    const handleInputChange = (index: number, newValue: string) => {
      const newArrayValue = value.split("");
      newArrayValue[index] = newValue;

      const updatedValue = newArrayValue.join("");

      if (onChange) {
        onChange(updatedValue);
      }
    };

    return (
      <InputOTP
        value={value}
        maxLength={slots}
        onChange={onChange}
        pattern={REGEXP_ONLY_DIGITS}
      >
        <InputOTPGroup
          className={`${!errorField && "border border-red-600 rounded-md"}`}
        >
          {Array.from({ length: slots }, (_, index) => {
            return (
              <InputOTPSlot
                key={index}
                index={index}
                onChange={(e) =>
                  handleInputChange(index, (e.target as HTMLInputElement).value)
                }
                className={`font-bold ${!errorField && "text-red-600"}`}
              />
            );
          })}
        </InputOTPGroup>
      </InputOTP>
    );
  }
);

export default OtpInput;
