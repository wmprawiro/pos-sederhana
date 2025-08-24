"use client";

import * as React from "react";
import {
  Box,
  Stack,
  TextField,
  Tabs,
  Tab,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import MenuCard from "@/components/layout/menu/MenuCard";

type Menu = {
  id: number;
  name: string;
  price: number;
  category: "Food" | "Beverage" | "Dessert";
  image: string;
  is_active: boolean;
};

const mockMenus: Menu[] = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: "Gado-gado Special",
  price: 20000,
  category: "Food",
  image: "/images/placeholder.png",
  is_active: true,
}));

export default function CataloCashierPage() {
  const [q] = React.useState("");
  const [tab, setTab] = React.useState<0 | 1 | 2 | 3>(0);
  const [selected, setSelected] = React.useState<Menu | null>(null);
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

  const [form, setForm] = React.useState({
    name: "",
    price: "",
    category: "Food",
    is_active: true,
    image: "",
  });
  React.useEffect(() => {
    if (selected)
      setForm({
        name: selected.name,
        price: String(selected.price),
        category: selected.category,
        is_active: selected.is_active,
        image: selected.image,
      });
    else
      setForm({
        name: "",
        price: "",
        category: "Food",
        is_active: true,
        image: "",
      });
  }, [selected]);

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", lg: "3fr 1fr" }}
      gap={2}
    >
      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Catalog
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total {filtered.length} Menu
          </Typography>
        </Stack>

        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
          <Tab label="All Menu" />
          <Tab label="Foods" />
          <Tab label="Beverages" />
          <Tab label="Dessert" />
        </Tabs>

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
              description={"Deskripsi singkat menu"}
              price={m.price}
              category={m.category}
              onClick={() => setSelected(m)}
            />
          ))}
        </Box>
      </Box>

      <Box bgcolor={"white"} borderRadius={2} p={2}>
        <Typography fontWeight={700} mb={1}>
          {selected ? "Edit Menu" : "Add Menu"}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack gap={1.5}>
          <TextField
            label="Name"
            value={form.name}
            onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))}
          />
          <TextField
            label="Price"
            value={form.price}
            onChange={(e) => setForm((v) => ({ ...v, price: e.target.value }))}
          />
          <TextField
            label="Category"
            select
            SelectProps={{ native: true }}
            value={form.category}
            onChange={(e) =>
              setForm((v) => ({ ...v, category: e.target.value }))
            }
          >
            <option value="Food">Food</option>
            <option value="Beverage">Beverage</option>
            <option value="Dessert">Dessert</option>
          </TextField>
          <TextField
            label="Image URL"
            value={form.image}
            onChange={(e) => setForm((v) => ({ ...v, image: e.target.value }))}
          />
          <Stack direction="row" gap={1} mt={1.5}>
            <Button
              variant="contained"
              onClick={() => alert(selected ? "update menu" : "create menu")}
            >
              {selected ? "Save Changes" : "Create Menu"}
            </Button>
            {selected && (
              <Button color="error" onClick={() => alert("delete menu")}>
                Delete
              </Button>
            )}
            {selected && (
              <Button variant="outlined" onClick={() => setSelected(null)}>
                Clear
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
