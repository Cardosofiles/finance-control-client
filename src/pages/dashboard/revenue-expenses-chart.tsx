import { useMediaQuery, useTheme } from "@mui/material";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { BoxHeader } from "@/components/box-header";
import { monthMap, useRevenueExpensesData } from "@/hooks/useRevenueExpenses";

export function RevenueExpensesCharts() {
  const { revenueExpenses } = useRevenueExpensesData();
  const { palette } = useTheme();

  // Responsividade
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:1200px)");

  // Definição dinâmica das margens
  const chartMargin = isSmallScreen
    ? { top: 10, right: 16, left: 5, bottom: 60 } // Dispositivos pequenos (mobile)
    : isMediumScreen
    ? { top: 15, right: 20, left: 10, bottom: 60 } // Tablets
    : { top: 20, right: 25, left: 15, bottom: 20 }; // Desktop

  const totalRevenue = revenueExpenses.reduce(
    (acc, { revenue }) =>
      acc + Number.parseFloat(String(revenue).replace("$", "")),
    0
  );

  const totalExpenses = revenueExpenses.reduce(
    (acc, { expenses }) =>
      acc + Number.parseFloat(String(expenses).replace("$", "")),
    0
  );

  const totalProfit = totalRevenue - totalExpenses;
  const profitPercentage = ((totalProfit / totalRevenue) * 100).toFixed(2);

  return (
    <>
      <BoxHeader
        title="Receitas e Despesas"
        subtitle="A linha superior representa a receita, a linha inferior representa as despesas"
        sideText={`${profitPercentage}%`}
      />

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          width={500}
          height={400}
          data={revenueExpenses}
          margin={chartMargin}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={palette.primary[300]}
                stopOpacity={0.5}
              />
              <stop
                offset="95%"
                stopColor={palette.primary[300]}
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={palette.primary[300]}
                stopOpacity={0.5}
              />
              <stop
                offset="95%"
                stopColor={palette.primary[300]}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="name"
            tickFormatter={(month) => monthMap[month.toLowerCase()] || month}
            tickLine={false}
            style={{
              fontFamily: "Inter",
              fontSize: 10,
              fontWeight: 400,
              color: palette.grey[700],
            }}
          />

          <YAxis
            tickFormatter={(value) =>
              value.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }
            tickLine={false}
            axisLine={{ strokeWidth: "0" }}
            style={{
              fontFamily: "Inter",
              fontSize: 10,
              fontWeight: 400,
              color: palette.grey[700],
            }}
            domain={[8000, 23000]}
          />

          <Tooltip
            formatter={(value, name, props) => {
              const translatedName =
                name === "revenue"
                  ? "Receita"
                  : name === "expenses"
                  ? "Despesas"
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

          <Area
            type="monotone"
            dot={true}
            dataKey="revenue"
            stroke={palette.primary.main}
            fillOpacity={1}
            fill="url(#colorRevenue)"
          />
          <Area
            type="monotone"
            dot={true}
            dataKey="expenses"
            stroke={palette.primary.main}
            fillOpacity={1}
            fill="url(#colorExpenses)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}
