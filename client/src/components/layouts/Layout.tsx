import React from "react";
import { Toaster } from "../ui/toaster";
import ModalManager from "../ModalManager";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = React.memo(({ children }) => {
  return (
    // TODO: Set the Dark Theme: bg-[#232325] text-[#f1f1f1]
    <main className="relative w-full h-fit flexCenter lg:min-h-screen overflow-x-hidden">
      {children}
      <Toaster />
      <ModalManager />
    </main>
  );
});

export default Layout;
