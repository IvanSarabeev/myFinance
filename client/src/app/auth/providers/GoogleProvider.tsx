import React, { memo, useState } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import MemoEmailOtpDialog from "@/features/security/components/EmailOtpDialog";
import { toast } from "@/hooks/use-toast";

type GoogleProviderProps = {
  title: string;
};

const GoogleProvider: React.FC<GoogleProviderProps> = ({ title }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuthentication = () => {
    setIsLoading(!isLoading);

    toast({
      variant: "success",
      title: "Success",
      description: "WORKS",
    });
  };

  return (
    <Button
      type="button"
      variant="auth"
      size="authBtn"
      title="Google Authentication"
      aria-label="Google Authentication"
      onClick={handleGoogleAuthentication}
    >
      <span>
        <FcGoogle
          title="Google Icon"
          aria-label="Google Icon"
          className="size-10"
        />
        <span className="sr-only">Google Icon</span>
      </span>
      {title}
      {isLoading && <MemoEmailOtpDialog showDialog={true} message="vlizam" />}
    </Button>
  );
};

const MemoGoogleProvider = memo(GoogleProvider);

export default MemoGoogleProvider;
