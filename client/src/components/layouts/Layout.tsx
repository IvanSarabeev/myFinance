import React from "react";
import { Toaster } from "../ui/toaster";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = React.memo(({ children }) => {
  return (
    <main className="relative w-full h-fit flexCenter lg:min-h-screen overflow-x-hidden bg-white">
      {children}
      <Toaster />
    </main>
  );
});

export default Layout;
