"use client";

import * as React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

type FormState = {
  name: string;
  price: string;
  qty: string;
};

export default function Page() {
  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            POS — Sinau Koding
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
