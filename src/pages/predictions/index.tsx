import { Box, Button, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DataPoint } from "regression";
import regression from "regression";

import { BoxGridLayout } from "@/components/dashboard-box";
import { FlexBetween } from "@/components/flex-between";
import { monthMapExtense } from "@/hooks/useRevenueExpenses";
import { useGetKpisQuery } from "@/http/api";

export function Predictions() {
  const { palette } = useTheme();
  const [isPredictions, setIsPredictions] = useState(false);
  const { data: kpiData } = useGetKpisQuery();

  const formattedData = useMemo(() => {
    if (!kpiData) return [];
    const monthData = kpiData[0].monthlyData;

    const formatted: Array<DataPoint> = monthData.map(
      ({ revenue }, i: number) => {
        return [i, revenue];
      }
    );
    const regressionLine = regression.linear(formatted);

    return monthData.map(({ month, revenue }, i: number) => {
      return {
        name: month,
        "Actual Revenue": revenue,
        "Regression Line": regressionLine.points[i][1],
        "Predicted Revenue": regressionLine.predict(i + 12)[1],
      };
    });
  }, [kpiData]);

  return (
    <BoxGridLayout width="100%" height={800} p="1rem" overflow="hidden">
      <FlexBetween m="1rem 2.5rem" gap="1rem">
        <Box>
          <Typography variant="h3">Receita e Previsões</Typography>
          <Typography variant="h6">
            receita mapeada e receita prevista com base em um modelo de
            regressão linear simples
          </Typography>
        </Box>
        <Button
          onClick={() => setIsPredictions(!isPredictions)}
          sx={{
            color: palette.grey[900],
            backgroundColor: palette.grey[700],
            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)",
          }}
        >
          Mostrar receita prevista para o próximo ano
        </Button>
      </FlexBetween>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />

          <XAxis
            tickFormatter={(month) =>
              monthMapExtense[month.toLowerCase()] || month
            }
            dataKey="name"
            tickLine={false}
            style={{ fontSize: "10px" }}
          >
            <Label value="Mês" offset={-5} position="insideBottom" />
          </XAxis>

          <YAxis
            domain={[12000, 26000]}
            axisLine={{ strokeWidth: "0" }}
            style={{ fontSize: "10px" }}
            tickFormatter={(value) =>
              value.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }
          >
            <Label
              value="Receita Real"
              angle={-90}
              offset={-5}
              position="insideLeft"
            />
          </YAxis>

          <Tooltip
            formatter={(value, name, props) => {
              const translatedName =
                name === "Actual Revenue"
                  ? "Receita real"
                  : name === "Regression Line"
                  ? "Linha de Regressão"
                  : name === "Predicted Revenue"
                  ? "Receita prevista"
                  : name;

              const translatedMonth =
                monthMapExtense[props.payload.name.toLowerCase()] ||
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
            labelFormatter={(label) =>
              monthMapExtense[label.toLowerCase()] || label
            }
          />

          <Legend
            verticalAlign="top"
            formatter={(name: string) => {
              const translatedName =
                name === "Actual Revenue"
                  ? "Receita Real"
                  : name === "Regression Line"
                  ? "Linha de Regressão"
                  : name === "Predicted Revenue"
                  ? "Receita prevista"
                  : name;

              return translatedName;
            }}
            height={20}
            wrapperStyle={{
              margin: "0 0 10px 0",
            }}
          />

          <Line
            type="monotone"
            dataKey="Actual Revenue"
            stroke={palette.primary.main}
            strokeWidth={0}
            dot={{ strokeWidth: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Regression Line"
            stroke="#8884d8"
            dot={false}
          />
          {isPredictions && (
            <Line
              strokeDasharray="5 5"
              dataKey="Predicted Revenue"
              stroke={palette.secondary[500]}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </BoxGridLayout>
  );
}
