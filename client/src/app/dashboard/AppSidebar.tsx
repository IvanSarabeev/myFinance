import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import useStore from "@/hooks/useStore";
import { navData } from "../../features/dashboard/config/defaults";
// Components
import NavMain from "./sidebar/NavMain";
import NavUser from "./sidebar/NavUser";
import NavSecondary from "./sidebar/NavSecondary";
import CloudinaryImage from "@/components/CloudinaryImage";

const Header = () => {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild>
            <Link to={"#"}>
              <CloudinaryImage
                imgName="logos/my-finance"
                imgFormamt="png"
                imgAltText="logo"
                imgAccessibility={false}
                className="size-8 lg:size-10 drop-shadow aspect-square object-cover object-center"
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">myFinance</span>
                <span className="truncate regular-12">Enterprise</span>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

const AppSidebar: React.FC = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { userStore } = useStore();

  const user = userStore.getUserDetails();

  return (
    <Sidebar variant="inset" {...props}>
      <Header />
      <SidebarContent>
        <NavMain items={navData.navMain} />
        <NavSecondary items={navData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>{user !== null && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
