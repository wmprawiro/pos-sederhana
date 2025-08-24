"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Stack,
  Box,
  Button,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type OrderItem = {
  name: string;
  qty: number;
  price: number;
  total: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onPrint?: () => void;
  orderNo: string;
  orderDate: Date | string;
  customerName?: string;
  orderType: "Dine-in" | "Takeaway";
  tableName?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
};

function formatIDR(n: number) {
  return n.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
}

export default function TransactionSuccessDialog({
  open,
  onClose,
  onPrint,
  orderNo,
  orderDate,
  customerName,
  orderType,
  tableName,
  items,
  subtotal,
  tax,
  total,
}: Props) {
  const dateStr =
    typeof orderDate === "string"
      ? new Date(orderDate).toLocaleString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      : orderDate.toLocaleString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <Box display="flex" justifyContent="flex-end" p={1}>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ pt: 0 }}>
        <Typography align="center" fontSize={28} fontWeight={800} mb={3}>
          Transaction Success
        </Typography>

        <Box bgcolor="#F7F7F7" borderRadius={2} p={2.5}>
          <Stack spacing={1.2}>
            <Stack direction="row" gap={1} flexWrap="wrap">
              <Typography variant="body2" color="text.secondary">
                No Order
              </Typography>
              <Typography variant="body2">ORDR#{orderNo}</Typography>
            </Stack>
            <Stack direction="row" gap={1} flexWrap="wrap">
              <Typography variant="body2" color="text.secondary">
                Order Date
              </Typography>
              <Typography variant="body2">{dateStr}</Typography>
            </Stack>
            {customerName && (
              <Stack direction="row" gap={1} flexWrap="wrap">
                <Typography variant="body2" color="text.secondary">
                  Customer Name
                </Typography>
                <Typography variant="body2">{customerName}</Typography>
              </Stack>
            )}
            <Stack direction="row" gap={1} flexWrap="wrap">
              <Typography variant="body2" color="text.secondary">
                {orderType}
              </Typography>
              {tableName && (
                <Typography variant="body2">- {tableName}</Typography>
              )}
            </Stack>

            <Divider sx={{ my: 1.5 }} />

            {items.map((it, idx) => (
              <Box key={idx}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight={700}>{it.name}</Typography>
                  <Typography>
                    {formatIDR(it.total).replace("Rp", "Rp ")}
                  </Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary">
                  {it.qty} x {formatIDR(it.price).replace("Rp", "Rp ")}
                </Typography>
                <Box
                  sx={{ borderBottom: "1.5px dashed #D9D9D9", mt: 1, mb: 1.5 }}
                />
              </Box>
            ))}

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mt={0.5}
            >
              <Typography color="text.secondary">Sub Total</Typography>
              <Typography>
                {formatIDR(subtotal).replace("Rp", "Rp ")}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography color="text.secondary">Tax</Typography>
              <Typography>{formatIDR(tax).replace("Rp", "Rp ")}</Typography>
            </Stack>

            <Box sx={{ borderBottom: "1.5px dashed #D9D9D9", my: 1.5 }} />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontSize={18}>Total</Typography>
              <Typography fontSize={22} fontWeight={800}>
                {formatIDR(total).replace("Rp", "Rp ")}
              </Typography>
            </Stack>
          </Stack>
        </Box>

        <Button
          fullWidth
          size="large"
          sx={{ mt: 2.5, borderRadius: 2, py: 1.2 }}
          variant="contained"
          onClick={onPrint}
        >
          Print Struk
        </Button>
      </DialogContent>
    </Dialog>
  );
}
