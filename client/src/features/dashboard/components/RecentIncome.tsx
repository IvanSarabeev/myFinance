import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { LucideArrowRight } from 'lucide-react';
import TransactionInfoCard from './TransactionInfoCard';
import { Income } from '@/types/features/dashboard';
import { format } from 'date-fns';

type RecentIncomeProps = {
  transactions: Income[];
};

const RecentIncome: FC<RecentIncomeProps> = ({ transactions }) => {
  return (
    <div className="card">
      <div className="flexBetween">
        <h5 className="regular-18">Recent Incomes</h5>

        <Button className="card-btn">
          See All <LucideArrowRight className="regular-14" />
        </Button>
      </div>

      <div className="mt-6">
        {transactions
          ?.slice(0, 5)
          .map((transaction) => (
            <TransactionInfoCard
              key={transaction._id}
              title={transaction.source}
              icon={transaction.icon}
              date={format(transaction.date, 'yyyy-MM-dd')}
              amount={transaction.amount}
              type="income"
              hideDeleteBtn
            />
          ))}
      </div>
    </div>
  );
};

export default RecentIncome;
