import { FC, memo } from 'react';
import CustomPieChart from './charts/CustomPieChart';

type FinanceOverviewProps = {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
};

const DEFAULT_COLORS = ['#6366F1', '#10B981', '#EF4444'];

const FinanceOverview: FC<FinanceOverviewProps> = ({ ...props }) => {
  const { totalBalance, totalIncome, totalExpense } = props;

  const balanceData = [
    { name: 'Total Balance', amount: totalBalance },
    { name: 'Total Income', amount: totalIncome },
    { name: 'Total Expense', amount: totalExpense },
  ];

  return (
    <div className="card">
      <div className="felxBetween">
        <h5 className="regular-18">Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`$${totalBalance}`}
        colors={DEFAULT_COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default memo(FinanceOverview);
