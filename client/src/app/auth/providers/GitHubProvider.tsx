import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { VscGithub } from "react-icons/vsc";

type GitHubProviderProps = {
  title: string;
};

const GitHubProvider: React.FC<GitHubProviderProps> = memo(({ title }) => {
  const handleGitHubAuthentication = () => {
    console.log(title);
  };

  return (
    <Button
      type="button"
      variant="auth"
      size="authBtn"
      title="GitHub Authentication"
      aria-label="GitHub Authentication"
      onClick={handleGitHubAuthentication}
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

export default GitHubProvider;
