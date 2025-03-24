import { Box, useMediaQuery } from "@mui/material";

import { BoxGridLayout } from "@/components/box-grid-layout";
import {
  gridTemplateLargeScreens,
  gridTemplateSmallScreens,
} from "@/components/layout-grid";
import { CampaingsTargetsChart } from "./campaings-targets-chart";
import { ExpenseBreackdownsChart } from "./expense-breakdowns-chart";
import { ListProductChart } from "./list-products-chart";
import { OperationalExpensesChart } from "./operational-expenses.chart";
import { OverallSumamryChart } from "./overrall-summary-chart";
import { ProductPricesExpensesChart } from "./products-prices-expenses-chart";
import { ProfitRevenueChart } from "./profit-revenue-chart";
import { RecentOrderstChart } from "./recent-orders-chart";
import { RevenueExpensesCharts } from "./revenue-expenses-chart";
import { RevenueMonthbyMonthChart } from "./revenue-month-chart";

export function Dashboard() {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <>
      <Box
        width="100%"
        height="100%"
        display="grid"
        gap="1.5rem"
        sx={
          isAboveMediumScreens
            ? {
                gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
                gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
                gridTemplateAreas: gridTemplateLargeScreens,
              }
            : {
                gridAutoColumns: "1fr",
                gridAutoRows: "80px",
                gridTemplateAreas: gridTemplateSmallScreens,
              }
        }
      >
        <>
          <BoxGridLayout gridArea="a">
            <RevenueExpensesCharts />
          </BoxGridLayout>

          <BoxGridLayout gridArea="b">
            <ProfitRevenueChart />
          </BoxGridLayout>

          <BoxGridLayout gridArea="c">
            <RevenueMonthbyMonthChart />
          </BoxGridLayout>

          <BoxGridLayout gridArea="d">
            <OperationalExpensesChart />
          </BoxGridLayout>

          <BoxGridLayout gridArea="e">
            <CampaingsTargetsChart />
          </BoxGridLayout>

          <BoxGridLayout gridArea="f">
            <ProductPricesExpensesChart />
          </BoxGridLayout>

          <BoxGridLayout gridArea="g">
            <ListProductChart />
          </BoxGridLayout>

          <BoxGridLayout gridArea="h">
            <RecentOrderstChart />
          </BoxGridLayout>

          <BoxGridLayout gridArea="i">
            <ExpenseBreackdownsChart />
          </BoxGridLayout>

          <BoxGridLayout gridArea="j">
            <OverallSumamryChart />
          </BoxGridLayout>
        </>
      </Box>
    </>
  );
}
