"use client";
import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  const [mode, setMode] = useState("light");

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <html lang="en">
        <body
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            margin: 0,
          }}
        >
          <Navbar toggleTheme={toggleTheme} />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </body>
      </html>
    </ThemeProvider>
  );
}
