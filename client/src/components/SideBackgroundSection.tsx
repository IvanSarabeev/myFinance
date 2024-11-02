import React, { memo } from "react";

type SideBackgroundProps = {
  children: React.ReactNode;
};

const SideBackgroundSection: React.FC<SideBackgroundProps> = ({ children }) => {
  return (
    <section className="flexColStart p-5 rounded-lg text-white bg-primary">
      {children}
    </section>
  );
};

const MemoSideBackgroundSection = memo(SideBackgroundSection);

export default MemoSideBackgroundSection;
