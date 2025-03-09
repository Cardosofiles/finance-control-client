import { Typography, useTheme } from "@mui/material";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FlexBetween } from "./flex-between";

export function FooterProfile() {
  const { palette } = useTheme();

  return (
    <FlexBetween color={palette.grey[400]} marginTop="0.5rem" p="0.5rem">
      {/* LEFT SIDE */}
      <FlexBetween gap="0.75rem">
        <Typography variant="h6" fontSize="16px" color={palette.grey[400]}>
          &copy; cardoso.files
        </Typography>
        {/* <Typography variant="h6" fontSize="16px" color={palette.grey[400]}>
          <img
            src="https://github.com/Cardosofiles.png"
            alt="Avatar"
            style={{ width: "24px", height: "24px", borderRadius: "50%" }}
          />
        </Typography> */}
      </FlexBetween>

      {/* RIGHT SIDE */}
      <FlexBetween>
        <Typography fontSize="12px">
          <div style={{ display: "flex", gap: "1rem" }}>
            <a
              href="https://github.com/Cardosofiles"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size="20px" color={palette.grey[400]} />
            </a>

            <a
              href="https://www.linkedin.com/in/jo%C3%A3o-batista-dev-front-end/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin size="20px" color={palette.grey[400]} />
            </a>
          </div>
        </Typography>
      </FlexBetween>
    </FlexBetween>
  );
}
