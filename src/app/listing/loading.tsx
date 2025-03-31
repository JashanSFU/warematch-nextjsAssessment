import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import Header from "../components/Header";

export default function Loading() {
  return (
    <>
      <Header />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          background: "linear-gradient(135deg, #f0f2f5, #ffffff)",
          p: 2,
        }}
      >
        <CircularProgress size={60} color="secondary" />
        <Typography variant="h6" color="text.secondary">
          Loading Listings...
        </Typography>
      </Box>
    </>
  );
}
