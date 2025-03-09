import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { FooterProfile } from "./components/footer-profile";
import { Dashboard } from "./scenes/dashboard";
import { Navbar } from "./scenes/navbar";
import { Predictions } from "./scenes/predictions";
import { themeSettings } from "./theme";

export function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Box width="100%" height="100%" padding="1rem 2rem 0.5rem 2rem">
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
