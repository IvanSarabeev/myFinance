import React from "react";
import Logo from "@/app/assets/preview-logo.png";
import { cn } from "./../../../../../src";
import { isString } from "@/lib/utils";

type CustomLoaderProps = {
  style?: string;
  title?: string;
};

const CustomLoader: React.FC<CustomLoaderProps> = ({ style, title }) => {
  const titleStyle =
    "absolute z-20 top-4 h-fit w-full border-b border-separate border-slate-900/50 animate-pulse";

  return (
    <div
      className={cn(
        "relative min-h-96 h-full max-h-[1440px] flexCenter rounded-xl bg-muted/100",
        style
      )}
    >
      <div className={isString(title) ? titleStyle : ""}>
        {isString(title) && (
          <h2 className="regular-16 xl:regular-18 font-semibold pl-2 xl:pl-4 animate-pulse">
            {title}
          </h2>
        )}
      </div>
      <div className={`size-40 relative animate-pulse ${title ? "mt-8" : ""}`}>
        <img
          src={Logo}
          alt="logo"
          decoding="async"
          loading="lazy"
          fetchPriority="high"
          aria-label="myFinance logo"
          className="size-32 mx-auto bg-opacity-60 object-cover aspect-square"
        />
        <div className="absolute size-full -inset-x-8 -inset-y-12 z-90 p-28 border border-dashed border-black rounded-full" />
      </div>
    </div>
  );
};

export default CustomLoader;
