/* eslint-disable react-refresh/only-export-components */
import { FC, Fragment, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import BoxLoader from './components/loaders/BoxLoader';
import useStore from '@/hooks/useStore';
import InfoCard from '@/components/InfoCard';
import { addThousandSeparator } from '@/utils/helpers';
import { CreditCard, HandCoins, Wallet } from 'lucide-react';
import RecentTransactions from './components/RecentTransactions';
import FinanceOverview from './components/FinanceOverview';
import ExpenseTransactions from './components/ExpenseTransactions';
import LastMonthExpenses from './components/LastMonthExpenses';
import RecentIncomeTransactionChart from './components/RecentIncomeTransactionChart';
import RecentIncome from './components/RecentIncome';

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
      ? Number(incomeDetails.totalIncome - expenseDetails.totalExpense).toFixed(
          2
        )
      : 0;

  const mergeTransactions = [
    ...(incomeDetails?.recentTransactions || []),
    ...(expenseDetails?.recentTransactions || []),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Fragment>
      <section className="container account-container flex flex-col justify-center gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            Icon={CreditCard}
            label="Total Balance"
            value={addThousandSeparator(Number(totalBalance) || 0)}
            color="bg-primary"
          />
          <InfoCard
            Icon={Wallet}
            label="Total Income"
            value={addThousandSeparator(
              Number(incomeDetails?.totalIncome.toFixed(2) || 0)
            )}
            color="bg-orange-500"
          />
          <InfoCard
            Icon={HandCoins}
            label="Total Expense"
            value={addThousandSeparator(
              Number(expenseDetails?.totalExpense.toFixed(2) || 0)
            )}
            color="bg-red-500"
          />
        </div>
        <div className="size-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {mergeTransactions.length > 0 && (
            <RecentTransactions
              transactions={mergeTransactions}
              handleMore={() => console.log('Click on more...')}
            />
          )}

          <FinanceOverview
            totalBalance={Number(totalBalance) || 0}
            totalIncome={incomeDetails?.totalIncome || 0}
            totalExpense={expenseDetails?.totalExpense || 0}
          />

          <ExpenseTransactions
            transactions={expenseDetails?.recentTransactions || []}
          />

          {expenseDetails?.last30DaysExpenses !== undefined &&
            expenseDetails.last30DaysExpenses.transactions.length > 0 && (
              <LastMonthExpenses
                data={expenseDetails?.last30DaysExpenses?.transactions || []}
              />
            )}

          {incomeDetails?.last60DaysIncome !== undefined &&
            incomeDetails.last60DaysIncome?.transactions?.length > 0 && (
              <RecentIncomeTransactionChart
                data={incomeDetails?.last30DaysIncome?.transactions || []}
                totalIncome={incomeDetails.totalIncome || 0}
              />
            )}

          {incomeDetails?.last60DaysIncome !== undefined &&
            incomeDetails.last60DaysIncome?.transactions?.length > 0 && (
              <RecentIncome
                transactions={
                  incomeDetails?.last60DaysIncome?.transactions || []
                }
              />
            )}
        </div>
      </section>
    </Fragment>
  );
};

export default observer(Dashboard);
