"use client";

import * as React from "react";
import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  IconButton,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlined from "@mui/icons-material/MonetizationOnOutlined";
import RestaurantMenuOutlined from "@mui/icons-material/RestaurantMenuOutlined";
import FastfoodOutlined from "@mui/icons-material/FastfoodOutlined";
import OpenInNewOutlined from "@mui/icons-material/OpenInNewOutlined";

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}) {
  return (
    <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2 }}>
      <Typography sx={{ fontSize: 12, color: "text.secondary", mb: 1 }}>
        {title}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Box sx={{ color: "primary.main" }}>{icon}</Box>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {value}
        </Typography>
      </Stack>
    </Paper>
  );
}

type Row = {
  id: number;
  orderNo: string;
  orderDate: Date;
  orderType: "Dine-in" | "Takeaway";
  category: "Foods" | "Beverages" | "Desserts";
  customerName: string;
};

const mockRows: Row[] = Array.from({ length: 86 }, (_, i) => ({
  id: i + 1,
  orderNo: "ORDR#1234567890",
  orderDate: new Date("2024-09-18T12:30:00"),
  orderType: "Dine-in",
  category: "Foods",
  customerName: "Anisa",
}));

function formatDate(d: Date) {
  return d.toLocaleString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function SalesReportPage() {
  const theme = useTheme();
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const totalPages = Math.max(1, Math.ceil(mockRows.length / rowsPerPage));
  const start = (page - 1) * rowsPerPage;
  const visible = React.useMemo(
    () => mockRows.slice(start, start + rowsPerPage),
    [page, rowsPerPage]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        height: "100%",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Sales Report
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <StatCard
            icon={
              <ShoppingCartOutlined
                sx={{ fontSize: 24, color: "primary.main" }}
              />
            }
            title="Total Orders"
            value={500}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <StatCard
            icon={
              <MonetizationOnOutlined
                sx={{ fontSize: 24, color: "primary.main" }}
              />
            }
            title="Total Omzet"
            value="Rp10.000.000"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <StatCard
            icon={
              <RestaurantMenuOutlined
                sx={{ fontSize: 24, color: "primary.main" }}
              />
            }
            title="All Menu Orders"
            value={1000}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <StatCard
            icon={
              <FastfoodOutlined sx={{ fontSize: 24, color: "primary.main" }} />
            }
            title="Foods"
            value={500}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <StatCard
            icon={
              <FastfoodOutlined sx={{ fontSize: 24, color: "primary.main" }} />
            }
            title="Beverages"
            value={300}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <StatCard
            icon={
              <FastfoodOutlined sx={{ fontSize: 24, color: "primary.main" }} />
            }
            title="Desserts"
            value={200}
          />
        </Grid>
      </Grid>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
        }}
      >
        <TableContainer sx={{ flex: 1, minHeight: 0, overflow: "auto" }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    fontWeight: 700,
                    backgroundColor: theme.palette.grey[100],
                  },
                }}
              >
                <TableCell>No Order</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Order Type</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell align="center" width={80}>
                  Detail
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visible.map((r) => (
                <TableRow key={r.id} hover>
                  <TableCell>{r.orderNo}</TableCell>
                  <TableCell>{formatDate(r.orderDate)}</TableCell>
                  <TableCell>{r.orderType}</TableCell>
                  <TableCell>{r.category}</TableCell>
                  <TableCell>{r.customerName}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => console.log("detail", r.id)}
                    >
                      <OpenInNewOutlined fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {visible.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Typography
                      align="center"
                      color="text.secondary"
                      sx={{ py: 4 }}
                    >
                      No data
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ my: 1.5 }} />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Typography variant="body2" color="text.secondary">
              Show:
            </Typography>
            <Select
              size="small"
              value={rowsPerPage}
              onChange={(e) => {
                const v = Number(e.target.value);
                setRowsPerPage(v);
                setPage(1);
              }}
              sx={{ minWidth: 72 }}
            >
              {[10, 25, 50, 100].map((v) => (
                <MenuItem key={v} value={v}>
                  {v}
                </MenuItem>
              ))}
            </Select>
            <Typography variant="body2" color="text.secondary">
              Entries
            </Typography>
          </Stack>

          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, p) => setPage(p)}
            size="small"
            shape="rounded"
            siblingCount={1}
            boundaryCount={1}
          />
        </Stack>
      </Paper>
    </Box>
  );
}
