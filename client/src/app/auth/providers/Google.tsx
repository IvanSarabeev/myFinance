import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { REDIRECT_ROUTES } from "@/defines";

// Custom Hooks
import useStore from "@/hooks/useStore";
import useRedirect from "@/hooks/useRedirect";

type GoogleProps = {
  title: string;
};

const Google: React.FC<GoogleProps> = memo(({ title }) => {
  const { authStore, sessionStore } = useStore();
  const redirectRoute = useRedirect();

  const onAuthentication = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    try {
      await authStore.google();

      if (sessionStore.isAuthenticated) {
        redirectRoute(REDIRECT_ROUTES.DASHBOARD);
      }
    } catch (error) {
      console.error("Response Error", error);

      throw error;
    }
  };

  return (
    <Button
      type="button"
      variant="auth"
      size="authBtn"
      title="Google Authentication"
      aria-label="Google Authentication"
      onClick={(event) => onAuthentication(event)}
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
    </Button>
  );
});

export default Google;
