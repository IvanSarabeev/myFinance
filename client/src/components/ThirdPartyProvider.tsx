import React, { memo } from "react";
import Google from "@/app/auth/providers/Google";
import GitHub from "@/app/auth/providers/GitHub";

const ThirdPartyProvider: React.FC = memo(() => {
  return (
    <>
      <div className="size-full inline-flex flex-wrap lg:flex-nowrap gap-2 gap-x-4 flexCenter lg:justify-start my-6">
        <Google title="Log in with Google" />
        <GitHub title="Log in with GitHub" />
      </div>
      <span className="size-full flex items-center mb-4">
        <span className="h-px flex-1 bg-slate-200"></span>
        <span className="flex-shrink-0 px-5 text-slate-500">or</span>
        <span className="h-px flex-1 bg-slate-200"></span>
      </span>
    </>
  );
});

export default ThirdPartyProvider;
