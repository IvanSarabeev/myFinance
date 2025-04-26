import React from "react";
import { Outlet } from "react-router";
import { Toaster } from "../ui/toaster";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import AppSidebar from "@/app/dashboard/AppSidebar";
import ModalManager from "../ModalManager";

const AccountLayout: React.FC = () => {
  return (
    <main className="relative size-full flexCenter overflow-x-hidden">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Outlet />
          <Toaster />
          <ModalManager />
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
};

export default AccountLayout;
