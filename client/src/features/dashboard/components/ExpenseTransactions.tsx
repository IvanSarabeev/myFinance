import { FC } from 'react';
import { Expense } from '@/types/features/expense/api';
import useRedirect from '@/hooks/useRedirect';
import { Button } from '@/components/ui/button';
import { LucideArrowRight } from 'lucide-react';
import TransactionInfoCard from './TransactionInfoCard';
import { format } from 'date-fns-tz';

type ExpenseTransactionsProps = {
  transactions: Expense[];
};

const ExpenseTransactions: FC<ExpenseTransactionsProps> = ({
  transactions,
}) => {
  const redirect = useRedirect();

  return (
    <div className="card">
      <div className="flexBetween">
        <h5 className="regular-18">Expenses</h5>

        <Button className="card-btn" onClick={() => redirect('/expenses')}>
          See All <LucideArrowRight className="text-base" />
        </Button>
      </div>

      <div className="mt-6">
        {transactions?.length > 0
          ? transactions
              ?.slice(0, 5)
              ?.map((transaction) => (
                <TransactionInfoCard
                  key={transaction._id}
                  title={transaction.category}
                  icon={transaction.icon}
                  type="expense"
                  date={format(transaction.date, 'yyyy-MM-dd')}
                  amount={transaction.amount}
                  hideDeleteBtn
                />
              ))
          : null}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
