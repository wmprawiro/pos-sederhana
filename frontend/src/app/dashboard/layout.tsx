"use client";

import * as React from "react";
import { Box } from "@mui/material";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

const SIDEBAR_WIDTH = 72;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", height: "100dvh", overflow: "hidden" }}>
      <Sidebar base="dashboard" />
      <Box
        component="main"  
        sx={{
          flexGrow: 1,
          ml: `${SIDEBAR_WIDTH}px`,
          display: "flex",
          flexDirection: "column",
          height: "100dvh",
          minWidth: 0,
        }}
      >
        <Topbar />
        <Box
          sx={{
            p: "20px",
            bgcolor: "grey.100",
            flex: 1,
            minHeight: 0,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
