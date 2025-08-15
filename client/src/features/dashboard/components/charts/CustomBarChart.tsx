import { FC } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

type CustomBarChartProps = {
  data: { category: string; amount: number }[];
};

const getBarColor = (index: number) => {
  return index % 2 === 0 ? '876cf5' : 'cfbefb';
};

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: { category: string; amount: number } }>;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-2 border">
        <p className="regular-12 font-semibold text-purple-800 mb-1">
          {payload[0]?.payload.category}
        </p>
        <p className="regular-14 text-gray-600">
          Amount:{' '}
          <span className="regular-14 font-medium text-gray-900">
            {payload[0]?.payload.amount}
          </span>
        </p>
      </div>
    );
  }

  return null;
};

const CustomBarChart: FC<CustomBarChartProps> = ({ data }) => {
  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />

          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#555' }} />
          <YAxis tick={{ fontSize: 12, fill: '#555' }} stroke="none" />

          <Tooltip content={<CustomTooltip />} />
          {/* <Legend content={<CustomLegend />} /> */}

          <Bar
            dataKey="amount"
            fill="#FF8042"
            radius={[10, 10, 0, 0]}
            activeBar={{ r: 8, fill: 'yellow' }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`${index}-${entry.category}`}
                fill={getBarColor(index)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
