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
import { useProductsData } from "@/hooks/useProduct";
import { monthMap } from "@/hooks/useRevenueExpenses";

export function OperationalExpensesChart() {
  const { palette } = useTheme();
  const { operationalExpenses } = useProductsData();

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
        title="Despesas Operacionais e Despesas Não Operacionais"
        sideText="4%"
      />

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={400}
          data={operationalExpenses}
          margin={chartMargin}
        >
          <CartesianGrid vertical={false} stroke={palette.grey[800]} />

          <XAxis
            dataKey="name"
            tickFormatter={(month) => monthMap[month.toLowerCase()] || month}
            tickLine={false}
            style={{ fontSize: "10px" }}
          />

          <YAxis
            tickFormatter={(value) =>
              value.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }
            yAxisId="left"
            orientation="left"
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
                name === "Non Operational Expenses"
                  ? "Despesas não operacionais"
                  : name === "Operational Expenses"
                  ? "Despesas Operacionais"
                  : name;

              // Traduzindo o nome do mês corretamente
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
                name === "Non Operational Expenses"
                  ? "Despesas não operacionais"
                  : name === "Operational Expenses"
                  ? "Despesas Operacionais"
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
            dataKey="Non Operational Expenses"
            stroke={palette.tertiary[500]}
          />

          <Line
            yAxisId="right"
            type="monotone"
            dataKey="Operational Expenses"
            stroke={palette.primary.main}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
