import { FC, Fragment } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

type CustomPieChartProps = {
  data: { name: string; amount: number }[];
  label: string;
  totalAmount: string;
  colors: string[];
  showTextAnchor?: boolean;
};

const CustomPieChart: FC<CustomPieChartProps> = ({ ...props }) => {
  const { data, label, totalAmount, colors, showTextAnchor } = props;

  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          dataKey="amount"
          data={data}
          cx="50%"
          cy="50%"
          nameKey="name"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data.map((entry, index) => {
            return (
              <Cell
                key={`cell-${index}-${entry.name}`}
                fill={colors[index % colors.length]}
                stroke="#fff"
                strokeWidth={2}
              />
            );
          })}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="custom-tooltip">
                  <p className="label">{`${payload[0].name} : $${payload[0].value}`}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />

        {showTextAnchor && (
          <Fragment>
            <text
              x="50%"
              y="50%"
              dy={-25}
              textAnchor="middle"
              fill="#666"
              dominantBaseline="central"
              className="text-2xl font-bold"
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy={10}
              textAnchor="middle"
              fill="#333"
              dominantBaseline="central"
              className="bold-24 font-semibold"
            >
              {totalAmount}
            </text>
          </Fragment>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
