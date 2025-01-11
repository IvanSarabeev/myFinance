import React from "react";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { userProfileNavigation } from "@/features/dashboard/config/defaults";

const NavProfileMenu = () => {
  return (
    <React.Fragment>
      {userProfileNavigation.map((item) => {
        const NavIcon = item.icon;

        return (
          <React.Fragment key={item.id}>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  to={item.url}
                  className="size-full inline-flex justify-start gap-x-2 outline-none border-none"
                >
                  <NavIcon className="size-[18px] group-hover:font-bold " />
                  {item.title}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export default NavProfileMenu;
