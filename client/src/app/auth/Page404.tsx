import React, { memo } from "react";
import Logo from "../assets/preview-logo.png";

const Page404: React.FC = memo(() => {
  return (
    <section>
      <img
        src={Logo}
        alt="logo"
        decoding="async"
        loading="lazy"
        fetchPriority="high"
        className="size-12 object-cover object-center aspect-auto"
      />
    </section>
  );
});

export default Page404;
