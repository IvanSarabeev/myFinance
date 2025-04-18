/* eslint-disable react-refresh/only-export-components */
import { FC, Fragment, useEffect } from "react";
import { observer } from "mobx-react-lite";
import BoxLoader from "./components/loaders/BoxLoader";
import { modalStore } from "@/stores";
import { MODAL_TYPES } from "@/defines";

const Dashboard: FC = () => {
  useEffect(() => {
    modalStore.openModal(MODAL_TYPES.CUSTOM_ACCOUNT);
  }, []);

  return (
    <Fragment>
      <header className="flex h-16 shrink-0 items-center gap-2 shadow-xs">
        <div className="flex items-center gap-2 pl-4 xl:pl-6">
          <h2 className="regular-18 lg:bold-20 2xl:text-3xl font-semibold">
            Dashboard
          </h2>
        </div>
      </header>
      <section className="container account-container">
        <div className="flex flex-1 flex-col space-y-4 pt-0">
          <BoxLoader boxCount={3} style="aspect-video rounded-xl bg-muted/95" />
        </div>
      </section>
    </Fragment>
  );
};

export default observer(Dashboard);
