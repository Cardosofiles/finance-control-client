import { Box, Typography, useTheme } from "@mui/material";
import { Cell, Pie, PieChart } from "recharts";

import { BoxHeader } from "@/components/box-header";
import { FlexBetween } from "@/components/flex-between";
import { usePieChartData } from "@/hooks/usePieChart";

export function ExpenseBreackdownsChart() {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];
  const { productChartData } = usePieChartData();

  const translationMap: { [key: string]: string } = {
    salaries: "Salários",
    "salaries of Total": "Salários do Total",
    supplies: "Suprimentos",
    "supplies of Total": "Suprimentos do Total",
    services: "Serviços",
    "services of Total": "Serviços do Total",
    "$*": "Outros",
    "$* of Total": "Outros do Total",
  };

  return (
    <>
      <BoxHeader title="Despesas por Categoria" sideText="+4%" />
      <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
        {productChartData?.map((data, i) => (
          <Box key={`${data[0].name}-${i}`}>
            <PieChart width={110} height={100}>
              <Pie
                stroke="none"
                data={data}
                innerRadius={18}
                outerRadius={35}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((_entry, index) => (
                  <Cell
                    key={`cell-${
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      index
                    }`}
                    fill={pieColors[index]}
                  />
                ))}
              </Pie>
            </PieChart>
            <Typography variant="h5">
              {translationMap[data[0].name] || data[0].name}{" "}
            </Typography>
          </Box>
        ))}
      </FlexBetween>
    </>
  );
}
