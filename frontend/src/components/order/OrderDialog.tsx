"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Stack,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { Add, Remove, Close } from "@mui/icons-material";

type Menu = {
  id: number;
  name: string;
  price: number;
  category: "Food" | "Beverage" | "Dessert";
  image: string;
  description?: string;
};

type Props = {
  open: boolean;
  menu: Menu | null;
  onClose: () => void;
  onAdd: (payload: { menu: Menu; qty: number; note: string }) => void;
};

export default function OrderDialog({ open, menu, onClose, onAdd }: Props) {
  const [qty, setQty] = React.useState(1);
  const [note, setNote] = React.useState("");

  React.useEffect(() => {
    if (open) {
      setQty(1);
      setNote("");
    }
  }, [open, menu]);

  if (!menu) return null;

  const fmt = (v: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(v);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogContent sx={{ p: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
        >
          <Typography variant="h6" fontWeight={700}>
            Order Menu
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>

        <Box
          component="img"
          src={menu.image}
          alt={menu.name}
          sx={{
            width: "100%",
            height: 220,
            objectFit: "cover",
            borderRadius: 2,
            mb: 2,
          }}
        />

        <Box
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            fontSize: 10,
            px: 1.5,
            py: 0.5,
            borderRadius: "999px",
            fontWeight: 600,
            textTransform: "uppercase",
            display: "inline-block",
            mb: 1,
          }}
        >
          {menu.category}
        </Box>

        <Typography variant="h5" fontWeight={700}>
          {menu.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {menu.description || "-"}
        </Typography>

        <Divider sx={{ my: 1.5 }} />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1.5 }}
        >
          <Typography variant="h6" fontWeight={700} color="primary.main">
            {fmt(menu.price)}
            <Typography component="span" variant="body2" color="text.secondary">
              /portion
            </Typography>
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton onClick={() => setQty((q) => Math.max(1, q - 1))}>
              <Remove />
            </IconButton>
            <Typography fontWeight={700}>{qty}</Typography>
            <IconButton onClick={() => setQty((q) => q + 1)}>
              <Add />
            </IconButton>
          </Stack>
        </Stack>

        <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
          Add Note
        </Typography>
        <TextField
          placeholder="Add note here..."
          multiline
          minRows={4}
          fullWidth
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => onAdd({ menu, qty, note })}
        >
          Add to Order
        </Button>
      </DialogContent>
    </Dialog>
  );
}
