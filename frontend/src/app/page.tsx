"use client";

import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  TextField,
  Stack,
  Button,
  Divider,
  Box,
  Chip,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid"; // ⟵ penting: pakai Grid baru

type FormState = {
  name: string;
  price: string; // disimpan sebagai string untuk TextField
  qty: string;
};

export default function Page() {
  const [form, setForm] = React.useState<FormState>({
    name: "",
    price: "",
    qty: "1",
  });

  const priceNum = Number(form.price || 0);
  const qtyNum = Number(form.qty || 0);
  const subtotal = priceNum * qtyNum;

  const handleChange =
    (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((s) => ({ ...s, [key]: e.target.value }));
    };

  const handleSubmit = () => {
    console.log("Simpan item:", {
      name: form.name.trim(),
      price: priceNum,
      qty: qtyNum,
      subtotal,
    });
    alert("Item disimpan (cek console).");
  };

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
