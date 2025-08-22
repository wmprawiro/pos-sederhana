"use client";

import * as React from "react";
import { Box, Grid, Paper, Stack, Typography, useTheme } from "@mui/material";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlined from "@mui/icons-material/MonetizationOnOutlined";
import RestaurantMenuOutlined from "@mui/icons-material/RestaurantMenuOutlined";
import FastfoodOutlined from "@mui/icons-material/FastfoodOutlined";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { blue } from "@mui/material/colors";

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
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "10px",
      }}
    >
      <Typography sx={{ fontSize: 12, color: "text.secondary", mb: 1 }}>
        {title}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Box sx={{ color: blue[500] }}>{icon}</Box>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {value}
        </Typography>
      </Stack>
    </Paper>
  );
}

const chartData = [
  { name: "Mon", Food: 28, Beverage: 145, Dessert: 18 },
  { name: "Tue", Food: 34, Beverage: 92, Dessert: 6 },
  { name: "Wed", Food: 44, Beverage: 238, Dessert: 12 },
  { name: "Thu", Food: 68, Beverage: 142, Dessert: 41 },
  { name: "Fri", Food: 96, Beverage: 189, Dessert: 7 },
  { name: "Sat", Food: 46, Beverage: 141, Dessert: 29 },
  { name: "Sun", Food: 24, Beverage: 94, Dessert: 5 },
];

export default function DashboardPage() {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Dashboard
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
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          height: 420,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Total Omzet
        </Typography>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={chartData} barSize={20}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.palette.divider}
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: theme.palette.divider }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ stroke: theme.palette.divider }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="Food" fill={theme.palette.primary.dark} />
            <Bar dataKey="Beverage" fill={theme.palette.primary.main} />
            <Bar dataKey="Dessert" fill={theme.palette.primary.light} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}
