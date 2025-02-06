import React from "react";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { userProfileNavigation } from "@/features/dashboard/config/defaults";
import useStore from "@/hooks/useStore";

const NavProfileMenu = () => {
  const { authStore } = useStore();

  function handleUserLogout() {
    return authStore.logoutUser();
  }

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
                  onClick={() => {
                    if (item.id === 5) {
                      handleUserLogout();
                    }
                  }}
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
