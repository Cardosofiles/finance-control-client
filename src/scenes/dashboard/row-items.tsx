import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { BoxGridLayout } from "@/components/box-grid-layout";
import { BoxHeader } from "@/components/box-header";
import { useGetKpisQuery } from "@/state/api";

export function RowItemsOne() {
  const { data } = useGetKpisQuery();
  const { palette } = useTheme();

  const monthMap: Record<string, string> = {
    jan: "Jan",
    feb: "Fev",
    mar: "Mar",
    apr: "Abr",
    may: "Mai",
    jun: "Jun",
    jul: "Jul",
    aug: "Ago",
    sep: "Set",
    oct: "Out",
    nov: "Nov",
    dec: "Dez",
  };

  const revenueExpenses = useMemo(() => {
    // Verifica se 'data' existe e se 'monthlyData' também está presente
    return (
      // biome-ignore lint/complexity/useOptionalChain: <explanation>
      data &&
      data[0] &&
      data[0].monthlyData &&
      data[0].monthlyData
        .map(({ month, revenue, expenses }) => {
          // Verifica se 'month', 'revenue', e 'expenses' são válidos
          if (month && revenue !== undefined && expenses !== undefined) {
            // Pegue os três primeiros caracteres do mês original
            const monthAbbr = month.substring(0, 3).toLowerCase();

            return {
              // Traduz os três primeiros caracteres para português
              name: monthMap[monthAbbr] || month,
              revenue: revenue,
              expenses: expenses,
            };
          }
          return null; // Retorna 'null' se algum dos dados não estiver válido
        })
        .filter((item) => item !== null) // Remove os itens 'null' da lista
    );
  }, [data]);

  return (
    <>
      <BoxGridLayout gridArea="a">
        <BoxHeader
          title="Receitas e Despesas"
          subtitle="A linha superior representa a receita, a linha inferior representa as despesas"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{ top: 15, right: 25, left: 10, bottom: 60 }}
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

            {/* Formata os meses para português */}
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

            {/* Formata os valores para o formato "23.000,00" */}
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
              formatter={(value, name) => {
                // Traduz os nomes de revenue e expenses para Receita e Despesas
                const translatedName =
                  name === "revenue"
                    ? "Receita"
                    : name === "expenses"
                    ? "Despesas"
                    : name;

                // Retorna o valor formatado em pt-BR e o nome traduzido
                return [
                  value.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }),
                  translatedName,
                ];
              }}
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
      </BoxGridLayout>

      <BoxGridLayout gridArea="b">a</BoxGridLayout>
      <BoxGridLayout gridArea="c">a</BoxGridLayout>
    </>
  );
}

export function RowItemsTwo() {
  return (
    <>
      <BoxGridLayout gridArea="d">a</BoxGridLayout>
      <BoxGridLayout gridArea="e">a</BoxGridLayout>
      <BoxGridLayout gridArea="f">a</BoxGridLayout>
    </>
  );
}
export function RowItemsThree() {
  return (
    <>
      <BoxGridLayout gridArea="g">a</BoxGridLayout>
      <BoxGridLayout gridArea="h">a</BoxGridLayout>
      <BoxGridLayout gridArea="i">a</BoxGridLayout>
      <BoxGridLayout gridArea="j">a</BoxGridLayout>
    </>
  );
}
