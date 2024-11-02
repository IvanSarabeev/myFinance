import React, { memo } from "react";
import MemoGoogleProvider from "@/app/auth/providers/GoogleProvider";
import MemoGitHubProvider from "@/app/auth/providers/GitHubProvider";

const ThirdPartyProvider: React.FC = () => {
  return (
    <>
      <div className="size-full inline-flex flex-wrap lg:flex-nowrap gap-2 gap-x-4 flexCenter lg:justify-start my-6">
        <MemoGoogleProvider title="Log in with Google" />
        <MemoGitHubProvider title="Log in with GitHub" />
      </div>
      <span className="size-full flex items-center mb-4">
        <span className="h-px flex-1 bg-slate-200"></span>
        <span className="shrink-0 px-5 text-slate-500">or</span>
        <span className="h-px flex-1 bg-slate-200"></span>
      </span>
    </>
  );
};

const MemoThirdPartyProvider = memo(ThirdPartyProvider);

export default MemoThirdPartyProvider;
