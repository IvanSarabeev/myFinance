import React from "react";
import { Command } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import useStore from "@/hooks/useStore";
import { navData } from "../../features/dashboard/config/defaults";

// Components
import NavMain from "./sidebar/NavMain";
import NavUser from "./sidebar/NavUser";
import NavSecondary from "./sidebar/NavSecondary";

const Header = () => {
  return (
    <>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to={"#"}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">myFinance</span>
                  <span className="truncate regular-12">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
    </>
  );
};

const AppSidebar: React.FC = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { userStore } = useStore();

  return (
    <Sidebar variant="inset" {...props}>
      <Header />
      <SidebarContent>
        <NavMain items={navData.navMain} />
        <NavSecondary items={navData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userStore.user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
