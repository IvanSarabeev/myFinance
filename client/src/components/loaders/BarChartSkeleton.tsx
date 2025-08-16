import { FC } from 'react';

const BarChartSkeleton: FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mt-6 animate-pulse">
      <div className="mb-6">
        <div className="h-5 w-40 bg-gray-200 rounded mb-2" />
        <div className="h-3 w-64 bg-gray-100 rounded" />
      </div>

      {/* Chart Area */}
      <div className="h-[300px] w-full flex items-end gap-6 px-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div
              className={`w-7/12 bg-gray-200 rounded-t-lg mb-3`}
              style={{
                height: `${80 + i * 30}px`,
              }}
            />
            {/* X-axis label placeholder */}
            <div className="w-10 h-3 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChartSkeleton;
