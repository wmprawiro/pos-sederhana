"use client";

import * as React from "react";
import {
  Box,
  Stack,
  Tabs,
  Tab,
  Typography,
  Divider,
  TextField,
} from "@mui/material";
import MenuCard from "@/components/menu/MenuCard";
import OrderDialog from "@/components/order/OrderDialog";
import OrderItemRow, {
  OrderItem as OrderRowType,
} from "@/components/order/OrderItemRow";
import OrderSummaryBox from "@/components/order/OrderSummaryBox";
import TransactionSuccessDialog from "@/components/order/TransactionSuccessDialog";

type Menu = {
  id: number;
  name: string;
  price: number;
  category: "Food" | "Beverage" | "Dessert";
  image: string;
  is_active?: boolean;
  description?: string;
};

const mockMenus: Menu[] = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: "Gado-gado Special",
  price: 20000,
  category: "Food",
  image: "/images/placeholder.png",
  description: "Deskripsi singkat menu",
}));

export default function CatalogCashierPage() {
  const [q] = React.useState("");
  const [tab, setTab] = React.useState<0 | 1 | 2 | 3>(0);
  const [orderTab, setOrderTab] = React.useState<0 | 1>(1);
  const [customerName, setCustomerName] = React.useState("");
  const [tableNo, setTableNo] = React.useState<string>("");
  const [orders, setOrders] = React.useState<OrderRowType[]>([]);
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Menu | null>(null);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const filtered = mockMenus.filter((m) => {
    const matchTab =
      tab === 0
        ? true
        : tab === 1
        ? m.category === "Food"
        : tab === 2
        ? m.category === "Beverage"
        : m.category === "Dessert";
    const matchQ = m.name.toLowerCase().includes(q.toLowerCase());
    return matchTab && matchQ;
  });

  const tableOptions = Array.from({ length: 20 }, (_, i) => String(i + 1));

  const addToOrders = (payload: { menu: Menu; qty: number; note: string }) => {
    setOrders((prev) => {
      const idx = prev.findIndex(
        (it) => it.id === payload.menu.id && it.note === payload.note
      );
      if (idx >= 0) {
        const clone = [...prev];
        clone[idx] = { ...clone[idx], qty: clone[idx].qty + payload.qty };
        return clone;
      }
      return [
        ...prev,
        {
          id: payload.menu.id,
          name: payload.menu.name,
          price: payload.menu.price,
          image: payload.menu.image,
          qty: payload.qty,
          note: payload.note,
        },
      ];
    });
  };

  const onInc = (it: OrderRowType) =>
    setOrders((prev) =>
      prev.map((p) =>
        p.id === it.id && p.note === it.note ? { ...p, qty: p.qty + 1 } : p
      )
    );

  const onDec = (it: OrderRowType) => {
    const target = orders.find((p) => p.id === it.id && p.note === it.note);
    if (!target) return;
    if (target.qty === 1) {
      const ok =
        typeof window !== "undefined" &&
        window.confirm("Hapus item ini dari order?");
      if (!ok) return;
      setOrders((prev) =>
        prev.filter((p) => !(p.id === it.id && p.note === it.note))
      );
      return;
    }
    setOrders((prev) =>
      prev.map((p) =>
        p.id === it.id && p.note === it.note ? { ...p, qty: p.qty - 1 } : p
      )
    );
  };

  const subtotal = React.useMemo(
    () => orders.reduce((s, it) => s + it.price * it.qty, 0),
    [orders]
  );

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", lg: "3fr 1fr" }}
        gap={2}
        sx={{ height: "100dvh", minHeight: 0, overflow: "hidden" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Catalog
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total {filtered.length} Menu
            </Typography>
          </Stack>

          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            sx={{ mt: 2, mb: 2 }}
          >
            <Tab label="All Menu" />
            <Tab label="Foods" />
            <Tab label="Beverages" />
            <Tab label="Dessert" />
          </Tabs>

          <Box sx={{ flex: 1, minHeight: 0, overflow: "auto", pr: 1, pb: 1 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 2,
              }}
            >
              {filtered.map((m) => (
                <MenuCard
                  key={m.id}
                  image={m.image}
                  name={m.name}
                  description={m.description ?? ""}
                  price={m.price}
                  category={m.category}
                  onClick={() => {
                    setSelected(m);
                    setDetailOpen(true);
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        <Box
          bgcolor="white"
          borderRadius={2}
          p={2}
          sx={{ display: "flex", flexDirection: "column", minHeight: 0 }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700 }} mb={2}>
            List Order
          </Typography>
          <Divider sx={{ mb: 2, borderColor: "grey.200" }} />

          <Tabs
            value={orderTab}
            onChange={(_, v) => setOrderTab(v)}
            sx={{ mb: 1 }}
          >
            <Tab label="Dine-in" />
            <Tab label="Take away" />
          </Tabs>

          <Stack gap={1.5} sx={{ mb: 1.5 }}>
            {orderTab === 0 ? (
              <Stack direction="row" spacing={1.5} mt={1.5}>
                <TextField
                  label="Customer Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ flex: 2 }}
                />
                <TextField
                  label="No. Table"
                  select
                  SelectProps={{ native: true, displayEmpty: true }}
                  value={tableNo}
                  onChange={(e) => setTableNo(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ flex: 1 }}
                >
                  <option value="" disabled>
                    Pilih meja
                  </option>
                  {tableOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </TextField>
              </Stack>
            ) : (
              <TextField
                label="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ mt: 1.5 }}
              />
            )}
          </Stack>

          <Divider sx={{ mb: 1.5, borderColor: "grey.200" }} />

          <Box sx={{ flex: 1, minHeight: 0, overflow: "auto" }}>
            <Stack gap={1.25}>
              {orders.length === 0 ? (
                <Typography
                  color="text.secondary"
                  textAlign="center"
                  sx={{ mt: 6 }}
                >
                  Belum ada pesanan
                </Typography>
              ) : (
                orders.map((it) => (
                  <OrderItemRow
                    key={`${it.id}-${it.note}`}
                    item={it}
                    onInc={onInc}
                    onDec={onDec}
                  />
                ))
              )}
            </Stack>
          </Box>

          <OrderSummaryBox
            subtotal={subtotal}
            taxRate={0.1}
            onPay={() => {
              setOpenSuccess(true);
            }}
          />
        </Box>
      </Box>

      <OrderDialog
        open={detailOpen}
        menu={selected}
        onClose={() => setDetailOpen(false)}
        onAdd={({ menu, qty, note }) => {
          addToOrders({ menu, qty, note });
          setDetailOpen(false);
        }}
      />

      <TransactionSuccessDialog
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        onPrint={() => window.print()}
        orderNo="123456"
        orderDate={new Date()}
        customerName={customerName}
        orderType={orderTab === 0 ? "Dine-in" : "Takeaway"}
        tableName={orderTab === 0 && tableNo ? `No.Meja ${tableNo}` : undefined}
        items={orders.map((o) => ({
          name: o.name,
          qty: o.qty,
          price: o.price,
          total: o.price * o.qty,
        }))}
        subtotal={subtotal}
        tax={tax}
        total={total}
      />
    </>
  );
}
