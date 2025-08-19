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
          <Button color="inherit" href="https://mui.com/" target="_blank">
            MUI Docs
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6">Tambah Item</Typography>
                  <TextField
                    label="Nama Produk"
                    value={form.name}
                    onChange={handleChange("name")}
                    placeholder="Contoh: Kopi Susu"
                    fullWidth
                  />
                  <TextField
                    label="Harga (Rp)"
                    value={form.price}
                    onChange={handleChange("price")}
                    type="number"
                    inputProps={{ min: 0, step: "100" }}
                    fullWidth
                  />
                  <TextField
                    label="Qty"
                    value={form.qty}
                    onChange={handleChange("qty")}
                    type="number"
                    inputProps={{ min: 1, step: "1" }}
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleSubmit}
                    disabled={!form.name || priceNum <= 0 || qtyNum <= 0}
                  >
                    Simpan
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Typography variant="h6">Ringkasan</Typography>
                <Divider />
                <Box display="flex" justifyContent="space-between">
                  <Typography color="text.secondary">Produk</Typography>
                  <Chip
                    label={form.name ? form.name : "—"}
                    variant="outlined"
                  />
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography color="text.secondary">Harga</Typography>
                  <Typography>Rp {priceNum.toLocaleString("id-ID")}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography color="text.secondary">Qty</Typography>
                  <Typography>{qtyNum}</Typography>
                </Box>
                <Divider />
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1" fontWeight={700}>
                    Subtotal
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={700}>
                    Rp {subtotal.toLocaleString("id-ID")}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
