import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="relative w-full h-fit lg:min-h-screen overflow-x-hidden bg-white">
      {children}
    </main>
  );
};

export default Layout;
