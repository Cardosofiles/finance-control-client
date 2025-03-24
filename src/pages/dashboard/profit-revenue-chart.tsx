import { useMediaQuery, useTheme } from "@mui/material";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { BoxHeader } from "@/components/box-header";
import { monthMap, useRevenueExpensesData } from "@/hooks/useRevenueExpenses";

export function ProfitRevenueChart() {
  const { palette } = useTheme();
  const { revenueProfit } = useRevenueExpensesData();

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:1200px)");

  const chartMargin = isSmallScreen
    ? { top: 10, right: 10, left: 5, bottom: 60 } // Dispositivos pequenos (mobile)
    : isMediumScreen
    ? { top: 15, right: 20, left: 10, bottom: 60 } // Tablets
    : { top: 20, right: 25, left: 15, bottom: 10 }; // Desktop

  const totalRevenue = revenueProfit.reduce(
    (acc, { revenue }) => acc + revenue,
    0
  );
  const totalProfit = revenueProfit.reduce(
    (acc, { profit }) => acc + profit,
    0
  );

  const profitPercentage = ((totalProfit / totalRevenue) * 100).toFixed(2);

  return (
    <>
      <BoxHeader
        title="Lucro e Receita"
        subtitle="A linha superior representa a receita, a linha inferior representa as despesas"
        sideText={`${profitPercentage}%`}
      />

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={500}
          height={400}
          data={revenueProfit}
          margin={chartMargin}
        >
          <CartesianGrid vertical={false} stroke={palette.grey[800]} />

          <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />

          <YAxis
            tickFormatter={(value) =>
              value.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }
            yAxisId="left"
            tickLine={false}
            axisLine={false}
            style={{ fontSize: "10px" }}
          />

          <YAxis
            tickFormatter={(value) =>
              value.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            style={{ fontSize: "10px" }}
          />

          <Tooltip
            formatter={(value, name, props) => {
              const translatedName =
                name === "revenue"
                  ? "Receita"
                  : name === "profit"
                  ? "Lucro"
                  : name;

              const translatedMonth =
                monthMap[props.payload.name.toLowerCase()] ||
                props.payload.name;

              return [
                value.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }),
                translatedName,
                translatedMonth,
              ];
            }}
            labelFormatter={(label) => monthMap[label.toLowerCase()] || label}
          />

          <Legend
            formatter={(name: string) => {
              const translatedName =
                name === "revenue"
                  ? "Receita"
                  : name === "profit"
                  ? "Lucro"
                  : name;

              return translatedName;
            }}
            height={20}
            wrapperStyle={{
              margin: "0 0 10px 0",
            }}
          />

          <Line
            yAxisId="left"
            type="monotone"
            dataKey="profit"
            stroke={palette.tertiary[500]}
          />

          <Line
            yAxisId="right"
            type="monotone"
            dataKey="revenue"
            stroke={palette.primary.main}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
