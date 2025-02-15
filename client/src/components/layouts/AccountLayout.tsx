import React from "react";
import { Outlet } from "react-router";
import { Toaster } from "../ui/toaster";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import AppSidebar from "@/app/dashboard/AppSidebar";

const AccountLayout: React.FC = () => {
  return (
    <main className="relative size-full lg:h-screen flexCenter overflow-x-hidden">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Outlet />
          <Toaster />
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
};

export default AccountLayout;
