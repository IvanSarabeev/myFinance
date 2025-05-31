import { FC } from 'react';
import { Skeleton } from '@/components/ui/skeleton.tsx';

type RowLoaderProps = {
  rowNumber: number;
};

const RowLoader: FC<RowLoaderProps> = ({ rowNumber }) => {
  const skeleton = [...Array(rowNumber)];

  return skeleton.map((item, index) => {
    return (
      <div
        key={`${item}-${index}`}
        className="w-full flexCenter py-1 lg:py-1.5 px-2 space-x-2 lg:space-x-4 animate-pulse"
      >
        <Skeleton className="h-16 w-20 rounded-full bg-slate-400" />
        <div className="w-full flexCol gap-y-2">
          <div className="h-4 w-full bg-slate-300" />
          <div className="h-4 w-3/4 bg-slate-200" />
        </div>
      </div>
    );
  });
};

export default RowLoader;
