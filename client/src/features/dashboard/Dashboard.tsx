/* eslint-disable react-refresh/only-export-components */
import { FC, Fragment } from "react";
import { observer } from "mobx-react-lite";
// import BoxLoader from "./components/loaders/BoxLoader";
// import TransactionsChart from "./components/charts/transactions-bar";
import CategoryPieChart from "./components/charts/category-pie";
import CountryPieChart from "./components/charts/country-pie";
import TrendingRadialChart from "./components/charts/trending-radial";
import { DataTable } from "./components/tables/data-table";
import data from "./config/data.json";
import { ChartAreaInteractive } from "./components/charts/interactive-chart-area";
// import { modalStore } from "@/stores";
// import { MODAL_TYPES } from "@/defines";

const Dashboard: FC = () => {
  // useEffect(() => {
  //   modalStore.openModal(MODAL_TYPES.CUSTOM_ACCOUNT);
  // }, []);

  return (
    <Fragment>
      <header className="flex h-16 shrink-0 items-center gap-2 shadow-xs">
        <div className="flex items-center gap-2 pl-4 xl:pl-6">
          <h2 className="regular-18 lg:bold-20 2xl:text-3xl font-semibold">
            Dashboard
          </h2>
        </div>
      </header>
      <section className="container account-container flex flex-col justify-center gap-4">
        <div className="flex flex-wrap gap-1 lg:gap-2 xl:gap-3 2xl:gap-4">
          <TrendingRadialChart />
          <CategoryPieChart />
          <CountryPieChart />
        </div>
        {/* <TransactionsChart /> */}
        <ChartAreaInteractive />
        <DataTable data={data} />
      </section>
    </Fragment>
  );
};

export default observer(Dashboard);
