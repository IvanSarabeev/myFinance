import React, { memo, useState } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { toast } from "@/hooks/use-toast";
import RequestEmailValidationModal from "@/features/security/components/RequestEmailValidationModal";

type GoogleProviderProps = {
  title: string;
};

const GoogleProvider: React.FC<GoogleProviderProps> = memo(({ title }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuthentication = () => {
    setIsLoading(!isLoading);

    toast({
      variant: "success",
      title: "Success",
      description: "Use the OTP provided in the email to verify your account.",
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
      {isLoading && (
        <RequestEmailValidationModal
          isModalOpen={true}
          message="vlizam"
          onClose={() => {
            console.log("Vlizam prez Google Provider");
          }}
        />
      )}
    </Button>
  );
});

export default GoogleProvider;
