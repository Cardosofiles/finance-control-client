import { Box } from "@mui/material";
import { styled } from "@mui/system";

export function FlexBetween(props: React.ComponentProps<typeof Box>) {
  const StyledBox = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  });

  return <StyledBox {...props} />;
}
