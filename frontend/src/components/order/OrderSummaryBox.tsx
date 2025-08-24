"use client";

import * as React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";

type Props = {
  subtotal: number;
  taxRate?: number;
  onPay: () => void;
};

const money = (v: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);

export default function OrderSummaryBox({
  subtotal,
  taxRate = 0.1,
  onPay,
}: Props) {
  const tax = Math.round(subtotal * taxRate);
  const total = subtotal + tax;

  return (
    <Box sx={{ pt: 1.5 }}>
      <Box
        sx={{
          position: "relative",
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "#e0e0e0",
          borderRadius: 2,
          p: 2,
        }}
      >
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Typography variant="body2" color="text.secondary">
            Sub Total
          </Typography>
          <Typography variant="body2">{money(subtotal)}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Tax
          </Typography>
          <Typography variant="body2">{money(tax)}</Typography>
        </Stack>

        <Box sx={{ position: "relative", my: 1.5 }}>
          <Box
            sx={{
              position: "absolute",
              left: -18,
              top: "50%",
              transform: "translateY(-50%)",
              width: 20,
              height: 40,
              bgcolor: "background.default",
              border: "1px solid",
              borderColor: "#e0e0e0",
              borderRadius: "0 20px 20px 0",
              borderLeft: 0,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              right: -18,
              top: "50%",
              transform: "translateY(-50%)",
              width: 20,
              height: 40,
              bgcolor: "background.default",
              border: "1px solid",
              borderColor: "#e0e0e0",
              borderRadius: "20px 0 0 20px",
              borderRight: 0,
            }}
          />
          <svg width="100%" height="2">
            <line
              x1="0"
              y1="1"
              x2="100%"
              y2="1"
              stroke="#e0e0e0"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
          </svg>
        </Box>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body1" fontWeight={700}>
            Total
          </Typography>
          <Typography variant="h5" fontWeight={800} color="primary.main">
            {money(total)}
          </Typography>
        </Stack>
      </Box>

      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{ mt: 1.5 }}
        onClick={onPay}
      >
        Pay
      </Button>
    </Box>
  );
}
