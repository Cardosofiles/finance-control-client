import { Box, useTheme } from "@mui/material";
import { DataGrid, type GridCellParams } from "@mui/x-data-grid";

import { BoxHeader } from "@/components/box-header";
import { usePieChartData } from "@/hooks/usePieChart";

export function RecentOrderstChart() {
  const { palette } = useTheme();
  const { transactionChartData } = usePieChartData();

  const transactionColumns = [
    {
      field: "id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value || 0}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (params: GridCellParams) => {
        const products = (params.value as Array<string>) ?? [];
        return Array.isArray(products) ? products.length : 0;
      },
    },
  ];

  return (
    <>
      <BoxHeader
        title="Pedidos Recentes"
        sideText={`${transactionChartData?.length || 0} Transações recentes`}
      />
      <Box
        mt="0.5rem"
        p="0 0.5rem"
        pb={{ xs: 16, sm: 24, md: 32, lg: 2 }}
        height={400}
        sx={{
          "& .MuiDataGrid-root": {
            color: palette.grey[300],
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${palette.grey[800]} !important`,
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: `1px solid ${palette.grey[800]} !important`,
          },
          "& .MuiDataGrid-columnSeparator": {
            visibility: "hidden",
          },
        }}
      >
        <DataGrid
          columnHeaderHeight={25}
          rowHeight={35}
          hideFooter={true}
          rows={transactionChartData || []}
          columns={transactionColumns}
        />
      </Box>
    </>
  );
}
