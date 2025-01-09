import React from "react";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/toaster";

const AccountLayout: React.FC = () => {
  return (
    <main className="relative h-fit w-full lg:h-screen flexCenter overflow-x-hidden bg-white">
      <Sidebar />
      <Outlet />
      <Toaster />
    </main>
  );
};

export default AccountLayout;
