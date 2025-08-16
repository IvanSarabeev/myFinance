import { FC, useEffect, useState } from 'react';
import { Expense } from '@/types/features/dashboard';
import { prepareChartData } from '@/utils/helpers';
import CustomBarChart from './charts/CustomBarChart';

type LastMonthExpensesProps = {
  data: Expense[];
};

type ChartDataState = {
  category: string;
  amount: number;
};

const LastMonthExpenses: FC<LastMonthExpensesProps> = ({ data }) => {
  const [chartData, setChartData] = useState<ChartDataState[]>([]);

  useEffect(() => {
    const result = prepareChartData(
      data.map((item) => [item.category, item.amount])
    );
    setChartData(result);
    return () => {};
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className="flexBetween">
        <h5 className="regular-18">Last 30 Days Expenses</h5>
      </div>

      <CustomBarChart data={chartData} />
    </div>
  );
};

export default LastMonthExpenses;
