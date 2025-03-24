import { useMemo } from "react";

import { useGetKpisQuery, useGetProductsQuery } from "@/http/api";

export const useProductsData = () => {
  const { data: productData } = useGetProductsQuery();
  const { data: operationalData } = useGetKpisQuery();

  const operationalExpenses = useMemo(() => {
    return (
      // biome-ignore lint/complexity/useOptionalChain: <explanation>
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            "Operational Expenses": operationalExpenses,
            "Non Operational Expenses": nonOperationalExpenses,
          };
        }
      )
    );
  }, [operationalData]);

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

  return { operationalExpenses, productExpenseData };
};
