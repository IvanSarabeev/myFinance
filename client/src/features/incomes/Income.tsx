/* eslint-disable react-refresh/only-export-components */
import { FC, useEffect } from 'react';
import IncomeOverview from './components/IncomeOverview';
import useStore from '@/hooks/useStore';
import { observer } from 'mobx-react-lite';
import BarChartSkeleton from '@/components/loaders/BarChartSkeleton';

const Income: FC = () => {
  const { incomeStore } = useStore();
  const { isLoading, incomes, fetchIncomes } = incomeStore;

  useEffect(() => {
    fetchIncomes();

    return () => {};
  }, [fetchIncomes]);

  return (
    <section className='className="container account-container flex flex-col justify-center gap-4"'>
      <div className="grid grid-cols-1 gap-6">
        <div className="">
          {isLoading ? (
            <BarChartSkeleton />
          ) : (
            <IncomeOverview transactions={incomes} />
          )}
        </div>
      </div>
    </section>
  );
};

export default observer(Income);
