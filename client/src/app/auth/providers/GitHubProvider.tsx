import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { VscGithub } from "react-icons/vsc";
import useStore from "@/hooks/useStore";
import useRedirect from "@/hooks/useRedirect";

type GithubProps = {
  title: string;
};

const GitHub: React.FC<GithubProps> = memo(({ title }) => {
  const { authStore } = useStore();
  const redirectRoute = useRedirect("/dashboard");

  const onAuthentication = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    try {
      await authStore.google();

      if (authStore.oAuthData?.status) {
        if (redirectRoute) {
          return redirectRoute();
        }
      }
    } catch (error) {
      console.error("Auth Error: ", error);

      throw error;
    }
  };

  return (
    <Button
      type="button"
      variant="auth"
      size="authBtn"
      title="GitHub Authentication"
      aria-label="GitHub Authentication"
      onClick={(event) => onAuthentication(event)}
    >
      <span>
        <VscGithub
          title="GitHub Icon"
          aria-label="GitHub Icon"
          className="size-4 md:size-5"
        />
        <span className="sr-only">GitHub Icon</span>
      </span>
      {title}
    </Button>
  );
});

export default GitHub;
