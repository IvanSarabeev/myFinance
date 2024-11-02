import React, { memo } from "react";

type SideBackgroundProps = {
  children: React.ReactNode;
};

const SideBackgroundSection: React.FC<SideBackgroundProps> = ({ children }) => {
  return (
    <section className="hidden size-full max-w-xl max-h-[776px] lg:flexColStart py-10 px-16 rounded-2xl text-white bg-primary/90">
      {children}
    </section>
  );
};

const MemoSideBackgroundSection = memo(SideBackgroundSection);

export default MemoSideBackgroundSection;
