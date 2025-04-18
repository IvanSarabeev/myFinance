import { FC } from "react";
import { Button } from "@/components/ui/button";
import BaseModal from "@/components/BaseModal";
import AccountForm from "../../forms/AccountForm";

type CustomAccountStepProps = {
  onNext: () => void;
  email: string;
  message: string;
  onClose: () => void;
};

const CustomAccountStep: FC<CustomAccountStepProps> = ({ onNext, onClose }) => {
  const progressPercentage = {
    review: 75,
  };

  return (
    <BaseModal
      isOpen
      onClose={onClose}
      className="group w-80 sm:w-96 md:w-4xl xl:w-2xl space-y-2 rounded-lg group-hover:shadow-md z-50"
    >
      <div
        className="bg-blue-500 h-2 rounded-full"
        style={{ width: `${progressPercentage.review}%` }}
      />
      <h3 className="regular-18 xl:bold-20 font-bold">Create Account</h3>
      <p className="regular-14 lg:regular-16 text-muted-foreground">
        Please provide the details for your custom account. You can choose the
        currency, set an initial deposit, and name your account
      </p>
      <AccountForm />
      <div className="flexCenter justify-end gap-x-2 md:gap-x-4">
        <Button variant="secondary" size="sm">
          Back
        </Button>
        <Button onClick={onNext} variant="submit" size="sm">
          Next
        </Button>
      </div>
    </BaseModal>
  );
};

export default CustomAccountStep;
