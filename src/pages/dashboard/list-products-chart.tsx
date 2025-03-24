import { Box, useTheme } from "@mui/material";
import { DataGrid, type GridCellParams } from "@mui/x-data-grid";

import { BoxHeader } from "@/components/box-header";
import { usePieChartData } from "@/hooks/usePieChart";

export function ListProductChart() {
  const { palette } = useTheme();
  const { productExpenseData } = usePieChartData();

  const productColumns = [
    {
      field: "id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  return (
    <>
      <BoxHeader
        title="Lista de Produtos"
        sideText={`${productExpenseData?.length} produtos`}
      />
      <Box
        mt="0.5rem"
        p="0 0.5rem"
        pb={{ xs: "2.5rem", sm: "1.5rem", md: "2rem", lg: "0.5rem" }}
        height={250}
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
          rows={productExpenseData || []}
          columns={productColumns}
        />
      </Box>
    </>
  );
}
