import { FC } from "react";
import { Button } from "@/components/ui/button";

type CustomAccountStepProps = {
  onNext: () => void;
};

const CustomAccountStep: FC<CustomAccountStepProps> = ({ onNext }) => {
  return (
    <div>
      <h3 className="regular-18 xl:bold-20 font-bold">Create Account</h3>
      <p className="regular-14 lg:regular-16 text-muted-foreground">
        Please provide the details for your custom account. You can choose the
        currency, set an initial deposit, and name your account
      </p>
      {/* TODO: Add form */}
      <form action=""></form>
      <Button variant="secondary" size="sm">
        Back
      </Button>
      <Button onClick={onNext} variant="auth">
        Next
      </Button>
    </div>
  );
};

export default CustomAccountStep;
