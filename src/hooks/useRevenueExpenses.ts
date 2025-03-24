import { useMemo } from "react";

import { useGetKpisQuery } from "@/http/api";

export const monthMap: Record<string, string> = {
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

export const monthMapExtense: Record<string, string> = {
  january: "Janeiro",
  february: "Fevereiro",
  march: "Março",
  april: "Abril",
  may: "Maio",
  june: "Junho",
  july: "Julho",
  august: "Agosto",
  september: "Setembro",
  october: "Outubro",
  november: "Novembro",
  december: "Dezembro",
};

export const useRevenueExpensesData = () => {
  const { data } = useGetKpisQuery();

  const revenue = useMemo(() => {
    if (!data || !data[0]?.monthlyData) return [];

    return data[0].monthlyData
      .map(({ month, revenue, expenses }) => {
        if (month && revenue !== undefined && expenses !== undefined) {
          const monthAbbr = month.substring(0, 3).toLowerCase();

          return {
            name: monthMap[monthAbbr] || month,
            revenue: revenue,
          };
        }
        return null;
      })
      .filter((item) => item !== null);
  }, [data]);

  const revenueExpenses = useMemo(() => {
    if (!data || !data[0]?.monthlyData) return [];

    return data[0].monthlyData
      .map(({ month, revenue, expenses }) => {
        if (month && revenue !== undefined && expenses !== undefined) {
          const monthAbbr = month.substring(0, 3).toLowerCase();

          return {
            name: monthMap[monthAbbr] || month,
            revenue,
            expenses,
          };
        }
        return null;
      })
      .filter((item) => item !== null);
  }, [data]);

  const revenueProfit = useMemo(() => {
    if (!data || !data[0]?.monthlyData) return [];

    return data[0].monthlyData
      .map(({ month, revenue, expenses }) => {
        if (month && revenue !== undefined && expenses !== undefined) {
          const monthAbbr = month.substring(0, 3).toLowerCase();

          return {
            name: monthMap[monthAbbr] || month,
            revenue,
            profit: Number.parseFloat((revenue - expenses).toFixed(2)), // Converte para número com 2 casas decimais
          };
        }
        return null;
      })
      .filter((item) => item !== null);
  }, [data]);

  return { revenueExpenses, revenueProfit, revenue };
};
