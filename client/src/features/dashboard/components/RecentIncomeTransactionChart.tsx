import { FC, useEffect, useState } from 'react';
import { Income } from '@/types/features/dashboard';
import CustomPieChart from './charts/CustomPieChart';

type RecentTransactionsProps = {
  data: Income[];
  totalIncome: number;
};

type ChartDataState = {
  name: string;
  amount: number;
};

const COLORS = ['#875CF5', '#FA2C37', '#FF6900', '#4F39F6'];

const RecentIncomeTransactionChart: FC<RecentTransactionsProps> = ({
  data,
  totalIncome,
}) => {
  const [chartData, setChartData] = useState<ChartDataState[]>([]);

  useEffect(() => {
    const mappedData = data?.map((item) => ({
      name: typeof item.source === 'string' ? item.source : String(item.source),
      amount: item?.amount || 0,
    }));

    setChartData(mappedData);

    return () => {};
  }, [data]);

  return (
    <div className="card">
      <div className="flexBetween">
        <h5 className="regular-18">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        label="Total Income"
        totalAmount={`$${totalIncome}`}
        showTextAnchor
        data={chartData}
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeTransactionChart;
