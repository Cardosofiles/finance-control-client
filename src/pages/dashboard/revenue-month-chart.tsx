import { useMediaQuery, useTheme } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { BoxHeader } from "@/components/box-header";
import { monthMap, useRevenueExpensesData } from "@/hooks/useRevenueExpenses";

export function RevenueMonthbyMonthChart() {
  const { palette } = useTheme();
  const { revenue } = useRevenueExpensesData();

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:1200px)");

  const chartMargin = isSmallScreen
    ? { top: 10, right: 10, left: 5, bottom: 60 } // Dispositivos pequenos (mobile)
    : isMediumScreen
    ? { top: 15, right: 20, left: 10, bottom: 60 } // Tablets
    : { top: 20, right: 25, left: 15, bottom: 10 }; // Desktop

  return (
    <>
      <BoxHeader
        title="Receita Mês a Mês"
        subtitle="A linha superior representa a receita, a linha inferior representa as despesas"
        sideText="4%"
      />

      <ResponsiveContainer width="100%" height={280}>
        <BarChart width={500} height={300} data={revenue} margin={chartMargin}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={palette.primary[300]}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={palette.primary[300]}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} stroke={palette.grey[800]} />

          <XAxis
            dataKey="name"
            tickFormatter={(month) => monthMap[month.toLowerCase()] || month}
            axisLine={false}
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

          <Bar
            dataKey="revenue"
            fill="url(#colorRevenue)"
            activeBar={
              <Rectangle
                fill={palette.primary[500]}
                stroke={palette.primary[800]}
              />
            }
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
