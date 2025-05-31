import { FC } from 'react';
import { CurrencyIconOptions, CurrencyKey } from '../../config/index.js';
import { GiCoins } from 'react-icons/gi';
import { cn } from '../../../../lib/utils.js';

type CurrencyBadgeProps = {
  currency: CurrencyKey;
  styles?: string;
};

const CurrencyBadge: FC<CurrencyBadgeProps> = ({ currency, styles }) => {
  const Icon = CurrencyIconOptions[currency] ?? GiCoins;

  return <Icon className={cn('size-4 text-gray-500', styles)} />;
};

export default CurrencyBadge;
