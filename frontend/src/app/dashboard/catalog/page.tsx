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
  IconButton,
} from "@mui/material";
import MenuCard from "@/components/menu/MenuCard";
import { Add, Close, Edit, Delete } from "@mui/icons-material";
import UploadDropzone from "@/components/menu/UploadDropzone";

type Menu = {
  id: number;
  name: string;
  price: number;
  category: "Food" | "Beverage" | "Dessert";
  image: string;
  is_active: boolean;
  description?: string;
};

type Mode = "idle" | "detail" | "add" | "edit";

const mockMenus: Menu[] = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: "Gado-gado Special",
  price: 20000,
  category: "Food",
  image: "/images/placeholder.png",
  is_active: true,
  description: "Deskripsi singkat menu",
}));

export default function CatalogAdminPage() {
  const [q] = React.useState("");
  const [tab, setTab] = React.useState<0 | 1 | 2 | 3>(0);
  const [selected, setSelected] = React.useState<Menu | null>(null);
  const [mode, setMode] = React.useState<Mode>("idle");

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
    description: "",
  });

  React.useEffect(() => {
    if (mode === "edit" && selected) {
      setForm({
        name: selected.name,
        price: String(selected.price),
        category: selected.category,
        is_active: selected.is_active,
        image: selected.image,
        description: selected.description ?? "",
      });
    }
    if (mode === "add") {
      setForm({
        name: "",
        price: "",
        category: "Food",
        is_active: true,
        image: "",
        description: "",
      });
    }
  }, [mode, selected]);

  return (
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

        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mt: 2, mb: 2 }}>
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
                  setMode("detail");
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
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {mode === "detail"
              ? "Detail Menu"
              : mode === "edit"
              ? "Edit Menu"
              : "Add Menu"}
          </Typography>

          <Stack direction="row" gap={1}>
            {mode === "detail" && (
              <IconButton
                onClick={() => {
                  setSelected(null);
                  setMode("idle");
                }}
              >
                <Close />
              </IconButton>
            )}
            {(mode === "add" || mode === "edit") && (
              <IconButton
                onClick={() => {
                  setSelected(null);
                  setMode("idle");
                }}
              >
                <Close />
              </IconButton>
            )}
            {mode === "idle" && (
              <IconButton
                sx={{
                  bgcolor: "primary.main",
                  "&:hover": { bgcolor: "primary.dark" },
                  color: "white",
                }}
                onClick={() => {
                  setSelected(null);
                  setMode("add");
                }}
              >
                <Add />
              </IconButton>
            )}
          </Stack>
        </Stack>

        <Divider sx={{ mb: 2, borderColor: "grey.200" }} />

        {mode === "detail" && selected && (
          <Stack height="100%">
            <Stack gap={1.5} flex={1}>
              <Box
                component="img"
                src={selected.image}
                alt={selected.name}
                sx={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />
              <TextField
                label="Name"
                value={selected.name}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Category"
                value={selected.category}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Price"
                value={String(selected.price)}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Description"
                value={selected.description ?? ""}
                multiline
                minRows={3}
                InputProps={{ readOnly: true }}
              />
            </Stack>

            <Stack mt={2} direction="row" spacing={1}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => setMode("edit")}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                size="large"
                onClick={() => alert("delete")}
              >
                Delete
              </Button>
            </Stack>
          </Stack>
        )}

        {(mode === "add" || mode === "edit") && (
          <>
            <Box sx={{ flex: 1, minHeight: 0, overflow: "auto" }}>
              <Stack gap={1.5}>
                <UploadDropzone
                  onFile={(file) =>
                    setForm((v) => ({ ...v, image: file.name }))
                  }
                />
                <TextField
                  label="Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((v) => ({ ...v, name: e.target.value }))
                  }
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
                  label="Price"
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm((v) => ({ ...v, price: e.target.value }))
                  }
                />
                <TextField
                  label="Description"
                  multiline
                  minRows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm((v) => ({ ...v, description: e.target.value }))
                  }
                />
              </Stack>
            </Box>

            <Box mt={2}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => alert(mode === "edit" ? "update" : "create")}
              >
                Save
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
