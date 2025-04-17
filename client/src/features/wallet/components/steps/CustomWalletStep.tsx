import { Button } from "@/components/ui/button";
import { FC } from "react";

type CustomWalletStepProps = {
  onFinish: () => void;
};

const CustomWalletStep: FC<CustomWalletStepProps> = ({ onFinish }) => {
  return (
    <div>
      <h3 className="regular-18 lg:bold-20 font-bold">Create Custom Wallet</h3>
      <p className="regular-14 text-muted-foreground">
        Please provide the details for your custom wallet.
      </p>
      {/* Add form fields for custom wallet creation */}
      <form action="" method="post"></form>
      <Button
        size="sm"
        variant="auth"
        className="btn btn-primary"
        onClick={onFinish}
      >
        Finish
      </Button>
    </div>
  );
};

export default CustomWalletStep;
