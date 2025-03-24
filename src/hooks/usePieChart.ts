import { useMemo } from "react";

import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/http/api";

export const usePieChartData = () => {
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();

  const productChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ];
        }
      );
    }
  }, [kpiData]);

  const productExpenseData = useMemo(() => {
    return (
      // biome-ignore lint/complexity/useOptionalChain: <explanation>
      productData &&
      productData.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price: price,
          expense: expense,
        };
      })
    );
  }, [productData]);

  const transactionChartData = useMemo(() => {
    return (
      // biome-ignore lint/complexity/useOptionalChain: <explanation>
      transactionData &&
      transactionData.map(({ _id, buyer, amount }) => {
        return {
          id: _id,
          buyer: buyer,
          amount: amount,
        };
      })
    );
  }, [transactionData]);

  return { productChartData, productExpenseData, transactionChartData };
};
