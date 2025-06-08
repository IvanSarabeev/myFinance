import { ComponentPropsWithoutRef } from 'react';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type LucideIcon } from 'lucide-react';
import { Link } from 'react-router';
import type { Location } from 'react-router';

const NavSecondary = ({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
  location: Location;
} & ComponentPropsWithoutRef<typeof SidebarGroup>) => {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActiveLink = location.pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild size="sm">
                  <Link
                    to={item.url}
                    className={`${isActiveLink && 'bg-white shadow-md'}`}
                  >
                    <item.icon />
                    <p
                      className={`${isActiveLink && 'text-blue-400/85 font-semibold'}`}
                    >
                      {item.title}
                    </p>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavSecondary;
