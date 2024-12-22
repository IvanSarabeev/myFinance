import React, { memo } from "react";

type SideBackgroundProps = {
  children: React.ReactNode;
};

const SideBackgroundSection: React.FC<SideBackgroundProps> = memo(
  ({ children }) => {
    return (
      <section className="hidden size-full max-w-xl lg:flexColStart py-10 md:py-14 lg:py-16 2xl:py-20 px-16 rounded-2xl text-white bg-primary/90">
        {children}
      </section>
    );
  }
);

export default SideBackgroundSection;
