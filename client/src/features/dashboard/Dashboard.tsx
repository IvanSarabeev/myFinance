/* eslint-disable react-refresh/only-export-components */
import { FC, Fragment, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import BoxLoader from './components/loaders/BoxLoader';
// import TransactionsChart from "./components/charts/transactions-bar";
import useStore from '@/hooks/useStore';
import InfoCard from '@/components/InfoCard';
import { addThousandSeparator } from '@/utils/helpers';
import { CreditCard, HandCoins, Wallet } from 'lucide-react';

const Dashboard: FC = () => {
  const { dashboardStore } = useStore();

  const { isLoading, incomeDetails, expenseDetails, loadDashboardData } =
    dashboardStore;

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  if (isLoading) return <BoxLoader boxCount={3} />;

  const totalBalance =
    incomeDetails?.totalIncome !== undefined &&
    expenseDetails?.totalExpense !== undefined
      ? incomeDetails.totalIncome - expenseDetails.totalExpense
      : 0;

  return (
    <Fragment>
      <section className="container account-container flex flex-col justify-center gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            Icon={CreditCard}
            label="Total Balance"
            value={addThousandSeparator(totalBalance || 0)}
            color="bg-primary"
          />
          <InfoCard
            Icon={Wallet}
            label="Total Income"
            value={addThousandSeparator(incomeDetails?.totalIncome || 0)}
            color="bg-orange-500"
          />
          <InfoCard
            Icon={HandCoins}
            label="Total Expense"
            value={addThousandSeparator(expenseDetails?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>
      </section>
    </Fragment>
  );
};

export default observer(Dashboard);
