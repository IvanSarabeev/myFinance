import { FC, useState } from "react";
import BaseModal from "@/components/BaseModal";
import { StandardVerificationProps } from "@/types/modal";
import { Button } from "@/components/ui/button";
import useStore from "@/hooks/useStore";
import type { WalletSteps } from "@/types/features/wallet";
import { WALLET_STEPS } from "../../config";

const InitialWalletSetupModal: FC<StandardVerificationProps> = ({
  email,
  message,
  onClose,
}) => {
  const { modalStore } = useStore();
  const [step, setStep] = useState<WalletSteps>("Initial");

  const handleNext = () => {
    if (step === WALLET_STEPS.CUSTOM_ACCOUNT)
      setStep(WALLET_STEPS.CUSTOM_WALLET);
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleFinish = () => {
    modalStore.closeModal();
  };

  const handleDefaultAccount = () => {
    setStep(WALLET_STEPS.DEFAULT);
    modalStore.closeModal();
  };

  console.log(
    "Props: ",
    email,
    message,
    handleNext,
    handleBack,
    handleFinish,
    handleDefaultAccount
  );

  const progressPercentage = {
    initial: 0,
    customAccount: 50,
    review: 75,
    customWallet: 100,
  };

  return (
    <BaseModal
      isOpen
      onClose={onClose}
      className="group w-80 sm:w-96 md:w-[440px] xl:w-[480px] space-y-2 rounded-lg group-hover:shadow-md z-50"
    >
      <div className="flex flex-col items-start justify-start gap-2 px-4 pt-4 pb-2 text-left">
        <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${progressPercentage.review}%` }}
          />
        </div>
        <h3 className="regular-18 lg:bold-20 font-bold">
          Initial Wallet Setup
        </h3>
        <p className="regular-16 text-muted-foreground">
          Welcome to the board!
        </p>

        <p className="regular-14 text-muted-foreground">
          You can proceed to set up your wallet. In the next steps, you will
          have the option to create a custom account and wallet or use the
          default one we’ve prepared for you.
        </p>
      </div>
      <div className="gap-x-2 md:gap-x-4 flexCenter justify-end">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => modalStore.closeModal()}
        >
          Cancel
        </Button>
        <Button variant="submit" size="sm" onClick={handleNext}>
          Continue
        </Button>
      </div>
    </BaseModal>
  );
};

export default InitialWalletSetupModal;
