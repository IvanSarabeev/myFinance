import { FC, memo } from 'react';
import {
  Trash2,
  TrendingDown,
  TrendingUp,
  ChartNoAxesCombined,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type TransactionInfoCardProps = {
  title: string;
  icon: string | LucideIcon;
  date: string;
  amount: number;
  type: string;
  hideDeleteBtn: boolean;
};

const TransactionInfoCard: FC<TransactionInfoCardProps> = ({ ...props }) => {
  const { title, icon, date, amount, type, hideDeleteBtn } = props;

  const getStyledAmount = () => {
    return type.toLocaleLowerCase() === 'income'
      ? 'bg-green-50 text-green-500'
      : 'bg-red-50 text-red-500 ';
  };

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/50 ">
      <div className="size-12 flexCenter bold-20 text-gray-800 bg-gray-100 rounded-full">
        {icon ? (
          <ChartNoAxesCombined />
        ) : (
          <img
            src={''}
            alt={title}
            className="size-6 aspect-auto object-cover object-center"
          />
        )}
      </div>

      <div className="flex-1 flexBetween">
        <div>
          <p className="regular-14 text-gray-700 font-medium">{title}</p>
          <p className="regular-12 text-gray-400 ml-1">{date}</p>
        </div>

        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <Button
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={() => console.log('On Delete')}
            >
              <Trash2 size={18} />
            </Button>
          )}

          <div
            className={`flex items-center ga-2 px-3 py-1.5 rounded-md ${getStyledAmount()}`}
          >
            <h6 className="regular-12 font-medium">
              {type === 'income' ? '+' : '-'} ${amount}
            </h6>
            {type === 'income' ? <TrendingUp /> : <TrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TransactionInfoCard);
