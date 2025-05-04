import { FC } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import NavProfileMenu from './NavProfileMenu';
import { UserDetails } from '@/types/user';

interface NavUserProps {
  user: UserDetails;
}

const NavUser: FC<NavUserProps> = ({ user }) => {
  const { name, userAvatar } = user;

  const fallbackName = (name: string) => {
    if (name.length > 0) {
      return name
        .split(' ')
        .map((word) => word[0].toUpperCase())
        .join('');
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
                  <AvatarImage
                    src={userAvatar}
                    alt={name}
                    className="rounded-full"
                  />
                ) : (
                  <AvatarFallback color="bg-blue-600" className="rounded-full">
                    {fallbackName(name)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="grid flex-1 text-left regular-14 text-black leading-tight">
                <span className="truncate font-semibold">{name}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropDownSideContent />
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

const DropDownSideContent = () => {
  return (
    <DropdownMenuContent
      align="end"
      sideOffset={4}
      side="bottom"
      className="w-[--radix-dropdown-menu-trigger-width] min-w-40 rounded-lg"
    >
      <NavProfileMenu />
    </DropdownMenuContent>
  );
};

export default NavUser;
