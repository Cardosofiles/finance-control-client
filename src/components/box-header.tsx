import { Box, Typography, useTheme } from "@mui/material";
import { FlexBetween } from "./flex-between";

interface IconTheme {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  sideText?: string;
}

export function BoxHeader({ icon, title, subtitle, sideText }: IconTheme) {
  const { palette } = useTheme();

  return (
    <FlexBetween color={palette.grey[400]} margin="1.5rem 1rem 0 1rem">
      <FlexBetween>{icon}</FlexBetween>
      <Box width="100%">
        <Typography variant="h4" mb="-0.1rem">
          {title}
        </Typography>

        <Typography variant="h6">{subtitle}</Typography>
      </Box>

      <Typography variant="h5" fontWeight="700" color={palette.secondary[500]}>
        {sideText}
      </Typography>
    </FlexBetween>
  );
}
