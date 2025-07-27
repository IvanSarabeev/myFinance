import { FC, memo } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import TransactionInfoCard from './TransactionInfoCard';
import { format } from 'date-fns-tz';
import {
  ExpenseCategoryLabels,
  IncomeSourceLabels,
  Transaction,
} from '@/types/features/defaults';
import { isIncome } from '@/utils/helpers';

type RecentTransactionsProps = {
  transactions: Transaction[];
  handleMore: () => void;
};

const RecentTransactions: FC<RecentTransactionsProps> = ({ ...props }) => {
  const { transactions, handleMore } = props;

  return (
    <div className="card">
      <div className="flexBetween">
        <h5 className="regular-18">Recent Transactions</h5>

        <Button className="card-btn" onClick={handleMore}>
          See all{' '}
          <ArrowRight height={10} width={10} className="size-2 regular-16" />
        </Button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5).map((transaction) => {
          const title = isIncome(transaction)
            ? (IncomeSourceLabels[
                transaction?.source as keyof typeof IncomeSourceLabels
              ] ?? 'Unknown source')
            : (ExpenseCategoryLabels[
                transaction.category as keyof typeof ExpenseCategoryLabels
              ] ?? 'Unknown category');

          return (
            <TransactionInfoCard
              key={transaction._id}
              title={title}
              icon={transaction.icon}
              date={format(transaction.date, 'yyyy-MM-dd')}
              amount={transaction.amount}
              type={transaction.type}
              hideDeleteBtn
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(RecentTransactions);
