import { Box, Typography, useTheme } from "@mui/material";
import { Cell, Pie, PieChart } from "recharts";

import { BoxHeader } from "@/components/box-header";
import { FlexBetween } from "@/components/flex-between";

export function CampaingsTargetsChart() {
  const { palette } = useTheme();

  const pieData = [
    { name: "Group A", value: 600 },
    { name: "Group B", value: 400 },
  ];

  const pieColors = [palette.primary[800], palette.primary[300]];

  return (
    <>
      <BoxHeader title="Campanhas e Metas" sideText="4%" />

      <FlexBetween mt="2.25rem" gap="1.5rem" pr="1rem">
        <PieChart
          width={110}
          height={100}
          margin={{
            top: 0,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <Pie
            stroke="none"
            data={pieData}
            innerRadius={18}
            outerRadius={38}
            paddingAngle={2}
            dataKey="value"
          >
            {pieData.map((_entry, index) => (
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

        <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
          <Typography variant="h5">Vendas alvo</Typography>

          <Typography variant="h3" m="0.3rem 0" color={palette.primary[300]}>
            83
          </Typography>

          <Typography variant="h6" color={palette.grey[400]}>
            Objetivo financeiro da campanha que se deseja
          </Typography>
        </Box>

        <Box flexBasis="40%">
          <Typography variant="h5">Perdas e Receita</Typography>

          <Typography variant="h6">As perdas estão diminuindo</Typography>

          <Typography variant="h5" mt="0.4rem">
            Margem de Lucro
          </Typography>

          <Typography variant="h6">
            As margens aumentaram em 30% relação ao mês passado
          </Typography>
        </Box>
      </FlexBetween>
    </>
  );
}
