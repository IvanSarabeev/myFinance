import { FC, Fragment, memo } from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";

type NavMainProps = {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
};

const NavMain: FC<NavMainProps> = ({ items }) => {
  const isNavigationEmpty = Array.isArray(items) && items.length > 0;

  return (
    <SidebarGroup className="mt-3.5 lg:mt-4 pl-4">
      <SidebarMenu>
        {isNavigationEmpty && items.map((item) => {
          const {items, isActive, title, url} = item;

          return (
            <Collapsible key={title} asChild defaultOpen={isActive}>
              <SidebarMenuItem className="my-0.5">
                <SidebarMenuButton asChild tooltip={title}>
                  <Link to={url} className={`flexStart items-center align-bottom ${isActive ? "bg-white shadow-md" : ""}`}>
                    <item.icon height={24} width={24} className={isActive ? "text-blue-400/85" : ""}/>
                    <p className={`regular-16 ${isActive ? "text-blue-400/85 font-semibold" : ""}`}>{title}</p>
                  </Link>
                </SidebarMenuButton>
                {items?.length ? (
                  <Fragment>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                        <ChevronRight />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link to={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Fragment>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default memo(NavMain);
