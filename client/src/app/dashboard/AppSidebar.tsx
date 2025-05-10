import { FC, ComponentProps } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { navData } from '@/app/dashboard/configs/defaults.ts';
import NavMain from './sidebar/NavMain';
import NavSecondary from './sidebar/NavSecondary';
import Logo from '@/app/assets/logo.png';
import { Link } from 'react-router';

const Header = () => {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild>
            <Link to={'/account/dashboard'}>
              <img
                src={Logo}
                alt="myFinance Dashboard Logo"
                className="size-32 lg:size-36 2xl:size-40 drop-shadow aspect-auto object-cover object-center"
                decoding="async"
                width={144}
                height={144}
              />
              <span className="sr-only">myFinance</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

const AppSidebar: FC = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar variant="sidebar" side="left" collapsible="icon" {...props}>
      <Header />
      <SidebarContent>
        <NavMain items={navData.navMain} />
        <NavSecondary items={navData.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
