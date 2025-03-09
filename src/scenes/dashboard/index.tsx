import { Box, useMediaQuery } from "@mui/material";

import {
  gridTemplateLargeScreens,
  gridTemplateSmallScreens,
} from "@/components/layout-grid";
import { RowItemsOne, RowItemsThree, RowItemsTwo } from "./row-items";

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
        <RowItemsOne />
        <RowItemsTwo />
        <RowItemsThree />
      </Box>
    </>
  );
}
