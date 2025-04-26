import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const TransactionsChart: FC = () => {
  const chartData = [
    { month: "January", transactions: 30, amount: 1000 },
    { month: "February", transactions: 20, amount: 800 },
    { month: "March", transactions: 25, amount: 1200 },
    { month: "April", transactions: 35, amount: 1500 },
    { month: "May", transactions: 40, amount: 2000 },
    { month: "June", transactions: 50, amount: 2500 },
    { month: "July", transactions: 60, amount: 3000 },
    { month: "August", transactions: 70, amount: 3500 },
    { month: "September", transactions: 80, amount: 4000 },
    { month: "October", transactions: 90, amount: 4500 },
    { month: "November", transactions: 100, amount: 5000 },
    { month: "December", transactions: 110, amount: 5500 },
  ];

  const chartConfig = {
    transactions: {
      label: "Transactions",
      color: "hsl(var(--chart-color-1))",
    },
    amount: {
      label: "Amount",
      color: "hsl(var(--chart-color-2))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions - Bar Chart</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey={"month"}
              tickLine={false}
              tickMargin={10}
              axisLine
              tickFormatter={(value) => value.slice(0, 3)}
              style={{ fontSize: 12, fill: "hsl(var(--text-color))" }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="transactions"
              fill={chartConfig.transactions.color}
              radius={4}
            />
            <Bar dataKey="amount" fill={chartConfig.amount.color} radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flexCol items-start gap-2 regular-12">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};

export default TransactionsChart;
