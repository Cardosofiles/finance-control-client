import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { FooterProfile } from "./components/footer-profile";
import { Navbar } from "./components/nav-bar";
import { Dashboard } from "./pages/dashboard";
import { Predictions } from "./pages/predictions";
import { themeSettings } from "./theme";

export function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Box
            width="100%"
            height="100%"
            padding="1rem 2rem 0.5rem 2rem"
            sx={{
              overflow: "hidden",
              maxWidth: "100%",
              // Ajuste de padding com breakpoints mais flexíveis
              "@media (max-width: 600px)": {
                padding: "0.8rem 1.5rem 0.5rem 1.5rem", // Ajuste para dispositivos móveis
              },
              "@media (max-width: 400px)": {
                padding: "0.8rem 1rem 0.5rem 1rem", // Ajuste para telas muito pequenas
              },
            }}
          >
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/predictions" element={<Predictions />} />
            </Routes>
            <FooterProfile />
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}
