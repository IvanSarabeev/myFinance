import { FC } from 'react';
import { Badge } from '@/components/ui/badge.tsx';

const ActiveWalletBadge: FC = () => {
  return (
    <Badge
      variant="secondary"
      className="text-[10px] regular-12 text-slate-100 rounded-lg bg-blue-400 my-auto scale-100 hover:bg-blue-500"
    >
      Active
    </Badge>
  );
};

export default ActiveWalletBadge;
