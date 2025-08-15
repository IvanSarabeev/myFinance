import { FC } from 'react';

type CustomLegendProps = {
  payload?: { value: string; color: string }[];
};

const CustomLegend: FC<CustomLegendProps> = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4 space-x-6">
      {payload?.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center space-x-2">
          <div
            className="size-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="regular-12 text-gray-700 font-medium">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
