import { FC } from 'react';

type CustomTooltipProps = {
  active?: boolean;
  payload?: { name: string; value: number }[];
};

const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg p-2 border border-gray-300 shadow-md bg-white">
        <p className="text-xs font-semibold text-blue-800 mb-1">
          {payload[0].name}
        </p>
        <p className="regular-14 text-gray-600">
          Amount:{' '}
          <span className="text-sm font-medium text-gray-900">
            ${payload[0].value}
          </span>
        </p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
