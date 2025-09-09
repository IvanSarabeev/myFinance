/* eslint-disable react-refresh/only-export-components */
import { FC, useEffect, useState } from 'react';
import { Income } from '@/types/features/income/api';
import { prepareIncomeBarChartData } from '@/utils/helpers';
import { LucidePlus } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import CustomBarChart from '@/features/dashboard/components/charts/CustomBarChart';
import useStore from '@/hooks/useStore';
import { observer } from 'mobx-react-lite';

type IncomeOverviewProps = {
  transactions: Income[];
};

type chartDataState = {
  month: string;
  amount: number;
  source: string;
};

const IncomeOverview: FC<IncomeOverviewProps> = ({ transactions }) => {
  const { modalStore } = useStore();

  const [chartData, setChartData] = useState<chartDataState[]>([]);

  const handleModalOpen = () => {
    modalStore.setIncomeCreateModal({ message: '' });
  };

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div className="card">
      <div className="flexBetween">
        <div className="">
          <h5 className="regular-18">Income Overview</h5>
          <p className="regular-12 text-gray-400 mt-0.5">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>

        <Button
          size="sm"
          variant="ghost"
          className="add-btn bg-[#876cf5] text-slate-100"
          onClick={handleModalOpen}
        >
          <LucidePlus className="regular-18" />
          Add Income
        </Button>
      </div>

      <div className="mt-6 lg:mt-10">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default observer(IncomeOverview);
