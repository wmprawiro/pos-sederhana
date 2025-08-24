"use client";

import * as React from "react";
import { Stack, Avatar, Box, Typography, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

export type OrderItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  qty: number;
  note: string;
};

type Props = {
  item: OrderItem;
  onInc: (item: OrderItem) => void;
  onDec: (item: OrderItem) => void;
};

const money = (v: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);

export default function OrderItemRow({ item, onInc, onDec }: Props) {
  const total = item.price * item.qty;

  return (
    <Stack direction="row" spacing={1.25} alignItems="center">
      <Avatar
        variant="rounded"
        src={item.image}
        sx={{ width: 56, height: 56 }}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography fontWeight={700} noWrap>
          {item.name}
        </Typography>
        <Typography variant="body2" color="primary.main">
          {money(total)}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {money(item.price)} × {item.qty}
        </Typography>
      </Box>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <IconButton size="small" onClick={() => onDec(item)}>
          <Remove fontSize="small" />
        </IconButton>
        <Typography width={20} textAlign="center">
          {item.qty}
        </Typography>
        <IconButton size="small" onClick={() => onInc(item)}>
          <Add fontSize="small" />
        </IconButton>
      </Stack>
    </Stack>
  );
}
