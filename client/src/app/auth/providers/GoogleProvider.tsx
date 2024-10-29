import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

type GoogleProviderProps = {
  title: string;
};

const GoogleProvider: React.FC<GoogleProviderProps> = ({ title }) => {
  const handleGoogleAuthentication = () => {
    console.log(title);
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
          className="size-4 md:size-5"
        />
        <span className="sr-only">Google Icon</span>
      </span>
      {title}
    </Button>
  );
};

const MemoGoogleProvider = memo(GoogleProvider);

export default MemoGoogleProvider;
