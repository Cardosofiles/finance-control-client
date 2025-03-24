import { useMediaQuery, useTheme } from "@mui/material";
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

import { BoxHeader } from "@/components/box-header";
import { useProductsData } from "@/hooks/useProduct";

export function ProductPricesExpensesChart() {
  const { palette } = useTheme();
  const { productExpenseData } = useProductsData();

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:1200px)");

  const chartMargin = isSmallScreen
    ? { top: 10, right: 10, left: 5, bottom: 60 } // Dispositivos pequenos (mobile)
    : isMediumScreen
    ? { top: 15, right: 20, left: 10, bottom: 60 } // Tablets
    : { top: 20, right: 25, left: 15, bottom: 10 }; // Desktop

  return (
    <>
      <BoxHeader title="Preços dos Produtos vs Despesas" sideText="+4%" />
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={chartMargin}>
          <CartesianGrid stroke={palette.grey[800]} />

          <XAxis
            type="number"
            dataKey="price"
            name="price"
            axisLine={false}
            tickLine={false}
            style={{ fontSize: "10px" }}
            tickFormatter={(value) =>
              value.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }
          />

          <YAxis
            type="number"
            dataKey="expense"
            name="expense"
            axisLine={false}
            tickLine={false}
            style={{ fontSize: "10px" }}
            tickFormatter={(value) =>
              value.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }
          />

          <ZAxis type="number" range={[20]} />

          <Tooltip
            formatter={(value, name) => {
              const translatedName =
                name === "price"
                  ? "Preço"
                  : name === "expense"
                  ? "Despesa"
                  : name;

              return [
                value.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }),
                translatedName,
              ];
            }}
          />

          <Scatter
            name="Product Expense Ratio"
            data={productExpenseData}
            fill={palette.tertiary[500]}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </>
  );
}
