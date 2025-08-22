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
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, ml: `${SIDEBAR_WIDTH}px` }}>
        <Topbar />
        <Box sx={{ p: "20px" }}>{children}</Box>
      </Box>
    </Box>
  );
}
