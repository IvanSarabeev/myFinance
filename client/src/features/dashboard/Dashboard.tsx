/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { observer } from "mobx-react-lite";

const items = [
  {
    title: "Account",
    classStyle: "hidden md:block",
    url: "/dashboard",
    urlTitle: "Dashboard",
  },
];

const Dashboard: React.FC = () => {
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <header className="flex h-16 shrink-0 items-center gap-2 shadow-xs">
        <div className="flex items-center gap-2 pl-4 xl:pl-6">
          <SidebarTrigger className="-ml-1 hover:scale-110 basic-transition" />
          <Separator orientation="vertical" className="h-4 xl:h-6 bg-black" />
          <Breadcrumbs items={items} />
        </div>
      </header>
      <section className="container account-container">
        <div className="flex flex-1 flex-col space-y-4 pt-0">
          <div className="grid auto-rows-min gap-x-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/95" />
            <div className="aspect-video rounded-xl bg-muted/95" />
            <div className="aspect-video rounded-xl bg-muted/95" />
          </div>
          <div className="min-h-96 h-full max-h-[1440px] flex-1 rounded-xl bg-muted/100" />
        </div>
      </section>
    </React.Fragment>
  );
};

export default observer(Dashboard);
