import React from "react";
import { ChevronsUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserDetails } from "@/types/userTypes";
import NavProfileMenu from "./NavProfileMenu";

interface NavUserProps {
  user: UserDetails;
}

type DropDownSideContentProps = {
  user: UserDetails;
  userCapital: string | null;
};

const NavUser: React.FC<NavUserProps> = ({ user }) => {
  const { name, email, userAvatar } = user;

  const fallbackName = (name: string) => {
    if (name.length > 0) {
      return name
        .split(" ")
        .map((word) => word[0].toUpperCase())
        .join("");
    }

    return null;
  };

  return (
    <SidebarMenu className="text-black">
      <SidebarMenuItem>
        <DropdownMenu>
          {/* Trigger DropDown */}
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg">
                {userAvatar.length > 0 ? (
                  <AvatarImage src={userAvatar} alt={name} />
                ) : (
                  <AvatarFallback color="bg-blue-600" className="rounded-lg">
                    {fallbackName(name)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="grid flex-1 text-left regular-12 text-black leading-tight">
                <span className="truncate font-semibold">{name}</span>
                <span className="truncate regular-12">{email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          {/* End of Trigger DropDown */}
          <DropDownSideContent user={user} userCapital={fallbackName(name)} />
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

const DropDownSideContent = ({
  user,
  userCapital,
}: DropDownSideContentProps) => {
  const { isMobile } = useSidebar();
  const { name, email, userAvatar } = user;

  return (
    <DropdownMenuContent
      align="end"
      sideOffset={4}
      side={isMobile ? "bottom" : "right"}
      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
    >
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar className="h-8 w-8 rounded-lg">
            {userAvatar.length > 0 ? (
              <AvatarImage src={userAvatar} alt={name} />
            ) : (
              <AvatarFallback className="rounded-lg">
                {userCapital}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{name}</span>
            <span className="truncate text-xs">{email}</span>
          </div>
        </div>
      </DropdownMenuLabel>
      <NavProfileMenu />
    </DropdownMenuContent>
  );
};

export default NavUser;
